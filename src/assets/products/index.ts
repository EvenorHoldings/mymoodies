import p107Black from "./battery-p107-black.webp";
import p107BlackSm from "./battery-p107-black-800.webp";
import p107White from "./battery-p107-white.webp";
import p107WhiteSm from "./battery-p107-white-800.webp";
import p112Gold from "./battery-p112-gold.webp";
import p112GoldSm from "./battery-p112-gold-800.webp";
import p112Steel from "./battery-p112-steel.webp";
import p112SteelSm from "./battery-p112-steel-800.webp";

export type ProductImage = { url: string; small: string; width: number; height: number };
const img = (url: string, small: string): ProductImage => ({
  url,
  small,
  width: 960,
  height: 1200,
});

export const batteryP107Black = img(p107Black, p107BlackSm);
export const batteryP107White = img(p107White, p107WhiteSm);
export const batteryP112Gold = img(p112Gold, p112GoldSm);
export const batteryP112Steel = img(p112Steel, p112SteelSm);
