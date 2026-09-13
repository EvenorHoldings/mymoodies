import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";
import {
  ChevronDown,
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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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

function VisaLogo({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 100 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Visa"
    >
      <text
        x="50"
        y="23"
        textAnchor="middle"
        fontFamily="sans-serif"
        fontSize="20"
        fontWeight="bold"
        fill="#1A1F71"
      >
        VISA
      </text>
      <path d="M28 26h44" stroke="#F7B600" strokeWidth="2" />
    </svg>
  );
}

function MastercardLogo({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 60 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Mastercard"
    >
      <circle cx="18" cy="20" r="12" fill="#EB001B" />
      <circle cx="34" cy="20" r="12" fill="#F79E1B" opacity="0.9" />
    </svg>
  );
}

function PayFastLogo({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 120 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="PayFast"
    >
      <path
        d="M8 16L14 22L25 10"
        stroke="#00A650"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="34"
        y="22"
        fontFamily="sans-serif"
        fontSize="15"
        fontWeight="bold"
        fill="#00A650"
      >
        PayFast
      </text>
    </svg>
  );
}

function YocoLogo({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 90 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Yoco"
    >
      <circle cx="10" cy="16" r="6" fill="#00C2A0" />
      <text
        x="24"
        y="22"
        fontFamily="sans-serif"
        fontSize="15"
        fontWeight="bold"
        fill="#00C2A0"
      >
        Yoco
      </text>
    </svg>
  );
}

function OzowLogo({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 90 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Ozow"
    >
      <path
        d="M16 6c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10S21.5 6 16 6z"
        stroke="#F26522"
        strokeWidth="2.5"
      />
      <text
        x="32"
        y="22"
        fontFamily="sans-serif"
        fontSize="15"
        fontWeight="bold"
        fill="#F26522"
      >
        Ozow
      </text>
    </svg>
  );
}

function ApplePayLogo({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 110 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Apple Pay"
    >
      <path
        d="M17.8 12.1c-.1-2.3-1.9-4.1-4.1-4.1s-4 1.8-4.1 4.1c0 .1 0 .2 0 .3-2.6.3-4.6 2.5-4.6 5.2 0 2.3 1.5 4.2 3.6 4.9-.1.9-.4 2.3-.4 3.6 0 2.6 2.1 4.7 4.7 4.7 1.4 0 2.7-.6 3.5-1.6.8 1 2.1 1.6 3.5 1.6 2.6 0 4.7-2.1 4.7-4.7 0-1.3-.3-2.7-.4-3.6 2.1-.7 3.6-2.6 3.6-4.9 0-2.7-2-4.9-4.6-5.2 0-.1 0-.2 0-.3zm-2.3-3.3c.5-.9.8-2 .7-3.1-.9.1-2 .7-2.7 1.5-.5.6-1 1.6-.8 2.6 1 .1 2-.5 2.8-1z"
        fill="currentColor"
      />
      <text
        x="40"
        y="22"
        fontFamily="sans-serif"
        fontSize="15"
        fontWeight="bold"
        fill="currentColor"
      >
        Pay
      </text>
    </svg>
  );
}

function GooglePayLogo({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 130 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Google Pay"
    >
      <circle cx="14" cy="16" r="10" stroke="#4285F4" strokeWidth="2.5" />
      <path
        d="M14 10v12M9 16h10"
        stroke="#EA4335"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <text
        x="32"
        y="22"
        fontFamily="sans-serif"
        fontSize="15"
        fontWeight="bold"
        fill="#4285F4"
      >
        Pay
      </text>
    </svg>
  );
}

function SSLSecureLogo({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 130 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="SSL Secure"
    >
      <path
        d="M16 4l12 4v8c0 7-5 12-12 16C9 28 4 23 4 16v-8l12-4z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M16 14v6M12 14h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <text
        x="34"
        y="22"
        fontFamily="sans-serif"
        fontSize="13"
        fontWeight="bold"
        fill="currentColor"
      >
        SSL Secure
      </text>
    </svg>
  );
}

const partners = [
  { name: "Visa", Logo: VisaLogo },
  { name: "Mastercard", Logo: MastercardLogo },
  { name: "PayFast", Logo: PayFastLogo },
  { name: "Yoco", Logo: YocoLogo },
  { name: "Ozow", Logo: OzowLogo },
  { name: "Apple Pay", Logo: ApplePayLogo },
  { name: "Google Pay", Logo: GooglePayLogo },
  { name: "SSL Secure", Logo: SSLSecureLogo },
];

function PaymentPartnersSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      id="payment-partners"
      className="relative flex min-h-[calc(100dvh-4rem)] snap-start items-center justify-center overflow-hidden"
    >
      <div className="mx-auto max-w-5xl px-5 py-24 text-center sm:py-32">
        <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
          Secure & local
        </p>
        <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
          Trusted Technologies & Payment Partners
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          Flexible, encrypted payment options for South Africa and beyond.
        </p>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-10 sm:gap-x-14">
          {partners.map(({ name, Logo }, index) => {
            const delay = inView ? `${300 + index * 80}ms` : "0ms";
            return (
              <div
                key={name}
                className={`group flex flex-col items-center gap-3 transition-all duration-700 ease-out ${
                  inView
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: delay }}
              >
                <Logo className="h-7 w-auto max-w-[120px] grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 sm:h-8" />
                <span className="sr-only">{name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

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
      "Yes. Email hello@moodies.site for help with products, orders or delivery, and our team will assist you.",
  },
] as const;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.12 });

  return (
    <section
      ref={ref}
      id="faq"
      className="flex min-h-[calc(100dvh-4rem)] snap-start items-center border-t border-border"
    >
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <div className="mx-auto w-full max-w-5xl px-5 py-24 sm:py-32">
        <div
          className={`text-center transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
            inView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
            Considered answers
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold uppercase sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mx-auto mt-14 max-w-3xl border-t border-border sm:mt-16">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`border-b border-border transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
                  inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: inView ? `${100 + index * 70}ms` : "0ms" }}
              >
                <Button
                  type="button"
                  variant="ghost"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="h-auto w-full justify-between rounded-none px-0 py-6 text-left font-display text-base font-medium hover:bg-transparent sm:py-7 sm:text-lg"
                >
                  <span className="whitespace-normal pr-6">{faq.question}</span>
                  <ChevronDown
                    className={`size-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                    aria-hidden="true"
                  />
                </Button>
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-hidden={!isOpen}
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
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
      </div>
    </section>
  );
}

function FinalCtaSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="relative flex min-h-[calc(100dvh-4rem)] snap-start items-center overflow-hidden bg-surface-cream"
      aria-labelledby="final-cta-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="animate-float-slow absolute -left-24 top-[12%] h-72 w-72 rounded-full border border-foreground/10" />
        <div className="animate-float-slower absolute -right-20 bottom-[10%] h-56 w-56 rotate-12 rounded-[38%] border border-foreground/10" />
        <svg
          viewBox="0 0 640 220"
          fill="none"
          className="animate-drift-slow absolute left-1/2 top-1/2 w-[44rem] max-w-[110vw] -translate-x-1/2 -translate-y-1/2 text-foreground/10"
        >
          <path d="M20 160C128 24 236 218 338 92C421 -10 516 38 620 148" stroke="currentColor" />
          <path d="M42 190C164 72 242 232 360 124C456 36 534 70 604 176" stroke="currentColor" />
        </svg>
      </div>

      <div
        className={`relative z-10 mx-auto w-full max-w-4xl px-5 py-28 text-center transition-all duration-1000 ease-out motion-reduce:transform-none motion-reduce:transition-none sm:py-36 ${
          inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
          Begin with intention
        </p>
        <h2
          id="final-cta-heading"
          className="mx-auto mt-5 max-w-3xl font-display text-4xl font-bold uppercase sm:text-6xl"
        >
          Ready to Find Your Mood?
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
          Discover premium products crafted around how you want to feel.
        </p>
        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Button asChild size="lg" className="h-12 rounded-none px-8 text-xs uppercase tracking-[0.18em]">
            <Link to="/shop">Shop Collection</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-none border-foreground/25 bg-transparent px-8 text-xs uppercase tracking-[0.18em] hover:bg-background/60"
          >
            <a href="#how-it-works">Take Mood Quiz</a>
          </Button>
        </div>
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

      <TrustSection />
      <PaymentPartnersSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
