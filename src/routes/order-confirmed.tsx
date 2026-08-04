import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { formatZar } from "@/data/products";
import { loadOrderRef } from "@/lib/orders";
import { getOrderByNumber, type OrderRecord } from "@/lib/orders.functions";

export const Route = createFileRoute("/order-confirmed")({
  head: () => ({
    meta: [
      { title: "Order Confirmed — Moodies" },
      {
        name: "description",
        content: "Your Moodies order is confirmed and moving into processing.",
      },
      { property: "og:title", content: "Order Confirmed — Moodies" },
      { property: "og:description", content: "Your Moodies order is confirmed." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderConfirmed,
});

const steps = ["Processing", "Shipped", "Delivered"];

function OrderConfirmed() {
  const fetchOrder = useServerFn(getOrderByNumber);
  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const ref = loadOrderRef();
    if (!ref) {
      setReady(true);
      return;
    }
    fetchOrder({ data: ref })
      .then((result) => setOrder(result))
      .catch(() => setOrder(null))
      .finally(() => setReady(true));
  }, [fetchOrder]);

  if (!ready) return <div className="mx-auto max-w-3xl px-5 py-24" />;

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="font-display text-3xl font-bold uppercase">No recent order</h1>
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
    <div className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Thank you</p>
      <h1 className="mt-4 font-display text-4xl font-bold uppercase">Order confirmed</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Order number <span className="text-foreground">{order.orderNumber}</span> · A confirmation
        has been sent to {order.email}.
      </p>

      <div className="mt-10 flex gap-2">
        {steps.map((step) => (
          <div
            key={step}
            className={`flex-1 border-t-2 pt-3 text-[11px] uppercase tracking-[0.14em] ${
              step === order.status
                ? "border-t-primary text-foreground"
                : "border-t-border text-muted-foreground"
            }`}
          >
            {step}
          </div>
        ))}
      </div>

      <ul className="mt-10 divide-y divide-border border-y border-border">
        {order.items.map((item) => (
          <li key={item.name} className="flex justify-between gap-4 py-4 text-sm">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>{formatZar(item.price * item.quantity)}</span>
          </li>
        ))}
      </ul>

      <dl className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd>{formatZar(order.subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Delivery</dt>
          <dd>{formatZar(order.shipping)}</dd>
        </div>
        <div className="flex justify-between border-t border-border pt-3 font-display text-base font-bold">
          <dt>Total</dt>
          <dd>{formatZar(order.total)}</dd>
        </div>
      </dl>

      <div className="mt-10 border border-border p-6 text-sm">
        <h2 className="font-display text-sm font-bold uppercase tracking-[0.16em]">Delivering to</h2>
        <p className="mt-3 text-muted-foreground">
          {order.name}
          <br />
          {order.address}
          <br />
          {order.phone}
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          Discreet packaging. No product names on parcel.
        </p>
      </div>

      <Link
        to="/shop"
        className="mt-10 inline-block border border-border px-6 py-3 text-xs uppercase tracking-[0.2em] hover:bg-secondary"
      >
        Continue shopping
      </Link>
    </div>
  );
}
