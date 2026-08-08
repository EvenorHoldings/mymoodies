import { useState } from "react";
import { formatZar, subcategoryLabels, type Product } from "@/data/products";
import { useCart } from "@/lib/cart";
import { moodBorder } from "@/lib/mood";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  compact = false,
  className,
}: {
  product: Product;
  compact?: boolean;
  className?: string;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add(product.id);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article
      className={cn(
        "group flex flex-col border-l-2 bg-card transition-shadow hover:shadow-[0_12px_40px_-24px_oklch(0.19_0_0/0.5)]",
        moodBorder(product.mood),
        className
      )}
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

      <div
        className={cn(
          "flex flex-1 flex-col",
          compact ? "gap-2 p-3 sm:gap-3 sm:p-5" : "gap-3 p-5"
        )}
      >
        <p
          className={cn(
            "uppercase tracking-[0.18em] text-muted-foreground",
            compact ? "text-[10px] sm:text-[11px]" : "text-[11px]"
          )}
        >
          {subcategoryLabels[product.subcategory] ?? product.category}
        </p>
        <h3
          className={cn(
            "font-display font-bold uppercase tracking-tight",
            compact ? "text-sm sm:text-base" : "text-base"
          )}
        >
          {product.name}
        </h3>
        <p
          className={cn(
            "leading-relaxed text-muted-foreground",
            compact ? "line-clamp-2 text-xs sm:text-sm" : "text-sm"
          )}
        >
          {product.description}
        </p>
        {!compact && (
          <p className="text-xs text-muted-foreground">
            {product.spec}
            {product.servings && product.servings !== "N/A"
              ? ` · ${product.servings}`
              : ""}
          </p>
        )}

        <div
          className={cn(
            "mt-auto flex items-center justify-between gap-3",
            compact ? "pt-2 sm:pt-4" : "pt-4"
          )}
        >
          <span
            className={cn(
              "font-display font-bold",
              compact ? "text-base sm:text-lg" : "text-lg"
            )}
          >
            {formatZar(product.price)}
          </span>
          <button
            type="button"
            onClick={handleAdd}
            className={cn(
              "bg-primary font-medium uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-85",
              compact
                ? "px-3 py-1.5 text-[10px] sm:px-4 sm:py-2 sm:text-xs"
                : "px-4 py-2 text-xs"
            )}
          >
            {added ? "Added" : "Add to cart"}
          </button>
        </div>
      </div>
    </article>
  );
}
