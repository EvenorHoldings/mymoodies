import type { Mood } from "@/data/products";

export function moodBorder(mood: Mood) {
  switch (mood) {
    case "uplift":
      return "border-l-uplift";
    case "calm":
      return "border-l-calm";
    case "balance":
      return "border-l-balance";
    default:
      return "border-l-border";
  }
}

export function moodBg(mood: Mood) {
  switch (mood) {
    case "uplift":
      return "bg-uplift";
    case "calm":
      return "bg-calm";
    case "balance":
      return "bg-balance";
    default:
      return "bg-border";
  }
}
