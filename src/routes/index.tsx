import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Moodies — Taste Your Mood" },
      {
        name: "description",
        content:
          "Premium wellness edibles & devices in three moods: Uplift, Calm and Balance. Cartridges, batteries and home grown edibles.",
      },
      { property: "og:title", content: "Moodies — Taste Your Mood" },
      {
        property: "og:description",
        content: "Premium wellness edibles & devices. Emotional clarity. Collectible packaging.",
      },
    ],
  }),
  component: Index,
});

const collections = [
  {
    mood: "uplift",
    accent: "bg-uplift",
    border: "border-l-uplift",
    title: "Uplift",
    copy: "Bright, citrus-forward profiles built for morning clarity and creative energy.",
  },
  {
    mood: "calm",
    accent: "bg-calm",
    border: "border-l-calm",
    title: "Calm",
    copy: "Cool, floral and berry notes for evening rituals and slower hours.",
  },
  {
    mood: "balance",
    accent: "bg-balance",
    border: "border-l-balance",
    title: "Balance",
    copy: "Even, grounded blends for steady focus from midday onward.",
  },
] as const;

const principles = [
  { title: "Simplicity", copy: "One product, one intention. Nothing decorative." },
  { title: "Consistency", copy: "The same grid, the same light, every product." },
  { title: "Clarity", copy: "Plain names, plain doses, plain pricing." },
  { title: "Restraint", copy: "Matte finishes, quiet colour, no noise." },
];

function Index() {
  const featured = products.slice(0, 6);

  return (
    <>
      <section className="flex min-h-[calc(100dvh-4rem)] snap-start items-center justify-center border-b border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-5 py-24 text-center sm:py-32">
          <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
            Premium wellness edibles & devices
          </p>
          <h1 className="mt-6 font-display text-5xl font-bold uppercase tracking-tight sm:text-7xl">
            Taste Your Mood
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            Emotional clarity. Collectible packaging. Three moods, one restrained system.
          </p>
          <Link
            to="/shop"
            className="mt-10 bg-primary px-8 py-3 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-85"
          >
            Browse products
          </Link>
        </div>
      </section>

      <section className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-6xl snap-start flex-col justify-center px-5 py-12">
        <div className="flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible">
          {collections.map((c) => {
            const count = products.filter((p) => p.mood === c.mood).length;
            return (
              <Link
                key={c.mood}
                to="/shop"
                search={{ mood: c.mood }}
                className={`flex w-[240px] shrink-0 flex-col border border-border border-l-2 bg-card p-8 transition-colors hover:bg-secondary md:w-auto ${c.border}`}
              >
                <span className={`h-1 w-10 ${c.accent}`} />
                <h2 className="mt-6 font-display text-2xl font-bold uppercase">{c.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.copy}</p>
                <span className="mt-8 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {count} products
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="flex min-h-[calc(100dvh-4rem)] snap-start flex-col justify-center border-y border-border bg-secondary">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p) => (
            <div key={p.title}>
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.16em]">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-6xl snap-start flex-col justify-center px-5 py-8 sm:py-12">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-bold uppercase">Featured</h2>
          <Link
            to="/shop"
            className="text-xs uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground"
          >
            View all {products.length} →
          </Link>
        </div>
        <div className="mt-6 flex gap-4 overflow-x-auto pb-4 sm:mt-8 sm:gap-6">
          {featured.map((p) => (
            <div key={p.id} className="w-[160px] shrink-0 sm:w-[220px]">
              <ProductCard product={p} compact />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
