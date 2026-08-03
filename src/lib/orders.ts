export type Order = {
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

const KEY = "moodies_last_order";

export function makeOrderNumber() {
  const now = new Date();
  const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const seq = String(Math.floor(Math.random() * 9999) + 1).padStart(4, "0");
  return `MOO-${stamp}-${seq}`;
}

export function saveOrder(order: Order) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(order));
  } catch {
    /* ignore */
  }
}

export function loadOrder(): Order | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Order) : null;
  } catch {
    return null;
  }
}
