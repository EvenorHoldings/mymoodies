import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://mymoodies.lovable.app/about" }],
    meta: [
      { title: "About Moodies — Three Moods, One System" },
      {
        name: "description",
        content:
          "Moodies makes premium wellness edibles and devices built around three moods: Uplift, Calm and Balance.",
      },
      { property: "og:title", content: "About Moodies" },
      {
        property: "og:description",
        content: "Three moods, one restrained system of edibles and devices.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-display text-4xl font-bold uppercase">About</h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          Moodies is a wellness product house built on one idea: choose the mood first, then the
          format. Every cartridge, battery and edible sits in one of three moods — Uplift, Calm or
          Balance — so the decision stays simple.
        </p>
        <p>
          The range covers three cartridge lines (Live Resin, Mate c10g and Standard c10), 510
          thread push batteries in four finishes, and a home grown edibles line of gummies, cookies
          and brownies with clearly printed doses.
        </p>
        <p>
          Packaging is matte, quiet and collectible. Dosage, servings and price are always stated
          plainly. No health claims, no theatre.
        </p>
      </div>
    </div>
  );
}
