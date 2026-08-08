import { useState } from "react";
import { formatZar, subcategoryLabels, type Product } from "@/data/products";
import { useCart } from "@/lib/cart";
import { moodBorder } from "@/lib/mood";

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add(product.id);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article
      className={`group flex flex-col border-l-2 bg-card transition-shadow hover:shadow-[0_12px_40px_-24px_oklch(0.19_0_0/0.5)] ${moodBorder(product.mood)}`}
    >
      <div className="aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {subcategoryLabels[product.subcategory] ?? product.category}
        </p>
        <h3 className="font-display text-base font-bold uppercase tracking-tight">
          {product.name}
        </h3>
        <p className={`text-sm leading-relaxed text-muted-foreground ${compact ? "line-clamp-2" : ""}`}>
          {product.description}
        </p>
        {!compact && (
          <p className="text-xs text-muted-foreground">
            {product.spec}
            {product.servings && product.servings !== "N/A" ? ` · ${product.servings}` : ""}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <span className="font-display text-lg font-bold">{formatZar(product.price)}</span>
          <button
            type="button"
            onClick={handleAdd}
            className="bg-primary px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-85"
          >
            {added ? "Added" : "Add to cart"}
          </button>
        </div>
      </div>
    </article>
  );
}
