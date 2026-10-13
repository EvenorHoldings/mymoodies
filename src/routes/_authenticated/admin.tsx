import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { formatZar } from "@/data/products";
import { ORDER_STATUSES, amIAdmin, listAllOrders, updateOrderStatus } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Order Admin — Moodies" },
      { name: "description", content: "Internal Moodies order management dashboard." },
      { property: "og:title", content: "Order Admin — Moodies" },
      { property: "og:description", content: "Internal Moodies order management." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const checkAdmin = useServerFn(amIAdmin);
  const fetchOrders = useServerFn(listAllOrders);
  const setStatus = useServerFn(updateOrderStatus);
  const queryClient = useQueryClient();

  const adminQuery = useQuery({ queryKey: ["am-i-admin"], queryFn: () => checkAdmin() });
  const ordersQuery = useQuery({
    queryKey: ["all-orders"],
    queryFn: () => fetchOrders(),
    enabled: adminQuery.data === true,
  });

  const mutation = useMutation({
    mutationFn: (vars: { orderNumber: string; status: (typeof ORDER_STATUSES)[number] }) =>
      setStatus({ data: vars }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["all-orders"] }),
  });

  if (adminQuery.isLoading) {
    return <p className="mx-auto max-w-5xl px-5 py-16 text-sm text-muted-foreground">Loading…</p>;
  }

  if (adminQuery.data !== true) {
    return (
      <div className="mx-auto max-w-5xl px-5 py-24">
        <h1 className="font-display text-3xl font-bold uppercase">Not authorised</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This area is limited to Moodies staff accounts.
        </p>
      </div>
    );
  }

  const orders = ordersQuery.data ?? [];
  const revenue = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="font-display text-4xl font-bold uppercase">Order admin</h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Orders", value: String(orders.length) },
          {
            label: "Open",
            value: String(orders.filter((o) => o.status === "Processing").length),
          },
          { label: "Revenue", value: formatZar(revenue) },
        ].map((stat) => (
          <div key={stat.label} className="border border-border p-5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {stat.label}
            </p>
            <p className="mt-2 font-display text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {ordersQuery.isLoading ? (
        <p className="mt-10 text-sm text-muted-foreground">Loading orders…</p>
      ) : null}
      {ordersQuery.error ? (
        <p className="mt-10 text-sm text-destructive">Could not load orders.</p>
      ) : null}

      <div className="mt-10 space-y-5">
        {orders.map((order) => (
          <article key={order.orderNumber} className="border border-border p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="font-display text-sm font-bold uppercase tracking-[0.16em]">
                {order.orderNumber}
              </h2>
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                {new Date(order.createdAt).toLocaleString()} · {order.payment}
              </p>
            </div>

            <div className="mt-4 grid gap-1 text-sm text-muted-foreground sm:grid-cols-2">
              <p>
                {order.name} · {order.email}
              </p>
              <p>{order.phone}</p>
              <p className="sm:col-span-2">{order.address}</p>
            </div>

            <ul className="mt-4 space-y-1 text-sm">
              {order.items.map((item) => (
                <li key={item.name} className="flex justify-between gap-4">
                  <span className="text-muted-foreground">
                    {item.name} × {item.quantity}
                  </span>
                  <span>{formatZar(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
              <span className="font-display text-base font-bold">{formatZar(order.total)}</span>
              <div className="flex flex-wrap gap-2">
                {ORDER_STATUSES.map((status) => (
                  <button
                    key={status}
                    type="button"
                    disabled={mutation.isPending || order.status === status}
                    onClick={() => mutation.mutate({ orderNumber: order.orderNumber, status })}
                    className={`border px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] transition-colors disabled:cursor-default ${
                      order.status === status
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {!ordersQuery.isLoading && orders.length === 0 ? (
        <p className="mt-10 text-sm text-muted-foreground">No orders yet.</p>
      ) : null}
    </div>
  );
}
