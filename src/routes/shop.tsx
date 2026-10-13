import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { products, type Category, type Mood } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

type ShopSearch = { mood?: Mood | undefined; category?: Category | undefined };

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    mood: ["uplift", "calm", "balance", "neutral"].includes(String(search["mood"]))
      ? (search["mood"] as Mood)
      : undefined,
    category: ["cartridge", "battery", "edible"].includes(String(search["category"]))
      ? (search["category"] as Category)
      : undefined,
  }),

  head: () => ({
    links: [{ rel: "canonical", href: "https://www.moodies.life/shop" }],
    meta: [
      { title: "Shop All Products — Moodies" },
      {
        name: "description",
        content:
          "Browse Moodies cartridges, 510 batteries and home grown edibles. Filter by mood: Uplift, Calm, Balance. Prices in ZAR.",
      },
      { property: "og:title", content: "Shop All Products — Moodies" },
      {
        property: "og:description",
        content: "Cartridges, batteries and edibles filtered by mood and category.",
      },
    ],
  }),
  component: Shop,
});

const moods: { value: Mood | undefined; label: string }[] = [
  { value: undefined, label: "All moods" },
  { value: "uplift", label: "Uplift" },
  { value: "calm", label: "Calm" },
  { value: "balance", label: "Balance" },
];

const categories: { value: Category | undefined; label: string }[] = [
  { value: undefined, label: "All types" },
  { value: "cartridge", label: "Cartridges" },
  { value: "battery", label: "Batteries" },
  { value: "edible", label: "Edibles" },
];

function Shop() {
  const { mood, category } = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });

  const filtered = products.filter(
    (p) => (!mood || p.mood === mood) && (!category || p.category === category),
  );

  const setFilter = (next: Partial<ShopSearch>) =>
    navigate({ search: (prev: ShopSearch) => ({ ...prev, ...next }) });

  const chip = (active: boolean) =>
    `border px-4 py-2 text-xs uppercase tracking-[0.14em] transition-colors ${
      active
        ? "border-primary bg-primary text-primary-foreground"
        : "border-border text-muted-foreground hover:text-foreground"
    }`;

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="font-display text-4xl font-bold uppercase">Shop</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        {filtered.length} products · Flat R100 delivery · Discreet packaging
      </p>

      <div className="mt-10 flex flex-col gap-4 border-y border-border py-6 lg:flex-row lg:gap-10">
        <div className="flex flex-wrap gap-2">
          {moods.map((m) => (
            <button
              key={m.label}
              type="button"
              onClick={() => setFilter({ mood: m.value })}
              className={chip(mood === m.value)}
            >
              {m.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.label}
              type="button"
              onClick={() => setFilter({ category: c.value })}
              className={chip(category === c.value)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-sm text-muted-foreground">
          No products match those filters.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
