import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type * as React from "react";
import { products, type Product } from "@/data/products";

export type CartLine = { id: string; quantity: number };
export type CartItem = { product: Product; quantity: number };

const STORAGE_KEY = "moodies_cart_v1";
const MAX_PER_LINE = 99;
export const SHIPPING_ZAR = 100;

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  add: (id: string, quantity?: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const globalKey = "__moodiesCartContext" as const;
const g = globalThis as unknown as Record<
  string,
  React.Context<CartContextValue | null> | undefined
>;
const CartContext: React.Context<CartContextValue | null> =
  g[globalKey] ?? (g[globalKey] = createContext<CartContextValue | null>(null));

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setLines(
            parsed
              .filter(
                (l): l is CartLine =>
                  typeof l?.id === "string" && Number.isInteger(l?.quantity) && l.quantity > 0,
              )
              .map((l) => ({ id: l.id, quantity: Math.min(MAX_PER_LINE, l.quantity) })),
          );
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  const add = useCallback((id: string, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.id === id);
      if (existing) {
        return prev.map((l) =>
          l.id === id ? { ...l, quantity: Math.min(MAX_PER_LINE, l.quantity + quantity) } : l,
        );
      }
      return [...prev, { id, quantity: Math.min(MAX_PER_LINE, quantity) }];
    });
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, quantity: Math.min(MAX_PER_LINE, quantity) } : l)),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const items = lines
      .map((line) => {
        const product = products.find((p) => p.id === line.id);
        return product ? { product, quantity: line.quantity } : null;
      })
      .filter((v): v is CartItem => v !== null);

    const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    const shipping = items.length > 0 ? SHIPPING_ZAR : 0;

    return {
      items,
      count: items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
      add,
      setQuantity,
      remove,
      clear,
    };
  }, [lines, add, setQuantity, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
