const KEY = "moodies_last_order_ref";

export type OrderRef = { orderNumber: string; email: string };

export function saveOrderRef(ref: OrderRef) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(ref));
  } catch {
    /* ignore */
  }
}

export function loadOrderRef(): OrderRef | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as OrderRef) : null;
  } catch {
    return null;
  }
}
