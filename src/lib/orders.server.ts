import { createClient } from "@supabase/supabase-js";
import type { OrderRecord } from "./orders.functions";

export const SHIPPING_ZAR = 100;

export function makeOrderNumber() {
  const now = new Date();
  const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(
    now.getDate(),
  ).padStart(2, "0")}`;
  const seq = String(Math.floor(Math.random() * 9999) + 1).padStart(4, "0");
  return `MOO-${stamp}-${seq}`;
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
