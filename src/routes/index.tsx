import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  FlaskConical,
  Leaf,
  LockKeyhole,
  MapPin,
  PackageCheck,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { MoodGuide } from "@/components/MoodGuide";
import { Button } from "@/components/ui/button";
import { formatZar, products } from "@/data/products";
import { useInView } from "@/hooks/useInView";
import {
  heroImage,
  upliftImage,
  calmImage,
  balanceImage,
  ediblesImage,
  wholesaleImage,
} from "@/assets/editorial";
import { batteryP112Gold, packagingImages } from "@/assets/products";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://www.moodies.life/" }],
    meta: [
      { title: "Moodies | Premium Mood-Led Wellness South Africa" },
      {
        name: "description",
        content:
          "Shop premium, independently tested edibles, cartridges and devices curated for Uplift, Calm and Balance. Discreet delivery across South Africa.",
      },
      { property: "og:title", content: "Moodies | Your Mood, Refined" },
      {
        property: "og:description",
        content: "Premium mood-led edibles, cartridges and devices for adults in South Africa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const moods = [
  {
    mood: "uplift",
    title: "Uplift",
    copy: "Bright profiles for creative energy and social moments.",
    image: upliftImage.url,
    alt: "Woman writing at a sunlit café table beside a Moodies Uplift pouch and device",
  },
  {
    mood: "calm",
    title: "Calm",
    copy: "Quiet blends made for slower evenings and considered rituals.",
    image: calmImage.url,
    alt: "Woman unwinding in a Cape Town apartment with a Moodies Calm pouch and device on the table",
  },
  {
    mood: "balance",
    title: "Balance",
    copy: "Grounded formulations for steady, everyday ease.",
    image: balanceImage.url,
    alt: "Three friends talking on a sofa at golden hour with a Moodies Balance pouch on the table",
  },
] as const;

const categories = [
  {
    category: "cartridge",
    title: "Cartridges",
    copy: "Live Resin, Mate c10g and Standard c10 cartridges in every mood. 510-thread.",
    image: packagingImages["cart_live_calm_mint"]!,
    alt: "Moodies Live Resin Calm cartridge standing beside its Moodies box",
  },
  {
    category: "battery",
    title: "510 Batteries",
    copy: "Rechargeable P107 push and P112 smart-display batteries that fit every Moodies cartridge.",
    image: batteryP112Gold,
    alt: "Moodies P112 510-thread battery in rose gold beside its Moodies box",
  },
  {
    category: "edible",
    title: "Edibles",
    copy: "Home grown gummies, cookies and brownies with the dose printed clearly on every pack.",
    image: packagingImages["edible_gummies_uplift_citrus"]!,
    alt: "Moodies Uplift citrus gummies pouch with gummies in front",
  },
] as const;

// One pick from each part of the range, so the section reflects the whole catalogue.
const bestSellerIds = [
  "cart_live_calm_mint",
  "battery_p107_black",
  "edible_gummies_uplift_citrus",
  "edible_brownies_balance_seasalt",
];

const faqs = [
  {
    question: "What makes Moodies different?",
    answer:
      "Moodies organises a carefully selected range around how you want to feel, with clear product information, restrained design and discreet service.",
  },
  {
    question: "How do I choose my mood?",
    answer:
      "Start with your intention. Choose Uplift for brighter energy, Calm for slower moments, or Balance for an even, grounded experience.",
  },
  {
    question: "Where do you ship?",
    answer:
      "We deliver nationwide across South Africa for a flat R100 fee, with dispatch normally taking place within two working days.",
  },
  {
    question: "Are your products quality tested?",
    answer:
      "Our products are independently tested for purity, potency and consistency before they are made available through Moodies.",
  },
  {
    question: "How should products be stored?",
    answer:
      "Keep products sealed in their original packaging, in a cool, dry place away from direct sunlight and safely out of reach of children and pets.",
  },
  {
    question: "Can I contact customer support?",
    answer:
      "Yes. Email hello@moodies.life for help with products, orders or delivery, and our team will assist you.",
  },
] as const;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">{eyebrow}</p>
      <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-5xl">
        {title}
      </h2>
      {copy ? <p className="mt-5 text-base leading-7 text-muted-foreground">{copy}</p> : null}
    </div>
  );
}

