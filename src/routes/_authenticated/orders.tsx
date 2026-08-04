import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { formatZar } from "@/data/products";
import { listMyOrders } from "@/lib/orders.functions";

export const Route = createFileRoute("/_authenticated/orders")({
  head: () => ({
    meta: [
      { title: "Your Orders — Moodies" },
      { name: "description", content: "View your Moodies order history and delivery status." },
      { property: "og:title", content: "Your Orders — Moodies" },
      { property: "og:description", content: "Your Moodies order history." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrdersPage,
});

function OrdersPage() {
  const fetchOrders = useServerFn(listMyOrders);
  const { data, isLoading, error } = useQuery({
    queryKey: ["my-orders"],
    queryFn: () => fetchOrders(),
  });

  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <h1 className="font-display text-4xl font-bold uppercase">Your orders</h1>

      {isLoading ? <p className="mt-8 text-sm text-muted-foreground">Loading…</p> : null}
      {error ? <p className="mt-8 text-sm text-destructive">Could not load your orders.</p> : null}

      {data && data.length === 0 ? (
        <div className="mt-10">
          <p className="text-sm text-muted-foreground">You have no orders yet.</p>
          <Link
            to="/shop"
            className="mt-6 inline-block bg-primary px-6 py-3 text-xs uppercase tracking-[0.2em] text-primary-foreground"
          >
            Browse products
          </Link>
        </div>
      ) : null}

      <div className="mt-10 space-y-6">
        {data?.map((order) => (
          <article key={order.orderNumber} className="border border-border p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="font-display text-sm font-bold uppercase tracking-[0.16em]">
                {order.orderNumber}
              </h2>
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                {new Date(order.createdAt).toLocaleDateString()} · {order.status}
              </p>
            </div>
            <ul className="mt-5 space-y-2 text-sm">
              {order.items.map((item) => (
                <li key={item.name} className="flex justify-between gap-4">
                  <span className="text-muted-foreground">
                    {item.name} × {item.quantity}
                  </span>
                  <span>{formatZar(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex justify-between border-t border-border pt-4 font-display text-base font-bold">
              <span>Total</span>
              <span>{formatZar(order.total)}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
