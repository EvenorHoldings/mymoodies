import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useInView } from "@/hooks/useInView";
import {
  Gem,
  FlaskConical,
  Lock,
  Package,
  Truck,
  MapPin,
} from "lucide-react";

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

type IconProps = { className?: string };

function MoodWheelIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="18" />
      <path d="M24 6v36M6 24h36" opacity="0.5" />
      <circle cx="24" cy="24" r="4" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MagicSparkleIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M24 4l2.6 10.4L36 16l-9.4 2.6L24 28l-2.6-9.4L12 16l10.4-2.6L24 4z"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <circle cx="10" cy="10" r="1.5" fill="currentColor" />
      <circle cx="38" cy="38" r="1.5" fill="currentColor" />
      <circle cx="38" cy="10" r="1" fill="currentColor" />
      <circle cx="10" cy="38" r="1" fill="currentColor" />
    </svg>
  );
}

function LeafShieldIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <path d="M24 4c9 3 16 11 16 23 0 12-16 21-16 21S8 39 8 27C8 15 15 7 24 4z" />
      <path
        d="M24 14c-5 5-5 17 0 22 5-5 5-17 0-22z"
        fill="currentColor"
        fillOpacity="0.12"
      />
    </svg>
  );
}

const howItWorksSteps = [
  {
    title: "Choose Your Mood",
    copy: "Select how you'd like to feel today, whether that's focused, relaxed, uplifted, creative or ready to unwind.",
    Icon: MoodWheelIcon,
  },
  {
    title: "Discover Your Match",
    copy: "Browse carefully curated premium products designed around your selected mood and lifestyle.",
    Icon: MagicSparkleIcon,
  },
  {
    title: "Enjoy Responsibly",
    copy: "Enjoy responsibly while following local regulations and recommended guidance.",
    Icon: LeafShieldIcon,
  },
];

function HowItWorksSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      id="how-it-works"
      className="relative flex min-h-[calc(100dvh-4rem)] snap-start items-center justify-center overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-5 py-24 text-center sm:py-32">
        <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
          The experience
        </p>
        <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
          How Moodies Works
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          Finding your mood should be simple.
        </p>

        <div className="relative mt-16 grid gap-6 md:mt-20 md:grid-cols-3 md:gap-8">
          <div
            className={`pointer-events-none absolute top-20 left-[8%] right-[8%] hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block transition-transform duration-1000 ease-out origin-left ${
              inView ? "scale-x-100" : "scale-x-0"
            }`}
            aria-hidden="true"
          />
          {howItWorksSteps.map((step, index) => {
            const delay = inView ? `${300 + index * 150}ms` : "0ms";
            return (
              <div
                key={step.title}
                className={`relative z-10 flex flex-col items-center rounded-2xl bg-surface-cream p-8 shadow-sm transition-all duration-700 ease-out hover:-translate-y-1.5 hover:shadow-md md:p-10 ${
                  inView
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: delay }}
              >
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-background text-foreground shadow-sm">
                  <step.Icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-lg font-bold uppercase tracking-[0.12em]">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-muted-foreground">
                  {step.copy}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const trustCards = [
  {
    title: "Premium Ingredients",
    copy: "Responsibly sourced, high-grade inputs with no unnecessary fillers.",
    Icon: Gem,
  },
  {
    title: "Independently Tested",
    copy: "Third-party verified for purity, potency and consistent quality.",
    Icon: FlaskConical,
  },
  {
    title: "Secure Checkout",
    copy: "Encrypted payment handling and your details are never shared.",
    Icon: Lock,
  },
  {
    title: "Discreet Packaging",
    copy: "Plain, unbranded parcels shipped with care and complete privacy.",
    Icon: Package,
  },
  {
    title: "Fast Delivery",
    copy: "Dispatch within 1–2 business days to major South African centres.",
    Icon: Truck,
  },
  {
    title: "South African Brand",
    copy: "Designed, owned and operated locally with clear supply-chain values.",
    Icon: MapPin,
  },
];

function TrustSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      id="trust"
      className="relative flex min-h-[calc(100dvh-4rem)] snap-start items-center justify-center overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-5 py-24 text-center sm:py-32">
        <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
          Our promise
        </p>
        <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
          Why Customers Trust Moodies
        </h2>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trustCards.map((card, index) => {
            const delay = inView ? `${300 + index * 100}ms` : "0ms";
            return (
              <div
                key={card.title}
                className={`group rounded-2xl bg-surface-cream p-8 text-left shadow-sm transition-all duration-700 ease-out hover:-translate-y-1 hover:bg-background/80 hover:shadow-md ${
                  inView
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: delay }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors duration-300 group-hover:border-foreground/20">
                  <card.Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 font-display text-sm font-bold uppercase tracking-[0.12em]">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {card.copy}
                </p>
              </div>
            );
          })}
        </div>

        <p
          className={`mx-auto mt-16 max-w-2xl text-sm leading-relaxed text-muted-foreground transition-all duration-1000 ease-out ${
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ transitionDelay: inView ? "900ms" : "0ms" }}
        >
          Designed with quality, transparency and responsible enjoyment in mind.
        </p>
      </div>
    </section>
  );
}

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

      <HowItWorksSection />

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
