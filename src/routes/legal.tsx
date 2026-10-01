import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/legal")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://moodiessite.lovable.app/legal" }],
    meta: [
      { title: "Legal & Terms — Moodies" },
      {
        name: "description",
        content:
          "Moodies terms of sale, age restriction, delivery and returns policy for wellness edibles and devices.",
      },
      { property: "og:title", content: "Legal & Terms — Moodies" },
      { property: "og:description", content: "Terms of sale, age restriction and delivery policy." },
    ],
  }),
  component: Legal,
});

const sections = [
  {
    title: "Age restriction",
    body: "Products are sold to adults 18 years and older only. Proof of age may be requested on delivery.",
  },
  {
    title: "Terms of sale",
    body: "All prices are in South African Rand and include VAT where applicable. Orders are confirmed once payment clears.",
  },
  {
    title: "Delivery",
    body: "Flat R100 nationwide delivery, dispatched within two working days. Parcels are packaged discreetly with no product names printed on the outside.",
  },
  {
    title: "Returns",
    body: "Unopened hardware may be returned within 7 days of delivery. For health and safety reasons, edibles and cartridges cannot be returned once opened.",
  },
  {
    title: "Claims",
    body: "Nothing on this site is medical advice. No treatment or cure claims are made for any product.",
  },
];

function Legal() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-display text-4xl font-bold uppercase">Legal</h1>
      <div className="mt-8 divide-y divide-border border-y border-border">
        {sections.map((s) => (
          <section key={s.title} className="py-6">
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.16em]">
              {s.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
