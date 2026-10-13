import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { formatZar, moodLabels, products, subcategoryLabels, type Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/lib/cart";
import { moodBg, moodBorder } from "@/lib/mood";

export const Route = createFileRoute("/product/$productId")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product unavailable — Moodies" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} — ${formatZar(product.price)} | Moodies`;
    return {
      meta: [
        { title },
        { name: "description", content: product.description },
        { property: "og:title", content: title },
        { property: "og:description", content: product.description },
        { property: "og:type", content: "product" },
      ],
      links: [{ rel: "canonical", href: `https://mymoodies.lovable.app/product/${product.id}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            sku: product.id,
            image: product.image.startsWith("http")
              ? product.image
              : `https://mymoodies.lovable.app${product.image}`,
            brand: { "@type": "Brand", name: "Moodies" },
            offers: {
              "@type": "Offer",
              priceCurrency: "ZAR",
              price: product.price,
              availability: "https://schema.org/InStock",
              url: `https://mymoodies.lovable.app/product/${product.id}`,
            },
          }),
        },
      ],
    };
  },
  errorComponent: () => (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center">
      <h1 className="font-display text-3xl font-bold uppercase">This page didn't load</h1>
      <Link to="/shop" className="mt-6 inline-block text-sm underline">
        Back to shop
      </Link>
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center">
      <h1 className="font-display text-3xl font-bold uppercase">Product not found</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        That product may have sold out or been renamed.
      </p>
      <Link to="/shop" className="mt-6 inline-block text-sm underline">
        Back to shop
      </Link>
    </div>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const related: Product[] = products
    .filter(
      (p) => p.id !== product.id && (p.mood === product.mood || p.category === product.category),
    )
    .slice(0, 3);

  const handleAdd = () => {
    for (let i = 0; i < qty; i += 1) add(product.id);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <nav className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        <Link to="/shop" className="hover:text-foreground">
          Shop
        </Link>
        <span className="px-2">/</span>
        <span>{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div className={`group overflow-hidden border-l-2 bg-card ${moodBorder(product.mood)}`}>
          <img
            src={product.image}
            alt={product.imageAlt}
            width={1024}
            height={1024}
            className="aspect-[4/5] w-full object-cover transition-transform duration-1000 ease-out motion-reduce:transition-none group-hover:scale-[1.025]"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <span className={`h-2 w-8 ${moodBg(product.mood)}`} aria-hidden />
            <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {moodLabels[product.mood]} ·{" "}
              {subcategoryLabels[product.subcategory] ?? product.category}
            </span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-bold uppercase leading-tight sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <dl className="mt-8 grid gap-3 border-y border-border py-6 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">SKU</dt>
              <dd>{product.sku}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Spec</dt>
              <dd>{product.spec}</dd>
            </div>
            {product.servings && product.servings !== "N/A" ? (
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Servings</dt>
                <dd>{product.servings}</dd>
              </div>
            ) : null}
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Delivery</dt>
              <dd>Flat R100 · discreet packaging</dd>
            </div>
          </dl>

          <p className="mt-8 font-display text-3xl font-bold">{formatZar(product.price)}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center border border-border">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground"
              >
                −
              </button>
              <span className="min-w-8 text-center text-sm">{qty}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty((q) => Math.min(99, q + 1))}
                className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className="bg-primary px-8 py-4 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-85"
            >
              {added ? "Added to cart" : "Add to cart"}
            </button>
            <Link
              to="/cart"
              className="text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
            >
              View cart
            </Link>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            18+ only. Keep out of reach of children. Not for use during pregnancy.
          </p>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-20">
          <h2 className="font-display text-xl font-bold uppercase tracking-tight">
            You may also like
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
