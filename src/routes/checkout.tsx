import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { formatZar } from "@/data/products";
import { useCart } from "@/lib/cart";
import { saveOrderRef } from "@/lib/orders";
import { placeOrder } from "@/lib/orders.functions";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Moodies" },
      {
        name: "description",
        content:
          "Complete your Moodies order. Card, Snapscan or bank transfer. Discreet delivery across South Africa.",
      },
      { property: "og:title", content: "Checkout — Moodies" },
      { property: "og:description", content: "Complete your Moodies order securely." },
    ],
  }),
  component: Checkout,
});

const payments = [
  { id: "card", label: "Card (Stripe)", note: "Visa, Mastercard, Amex" },
  { id: "snapscan", label: "Snapscan", note: "QR code sent with your confirmation" },
  { id: "eft", label: "Bank transfer", note: "Moodies · FNB · 6284 1129 043 · Ref: order number" },
];

function Checkout() {
  const { items, subtotal, shipping, total, clear } = useCart();
  const navigate = useNavigate();
  const submitOrder = useServerFn(placeOrder);
  const [payment, setPayment] = useState("card");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const field =
    "w-full border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary";
  const label = "text-[11px] uppercase tracking-[0.16em] text-muted-foreground";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    setError(null);
    setBusy(true);

    try {
      const { orderNumber } = await submitOrder({
        data: {
          name: String(data.get("name") ?? "").trim(),
          email,
          phone: String(data.get("phone") ?? "").trim(),
          address: String(data.get("address") ?? "").trim(),
          payment: payment as "card" | "snapscan" | "eft",
          items: items.map((i) => ({
            name: i.product.name,
            quantity: i.quantity,
            price: i.product.price,
          })),
        },
      });

      saveOrderRef({ orderNumber, email });
      clear();
      void navigate({ to: "/order-confirmed" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not place your order.");
    } finally {
      setBusy(false);
    }
  };


  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-24 text-center">
        <h1 className="font-display text-3xl font-bold uppercase">Checkout</h1>
        <p className="mt-4 text-sm text-muted-foreground">Your cart is empty.</p>
        <Link
          to="/shop"
          className="mt-8 inline-block bg-primary px-6 py-3 text-xs uppercase tracking-[0.2em] text-primary-foreground"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="font-display text-4xl font-bold uppercase">Checkout</h1>

      <form onSubmit={handleSubmit} className="mt-10 grid gap-12 lg:grid-cols-[1fr_340px]">
        <div className="space-y-10">
          <fieldset className="space-y-4">
            <legend className="font-display text-sm font-bold uppercase tracking-[0.16em]">
              Details
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-1.5">
                <span className={label}>Full name</span>
                <input name="name" required className={field} />
              </label>
              <label className="space-y-1.5">
                <span className={label}>Email</span>
                <input name="email" type="email" required className={field} />
              </label>
              <label className="space-y-1.5 sm:col-span-2">
                <span className={label}>Phone</span>
                <input name="phone" required className={field} />
              </label>
              <label className="space-y-1.5 sm:col-span-2">
                <span className={label}>Delivery address</span>
                <textarea name="address" required rows={3} className={field} />
              </label>
            </div>
            <p className="text-xs text-muted-foreground">
              Discreet packaging. No product names on parcel.
            </p>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="font-display text-sm font-bold uppercase tracking-[0.16em]">
              Payment
            </legend>
            {payments.map((p) => (
              <label
                key={p.id}
                className={`flex cursor-pointer items-start gap-3 border p-4 transition-colors ${
                  payment === p.id ? "border-primary" : "border-border hover:bg-secondary"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={p.id}
                  checked={payment === p.id}
                  onChange={() => setPayment(p.id)}
                  className="mt-1 accent-primary"
                />
                <span>
                  <span className="block text-sm font-medium">{p.label}</span>
                  <span className="block text-xs text-muted-foreground">{p.note}</span>
                </span>
              </label>
            ))}
          </fieldset>

          <label className="flex items-start gap-3 text-sm">
            <input type="checkbox" required className="mt-1 accent-primary" />
            <span className="text-muted-foreground">
              I am 18 or older and accept the{" "}
              <Link to="/legal" className="text-foreground underline">
                terms & conditions
              </Link>
              .
            </span>
          </label>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </div>

        <aside className="h-fit border border-border p-6">
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.16em]">Order</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="flex justify-between gap-4">
                <span className="text-muted-foreground">
                  {product.name} × {quantity}
                </span>
                <span>{formatZar(product.price * quantity)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-3 border-t border-border pt-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatZar(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Delivery</dt>
              <dd>{formatZar(shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 font-display text-base font-bold">
              <dt>Total</dt>
              <dd>{formatZar(total)}</dd>
            </div>
          </dl>
          <button
            type="submit"
            className="mt-6 w-full bg-primary py-3 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-85"
          >
            Submit order
          </button>
        </aside>
      </form>
    </div>
  );
}