function TrustIndicators() {
  const indicators = [
    [FlaskConical, "Independently tested", "Purity and consistency"],
    [PackageCheck, "Discreet delivery", "Nationwide from R100"],
    [MapPin, "South African brand", "B-BBEE Level 2"],
    [LockKeyhole, "Secure checkout", "Private by design"],
  ] as const;
  return (
    <section aria-label="Moodies trust indicators" className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-border px-5 sm:grid-cols-4 sm:divide-y-0">
        {indicators.map(([Icon, title, copy]) => (
          <div key={title} className="flex min-h-32 items-center gap-4 px-4 py-6 sm:px-6">
            <Icon className="size-5 shrink-0 text-accent" strokeWidth={1.5} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em]">{title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    ["01", "Choose your mood", "Begin with how you want to feel: uplifted, calm or balanced."],
    [
      "02",
      "Discover your match",
      "Explore edibles, cartridges and devices curated for that intention.",
    ],
    ["03", "Enjoy responsibly", "Order securely for discreet delivery anywhere in South Africa."],
  ] as const;
  return (
    <section id="how-it-works" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="Simple by design"
          title="How Moodies Works"
          copy="Finding your mood should be simple."
          align="center"
        />
        <div className="mt-16 grid border-y border-border md:grid-cols-3 md:divide-x md:divide-border">
          {steps.map(([number, title, copy]) => (
            <div
              key={number}
              className="group border-b border-border px-6 py-10 last:border-b-0 md:border-b-0 md:px-10"
            >
              <p className="font-display text-sm text-accent">{number}</p>
              <h3 className="mt-10 font-display text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]"
          >
            Explore the range <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function MoodCollections() {
  return (
    <section className="bg-surface-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="Shop by intention"
          title="Find the feeling that fits today."
          copy="Three considered collections. One clearer way to choose."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {moods.map((item) => (
            <Link
              key={item.mood}
              to="/shop"
              search={{ mood: item.mood }}
              className="group relative aspect-[4/5] overflow-hidden bg-secondary"
            >
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                width={1024}
                height={1024}
                className="h-full w-full object-cover transition-transform duration-1000 ease-out motion-reduce:transition-none group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-background/90 p-6 backdrop-blur-sm">
                <h3 className="font-display text-2xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.copy}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em]">
                  Shop {item.title} <ArrowRight className="size-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShopByCategory() {
  return (
    <section id="categories" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="Shop by format"
          title="Choose how you enjoy it."
          copy="Every mood comes in cartridges and edibles. Pair any cartridge with a Moodies 510 battery."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {categories.map((item) => (
            <Link
              key={item.category}
              to="/shop"
              search={{ category: item.category }}
              className="group flex flex-col border border-border bg-card"
            >
              <div className="aspect-[4/5] overflow-hidden bg-secondary">
                <img
                  src={item.image.url}
                  srcSet={`${item.image.small} 800w, ${item.image.url} ${item.image.width}w`}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  width={item.image.width}
                  height={item.image.height}
                  className="h-full w-full object-cover transition-transform duration-1000 ease-out motion-reduce:transition-none group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl font-semibold">{item.title}</h3>
                  <span className="text-xs text-muted-foreground">
                    From{" "}
                    {formatZar(
                      Math.min(
                        ...products.filter((p) => p.category === item.category).map((p) => p.price),
                      ),
                    )}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{item.copy}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[10px] font-semibold uppercase tracking-[0.18em]">
                  Shop {item.title} <ArrowRight className="size-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function BestSellers() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading eyebrow="Most chosen" title="Best Sellers" />
          <Link
            to="/shop"
            className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] sm:inline-flex"
          >
            Shop all <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {bestSellerIds
            .map((id) => products.find((p) => p.id === id))
            .filter((p): p is (typeof products)[number] => Boolean(p))
            .map((product) => (
              <ProductCard key={product.id} product={product} compact />
            ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link to="/shop" className="text-xs font-semibold uppercase tracking-[0.16em]">
            Shop all products
          </Link>
        </div>
      </div>
    </section>
  );
}

function WhyMoodies() {
  const values = [
    [
      Sparkles,
      "Premium ingredients",
      "Responsibly sourced inputs selected for a refined, consistent experience.",
    ],
    [
      FlaskConical,
      "Tested with intent",
      "Independent quality checks support purity, potency and transparency.",
    ],
    [
      PackageCheck,
      "Private by design",
      "Discreet parcels and clear information from checkout to delivery.",
    ],
    [
      Leaf,
      "Locally considered",
      "A South African brand building a more thoughtful adult wellness category.",
    ],
  ] as const;
  return (
    <section className="bg-primary py-24 text-primary-foreground sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeading
            eyebrow="The Moodies standard"
            title="Why Moodies"
            copy="Quality, transparency and responsible enjoyment—without the noise."
          />
          <Button asChild variant="secondary" className="mt-8 rounded-none px-7">
            <Link to="/our-story">Read our story</Link>
          </Button>
        </div>
        <div className="grid gap-px bg-primary-foreground/20 sm:grid-cols-2">
          {values.map(([Icon, title, copy]) => (
            <div key={title} className="bg-primary p-8">
              <Icon className="size-6 text-accent" strokeWidth={1.4} />
              <h3 className="mt-8 font-display text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-primary-foreground/70">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const reviews = [
    [
      "The whole experience feels considered—from choosing Calm to the discreet delivery.",
      "Naledi M.",
      "Johannesburg",
    ],
    [
      "Beautifully clear product information and none of the usual visual noise.",
      "Mia K.",
      "Cape Town",
    ],
    [
      "Moodies makes discovering something new feel simple, grown-up and trustworthy.",
      "Thabo N.",
      "Pretoria",
    ],
  ] as const;
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading eyebrow="Customer notes" title="Made for real moments." align="center" />
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {reviews.map(([quote, name, city]) => (
            <figure key={name} className="border-t border-border pt-8">
              <div className="flex gap-1 text-accent" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3 fill-current" />
                ))}
              </div>
              <blockquote className="mt-6 font-display text-xl leading-8">“{quote}”</blockquote>
              <figcaption className="mt-8 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {name} · {city}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]"
          >
            Find your favourite <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function InstagramGallery() {
  const images = [
    {
      src: upliftImage.small,
      alt: "Woman at a sunlit café table with a Moodies Uplift pouch and device",
    },
    {
      src: ediblesImage.small,
      alt: "Two friends sharing Moodies gummies and a brownie over coffee",
    },
    { src: calmImage.small, alt: "Quiet evening in a Cape Town apartment with Moodies Calm" },
    { src: balanceImage.small, alt: "Friends relaxing at golden hour with Moodies Balance" },
  ];
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex items-end justify-between gap-5">
          <SectionHeading eyebrow="From our community" title="Life, in every mood." />
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold uppercase tracking-[0.16em]"
          >
            Follow {INSTAGRAM_HANDLE}
          </a>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
          {images.map((image) => (
            <a
              key={image.alt}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden"
            >
              <img
                {...image}
                loading="lazy"
                decoding="async"
                width={800}
                height={800}
                className="aspect-square w-full object-cover transition-transform duration-700 ease-out motion-reduce:transition-none group-hover:scale-105"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Wholesale() {
  return (
    <section className="relative min-h-[70vh] overflow-hidden">
      <img
        src={wholesaleImage.url}
        alt="Shop owner talking with a customer in a South African concept store with wellness products on the shelves"
        loading="lazy"
        decoding="async"
        width={wholesaleImage.width}
        height={wholesaleImage.height}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-primary/45" />
      <div className="relative mx-auto flex min-h-[70vh] max-w-7xl items-end px-5 py-16 sm:items-center sm:py-24">
        <div className="max-w-xl bg-background p-8 sm:p-12">
          <SectionHeading
            eyebrow="For retailers"
            title="Bring Moodies to your customers."
            copy="Partner with a South African brand built for thoughtful retail, hospitality and considered gifting."
          />
          <Button asChild className="mt-8 rounded-none px-7">
            <Link to="/contact">Start a wholesale conversation</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section className="bg-surface-cream py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <SectionHeading
          eyebrow="The Moodies edit"
          title="A considered note, occasionally."
          copy="New moods, responsible guidance and private offers—sent with restraint."
          align="center"
        />
        {submitted ? (
          <p className="mt-10 font-display text-xl">You’re on the list. Welcome to Moodies.</p>
        ) : (
          <form
            className="mx-auto mt-10 flex max-w-xl border-b border-foreground"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Your email address"
              className="min-w-0 flex-1 bg-transparent px-1 py-4 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            />
            <Button
              type="submit"
              variant="ghost"
              className="rounded-none px-3 text-xs uppercase tracking-[0.16em]"
            >
              Join the list <ArrowRight className="size-4" />
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.1 });
  return (
    <section ref={ref} id="faq" className="py-24 sm:py-32">
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Moodies",
          url: "https://www.moodies.life/",
          logo: "https://www.moodies.life/favicon.png",
          email: "hello@moodies.life",
          areaServed: "ZA",
          sameAs: [INSTAGRAM_URL],
        })}
      </script>
      <div className="mx-auto max-w-4xl px-5">
        <SectionHeading
          eyebrow="Considered answers"
          title="Frequently Asked Questions"
          align="center"
        />
        <div className="mt-14 border-t border-border">
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            return (
              <div
                key={faq.question}
                className={`border-b border-border transition-all duration-700 ${inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
              >
                <Button
                  type="button"
                  variant="ghost"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${index}`}
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="h-auto w-full justify-between rounded-none px-0 py-6 text-left font-display text-base hover:bg-transparent sm:text-lg"
                >
                  <span className="whitespace-normal pr-6">{faq.question}</span>
                  <ChevronDown
                    className={`size-5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </Button>
                <div
                  id={`faq-${index}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-7 text-sm leading-7 text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]"
          >
            Ask us anything <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <>
      <section className="relative min-h-[calc(100svh-4rem)] overflow-hidden bg-primary text-primary-foreground">
        <img
          src={heroImage.url}
          srcSet={`${heroImage.small} 800w, ${heroImage.url} ${heroImage.width}w`}
          sizes="100vw"
          alt="South African couple relaxing with Moodies wellness products in a refined apartment"
          width={heroImage.width}
          height={heroImage.height}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[62%_center] opacity-80"
        />
        <div className="absolute inset-0 bg-primary/35" />
        <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl items-end px-5 py-12 sm:items-center sm:py-20">
          <div className="max-w-xl bg-background/95 p-7 text-foreground backdrop-blur-sm sm:p-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
              Premium adult wellness · South Africa
            </p>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[0.95] sm:text-7xl">
              Your Mood,
              <br />
              Refined.
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
              Independently tested edibles, cartridges and devices curated for Uplift, Calm and
              Balance—delivered discreetly.
            </p>
            <Button asChild size="lg" className="mt-8 rounded-none px-8">
              <Link to="/shop">
                Shop the collection <ArrowRight className="size-4" />
              </Link>
            </Button>
            <p className="mt-6 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              18+ only · Secure checkout · Nationwide delivery
            </p>
          </div>
        </div>
      </section>
      <TrustIndicators />
      <HowItWorks />
      <MoodCollections />
      <ShopByCategory />
      <BestSellers />
      <WhyMoodies />
      <Reviews />
      <MoodGuide />
      <InstagramGallery />
      <Wholesale />
      <Newsletter />
      <Faq />
    </>
  );
}
