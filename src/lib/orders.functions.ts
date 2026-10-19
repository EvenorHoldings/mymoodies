import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// Clients send only *what* they want (product id + quantity). Names and prices are
// always looked up server-side from the catalogue, so a tampered request cannot
// change what an order costs. `name`/`price` are accepted (and ignored) only so
// browsers still running the previous bundle can check out during a deploy.
const itemSchema = z
  .object({
    id: z.string().trim().min(1).max(100).optional(),
    name: z.string().trim().min(1).max(200).optional(),
    quantity: z.number().int().min(1).max(99),
    price: z.number().optional(),
  })
  .refine((item) => item.id || item.name, { message: "Each item needs a product id." });

const orderInputSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z
    .string()
    .trim()
    .min(7)
    .max(40)
    .regex(/^[+\d(][\d\s().-]*$/, "Please enter a valid phone number."),
  address: z.string().trim().min(5).max(600),
  payment: z.enum(["card", "snapscan", "eft"]),
  items: z.array(itemSchema).min(1).max(50),
});

export type PlaceOrderInput = z.infer<typeof orderInputSchema>;

export type OrderRecord = {
  orderNumber: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  payment: string;
  items: { name: string; quantity: number; price: number }[];
  subtotal: number;
  shipping: number;
  total: number;
  status: string;
  createdAt: string;
};

export const placeOrder = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => {
    const parsed = orderInputSchema.safeParse(input);
    if (!parsed.success) {
      // Surface a readable message in the checkout form instead of raw validation JSON.
      const issue = parsed.error.issues[0];
      const field = typeof issue?.path[0] === "string" ? issue.path[0] : "details";
      throw new Error(`Please check your ${field}. ${issue?.message ?? ""}`.trim());
    }
    return parsed.data;
  })
  .handler(async ({ data }): Promise<{ orderNumber: string }> => {
    const { SHIPPING_ZAR, makeOrderNumber, resolveOptionalUserId, priceOrderItems } =
      await import("./orders.server");
    const { enforceRateLimit } = await import("./rate-limit.server");
    enforceRateLimit("place-order", 10, 10 * 60 * 1000);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const authHeader = getRequestHeader("authorization") ?? null;
    const userId = await resolveOptionalUserId(authHeader);

    const items = priceOrderItems(data.items);
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const shipping = SHIPPING_ZAR;
    const orderNumber = makeOrderNumber();

    const { error } = await supabaseAdmin.from("orders").insert({
      user_id: userId,
      order_number: orderNumber,
      customer_name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      payment_method: data.payment,
      items,
      subtotal,
      shipping,
      total: subtotal + shipping,
      status: "Processing",
    });
    if (error) throw new Error("Could not save your order. Please try again.");

    return { orderNumber };
  });

export const getOrderByNumber = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z
      .object({
        orderNumber: z.string().trim().min(4).max(40),
        email: z.string().trim().email().max(255),
      })
      .parse(input),
  )
  .handler(async ({ data }): Promise<OrderRecord | null> => {
    const { mapOrderRow, escapeLike } = await import("./orders.server");
    const { enforceRateLimit } = await import("./rate-limit.server");
    // Order lookups need order number + email; limit attempts so neither can be brute-forced.
    enforceRateLimit("order-lookup", 20, 10 * 60 * 1000);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Case-insensitive *exact* match: escape LIKE wildcards (% and _) in the supplied email.
    const { data: row, error } = await supabaseAdmin
      .from("orders")
      .select("*")
      .eq("order_number", data.orderNumber)
      .ilike("email", escapeLike(data.email))
      .maybeSingle();

    if (error) throw new Error("Could not load that order.");
    return row ? mapOrderRow(row) : null;
  });

export const listMyOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<OrderRecord[]> => {
    const { mapOrderRow } = await import("./orders.server");
    const { data, error } = await context.supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error("Could not load your orders.");
    return (data ?? []).map(mapOrderRow);
  });
