// Self-hosted editorial imagery (previously served from Lovable's /__l5e asset CDN,
// which 404s off the Lovable domain).
import hero from "./editorial-hero.webp";
import heroSm from "./editorial-hero-800.webp";
import uplift from "./editorial-uplift.webp";
import upliftSm from "./editorial-uplift-800.webp";
import calm from "./editorial-calm.webp";
import calmSm from "./editorial-calm-800.webp";
import balance from "./editorial-balance.webp";
import balanceSm from "./editorial-balance-800.webp";
import hardware from "./editorial-hardware.webp";
import hardwareSm from "./editorial-hardware-800.webp";
import edibles from "./editorial-edibles.webp";
import ediblesSm from "./editorial-edibles-800.webp";
import wholesale from "./editorial-wholesale.webp";
import wholesaleSm from "./editorial-wholesale-800.webp";

export type EditorialImage = { url: string; small: string; width: number; height: number };
const img = (url: string, small: string, width: number, height: number): EditorialImage => ({
  url,
  small,
  width,
  height,
});

export const heroImage = img(hero, heroSm, 928, 1152);
export const upliftImage = img(uplift, upliftSm, 1024, 1024);
export const calmImage = img(calm, calmSm, 1024, 1024);
export const balanceImage = img(balance, balanceSm, 1024, 1024);
export const hardwareImage = img(hardware, hardwareSm, 1024, 1024);
export const ediblesImage = img(edibles, ediblesSm, 1024, 1024);
export const wholesaleImage = img(wholesale, wholesaleSm, 1264, 848);
