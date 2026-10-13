import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://www.moodies.life/contact" }],
    meta: [
      { title: "Contact Moodies — Orders & Support" },
      {
        name: "description",
        content:
          "Reach the Moodies team about orders, delivery and stockist enquiries. Email hello@moodies.life.",
      },
      { property: "og:title", content: "Contact Moodies" },
      { property: "og:description", content: "Orders, delivery and stockist enquiries." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-display text-4xl font-bold uppercase">Contact</h1>
      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        <div className="border border-border p-6">
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.16em]">General</h2>
          <a
            href="mailto:hello@moodies.life"
            className="mt-3 block text-sm text-muted-foreground hover:text-foreground"
          >
            hello@moodies.life
          </a>
        </div>
        <div className="border border-border p-6">
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.16em]">Instagram</h2>
          <a
            href="https://instagram.com/moodies"
            target="_blank"
            rel="noreferrer"
            className="mt-3 block text-sm text-muted-foreground hover:text-foreground"
          >
            @moodies
          </a>
        </div>
      </div>
      <div className="mt-8 border border-border p-6 text-sm text-muted-foreground">
        <p>Delivery is flat R100 nationwide, dispatched within two working days.</p>
        <p className="mt-2">Discreet packaging. No product names on parcel.</p>
      </div>
    </div>
  );
}
