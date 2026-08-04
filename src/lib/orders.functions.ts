import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const itemSchema = z.object({
  name: z.string().trim().min(1).max(200),
  quantity: z.number().int().min(1).max(999),
  price: z.number().min(0).max(1_000_000),
});

const orderInputSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(3).max(40),
  address: z.string().trim().min(5).max(600),
  payment: z.enum(["card", "snapscan", "eft"]),
  items: z.array(itemSchema).min(1).max(100),
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
  .inputValidator((input: unknown) => orderInputSchema.parse(input))
  .handler(async ({ data }): Promise<{ orderNumber: string }> => {
    const { SHIPPING_ZAR, makeOrderNumber, resolveOptionalUserId } = await import(
      "./orders.server"
    );
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const authHeader = getRequestHeader("authorization") ?? null;
    const userId = await resolveOptionalUserId(authHeader);

    const subtotal = data.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
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
      items: data.items,
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
    const { mapOrderRow } = await import("./orders.server");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: row, error } = await supabaseAdmin
      .from("orders")
      .select("*")
      .eq("order_number", data.orderNumber)
      .ilike("email", data.email)
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
