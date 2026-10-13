import cartLiveBalanceBerry from "./cart-live-balance-berry.webp";
import cartLiveBalanceBerrySm from "./cart-live-balance-berry-800.webp";
import cartLiveCalmMint from "./cart-live-calm-mint.webp";
import cartLiveCalmMintSm from "./cart-live-calm-mint-800.webp";
import cartLiveUpliftCitrus from "./cart-live-uplift-citrus.webp";
import cartLiveUpliftCitrusSm from "./cart-live-uplift-citrus-800.webp";
import cartMateBalanceZkittles from "./cart-mate-balance-zkittles.webp";
import cartMateBalanceZkittlesSm from "./cart-mate-balance-zkittles-800.webp";
import cartMateCalmPineapple from "./cart-mate-calm-pineapple.webp";
import cartMateCalmPineappleSm from "./cart-mate-calm-pineapple-800.webp";
import cartMateUpliftGush from "./cart-mate-uplift-gush.webp";
import cartMateUpliftGushSm from "./cart-mate-uplift-gush-800.webp";
import cartStandardBalanceTropical from "./cart-standard-balance-tropical.webp";
import cartStandardBalanceTropicalSm from "./cart-standard-balance-tropical-800.webp";
import cartStandardCalmLavender from "./cart-standard-calm-lavender.webp";
import cartStandardCalmLavenderSm from "./cart-standard-calm-lavender-800.webp";
import cartStandardUpliftMango from "./cart-standard-uplift-mango.webp";
import cartStandardUpliftMangoSm from "./cart-standard-uplift-mango-800.webp";
import edibleBrowniesBalanceSeasalt from "./edible-brownies-balance-seasalt.webp";
import edibleBrowniesBalanceSeasaltSm from "./edible-brownies-balance-seasalt-800.webp";
import edibleBrowniesCalmDark from "./edible-brownies-calm-dark.webp";
import edibleBrowniesCalmDarkSm from "./edible-brownies-calm-dark-800.webp";
import edibleBrowniesUpliftAlmond from "./edible-brownies-uplift-almond.webp";
import edibleBrowniesUpliftAlmondSm from "./edible-brownies-uplift-almond-800.webp";
import edibleCookiesBalanceChoco from "./edible-cookies-balance-choco.webp";
import edibleCookiesBalanceChocoSm from "./edible-cookies-balance-choco-800.webp";
import edibleCookiesCalmLavender from "./edible-cookies-calm-lavender.webp";
import edibleCookiesCalmLavenderSm from "./edible-cookies-calm-lavender-800.webp";
import edibleCookiesUpliftHoney from "./edible-cookies-uplift-honey.webp";
import edibleCookiesUpliftHoneySm from "./edible-cookies-uplift-honey-800.webp";
import edibleGummiesBalanceTropical from "./edible-gummies-balance-tropical.webp";
import edibleGummiesBalanceTropicalSm from "./edible-gummies-balance-tropical-800.webp";
import edibleGummiesCalmBlueberry from "./edible-gummies-calm-blueberry.webp";
import edibleGummiesCalmBlueberrySm from "./edible-gummies-calm-blueberry-800.webp";
import edibleGummiesUpliftCitrus from "./edible-gummies-uplift-citrus.webp";
import edibleGummiesUpliftCitrusSm from "./edible-gummies-uplift-citrus-800.webp";
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

export const packagingImages: Record<string, ProductImage> = {
  cart_live_balance_berry: img(cartLiveBalanceBerry, cartLiveBalanceBerrySm),
  cart_live_calm_mint: img(cartLiveCalmMint, cartLiveCalmMintSm),
  cart_live_uplift_citrus: img(cartLiveUpliftCitrus, cartLiveUpliftCitrusSm),
  cart_mate_balance_zkittles: img(cartMateBalanceZkittles, cartMateBalanceZkittlesSm),
  cart_mate_calm_pineapple: img(cartMateCalmPineapple, cartMateCalmPineappleSm),
  cart_mate_uplift_gush: img(cartMateUpliftGush, cartMateUpliftGushSm),
  cart_standard_balance_tropical: img(cartStandardBalanceTropical, cartStandardBalanceTropicalSm),
  cart_standard_calm_lavender: img(cartStandardCalmLavender, cartStandardCalmLavenderSm),
  cart_standard_uplift_mango: img(cartStandardUpliftMango, cartStandardUpliftMangoSm),
  edible_brownies_balance_seasalt: img(edibleBrowniesBalanceSeasalt, edibleBrowniesBalanceSeasaltSm),
  edible_brownies_calm_dark: img(edibleBrowniesCalmDark, edibleBrowniesCalmDarkSm),
  edible_brownies_uplift_almond: img(edibleBrowniesUpliftAlmond, edibleBrowniesUpliftAlmondSm),
  edible_cookies_balance_choco: img(edibleCookiesBalanceChoco, edibleCookiesBalanceChocoSm),
  edible_cookies_calm_lavender: img(edibleCookiesCalmLavender, edibleCookiesCalmLavenderSm),
  edible_cookies_uplift_honey: img(edibleCookiesUpliftHoney, edibleCookiesUpliftHoneySm),
  edible_gummies_balance_tropical: img(edibleGummiesBalanceTropical, edibleGummiesBalanceTropicalSm),
  edible_gummies_calm_blueberry: img(edibleGummiesCalmBlueberry, edibleGummiesCalmBlueberrySm),
  edible_gummies_uplift_citrus: img(edibleGummiesUpliftCitrus, edibleGummiesUpliftCitrusSm),
};
