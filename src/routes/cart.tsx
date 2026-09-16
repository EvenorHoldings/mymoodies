import { createFileRoute, Link } from "@tanstack/react-router";
import { formatZar } from "@/data/products";
import { useCart } from "@/lib/cart";
import { moodBorder } from "@/lib/mood";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Moodies" },
      {
        name: "description",
        content: "Review your Moodies order. Flat R100 delivery, discreet packaging, ZAR pricing.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Your Cart — Moodies" },
      { property: "og:description", content: "Review your Moodies order before checkout." },
    ],
  }),

  component: CartPage,
});

function CartPage() {
  const { items, subtotal, shipping, total, setQuantity, remove } = useCart();

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="font-display text-4xl font-bold uppercase">Cart</h1>

      {items.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-sm text-muted-foreground">Your cart is empty.</p>
          <Link
            to="/shop"
            className="mt-6 inline-block bg-primary px-6 py-3 text-xs uppercase tracking-[0.2em] text-primary-foreground"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_340px]">
          <ul className="divide-y divide-border border-y border-border">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="flex gap-5 py-6">
                <img
                  src={product.image}
                  alt={product.imageAlt}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className={`h-24 w-24 border-l-2 bg-secondary object-cover ${moodBorder(product.mood)}`}
                />
                <div className="flex flex-1 flex-col">
                  <h2 className="font-display text-sm font-bold uppercase">{product.name}</h2>
                  <p className="mt-1 text-xs text-muted-foreground">{product.spec}</p>
                  <div className="mt-auto flex items-center gap-4 pt-3">
                    <div className="flex items-center border border-border">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${product.name}`}
                        onClick={() => setQuantity(product.id, quantity - 1)}
                        className="px-3 py-1 text-sm hover:bg-secondary"
                      >
                        −
                      </button>
                      <span className="min-w-8 text-center text-sm">{quantity}</span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${product.name}`}
                        onClick={() => setQuantity(product.id, quantity + 1)}
                        className="px-3 py-1 text-sm hover:bg-secondary"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      aria-label={`Remove ${product.name} from cart`}
                      onClick={() => remove(product.id)}
                      className="min-h-11 text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground"
                    >
                      Remove
                    </button>

                  </div>
                </div>
                <span className="font-display text-sm font-bold">
                  {formatZar(product.price * quantity)}
                </span>
              </li>
            ))}
          </ul>

          <aside className="order-first h-fit rounded-lg border border-border p-6 lg:order-last">
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.16em]">Summary</h2>
            <dl className="mt-6 space-y-3 text-sm">
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

            <Link
              to="/checkout"
              className="mt-6 block bg-primary py-3 text-center text-xs uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-85"
            >
              Proceed to checkout
            </Link>

            <div className="mt-6 space-y-2 text-xs text-muted-foreground">
              <p className="uppercase tracking-[0.14em] text-foreground">Payment methods</p>
              <p>Card · Snapscan QR · Bank transfer</p>
              <p>Discreet packaging. No product names on parcel.</p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
