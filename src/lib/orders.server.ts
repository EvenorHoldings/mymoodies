import { createClient } from "@supabase/supabase-js";
import type { OrderRecord } from "./orders.functions";
import { products } from "@/data/products";

export const SHIPPING_ZAR = 100;

// No 0/O/1/I/L to keep order numbers easy to read out over the phone.
const ORDER_ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

/** MOO-YYYYMMDD-XXXXXX with 6 cryptographically random characters (~887 million per day). */
export function makeOrderNumber() {
  const now = new Date();
  const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(
    now.getDate(),
  ).padStart(2, "0")}`;
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  const suffix = Array.from(bytes, (b) => ORDER_ALPHABET[b % ORDER_ALPHABET.length]).join("");
  return `MOO-${stamp}-${suffix}`;
}

/** Escapes LIKE/ILIKE wildcards so user input is matched literally. */
export function escapeLike(value: string) {
  return value.replace(/[\\%_]/g, (char) => `\\${char}`);
}

export type PricedOrderItem = { id: string; name: string; quantity: number; price: number };

/**
 * Resolves requested items against the server-side catalogue. Prices and names
 * come from the catalogue only; anything the client sent for them is ignored.
 * Duplicate lines are merged. Unknown products reject the whole order.
 */
export function priceOrderItems(
  requested: { id?: string | undefined; name?: string | undefined; quantity: number }[],
): PricedOrderItem[] {
  const merged = new Map<string, PricedOrderItem>();
  for (const line of requested) {
    const product =
      (line.id ? products.find((p) => p.id === line.id) : undefined) ??
      (!line.id && line.name ? products.find((p) => p.name === line.name) : undefined);
    if (!product) throw new Error("One of the items in your cart is no longer available.");

    const existing = merged.get(product.id);
    const quantity = (existing?.quantity ?? 0) + line.quantity;
    if (quantity > 99) throw new Error("Please order at most 99 of any one product.");
    merged.set(product.id, {
      id: product.id,
      name: product.name,
      quantity,
      price: product.price,
    });
  }
  return [...merged.values()];
}

/** Returns the signed-in user id when a valid bearer token is present, otherwise null (guest). */
export async function resolveOptionalUserId(authHeader: string | null): Promise<string | null> {
  if (!authHeader?.startsWith("Bearer ")) return null;
  const token = authHeader.slice("Bearer ".length);
  if (token.split(".").length !== 3) return null;

  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) return null;

  const client = createClient(url, key, {
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await client.auth.getClaims(token);
  if (error || !data?.claims?.sub) return null;
  return data.claims.sub;
}

type OrderRow = {
  order_number: string;
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  payment_method: string;
  items: unknown;
  subtotal: number | string;
  shipping: number | string;
  total: number | string;
  status: string;
  created_at: string;
};

export function mapOrderRow(row: OrderRow): OrderRecord {
  return {
    orderNumber: row.order_number,
    name: row.customer_name,
    email: row.email,
    phone: row.phone,
    address: row.address,
    payment: row.payment_method,
    items: (Array.isArray(row.items) ? row.items : []) as OrderRecord["items"],
    subtotal: Number(row.subtotal),
    shipping: Number(row.shipping),
    total: Number(row.total),
    status: row.status,
    createdAt: row.created_at,
  };
}
