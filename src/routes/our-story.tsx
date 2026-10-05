import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/our-story")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://moodies.life/our-story" }],
    meta: [
      { title: "Our Story — Moodies, a South African Wellness Brand" },
      {
        name: "description",
        content:
          "The Moodies story: a South African brand by Evenor Holdings built around three moods — Uplift, Calm and Balance. Our mission and values.",
      },
      { property: "og:title", content: "Our Story — Moodies" },
      {
        property: "og:description",
        content: "A South African brand built around how you want to feel. Taste Your Mood.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OurStory,
});

const values = [
  { title: "Mood first", copy: "Start with how you want to feel, then choose the format. Uplift, Calm or Balance." },
  { title: "Radical clarity", copy: "Doses, servings and prices printed plainly. No health claims, no theatre." },
  { title: "Proudly South African", copy: "Built and registered in South Africa, made for the way we live here." },
  { title: "Responsible enjoyment", copy: "Strictly 18+, discreetly packaged, and always guided by moderation." },
  { title: "Always better", copy: "Our parent company's promise: every batch, box and order a little better than the last." },
];

function OurStory() {
  return (
    <div>
      <section className="bg-surface-cream py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Our story</p>
          <h1 className="mt-5 font-display text-4xl font-bold uppercase sm:text-6xl">Taste Your Mood.</h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            Moodies is a South African wellness brand built on one simple idea: how you want to
            feel should guide what you choose.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase">Where we come from</h2>
            <div className="mt-6 space-y-5 text-sm leading-relaxed text-muted-foreground">
              <p>
                Moodies is a product of Evenor Holdings (Pty) Ltd, registered with CIPC in South
                Africa and rated B-BBEE Level 2. We started with a frustration: wellness products
                that were loud, confusing and impossible to compare.
              </p>
              <p>
                So we simplified everything into three moods — Uplift, Calm and Balance — and built
                a considered range of cartridges, devices and home grown edibles around them.
              </p>
            </div>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold uppercase">Our mission</h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              To make choosing a wellness product as simple as naming a feeling — with honest
              labelling, quality you can trust and discreet delivery across South Africa.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface-cream py-24">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="font-display text-2xl font-bold uppercase">Our values</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em]">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.copy}</p>
              </div>
            ))}
          </div>
          <Link
            to="/shop"
            className="mt-12 inline-block bg-primary px-7 py-3 text-xs uppercase tracking-[0.2em] text-primary-foreground"
          >
            Find your mood
          </Link>
        </div>
      </section>
    </div>
  );
}
