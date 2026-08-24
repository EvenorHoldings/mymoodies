import cartUplift from "@/assets/cart-uplift.jpg";
import cartCalm from "@/assets/cart-calm.jpg";
import cartBalance from "@/assets/cart-balance.jpg";
import cartUpliftMate from "@/assets/cart-uplift-mate.jpg";
import cartCalmMate from "@/assets/cart-calm-mate.jpg";
import cartBalanceMate from "@/assets/cart-balance-mate.jpg";
import cartUpliftStandard from "@/assets/cart-uplift-standard.jpg";
import cartCalmStandard from "@/assets/cart-calm-standard.jpg";
import cartBalanceStandard from "@/assets/cart-balance-standard.jpg";
import p107Black from "@/assets/p107-black.jpg";
import p107White from "@/assets/p107-white.jpg";
import p112Gold from "@/assets/p112-gold.jpg";
import p112Steel from "@/assets/p112-steel.jpg";
import gummies from "@/assets/gummies.jpg";
import cookie from "@/assets/cookie.jpg";
import brownie from "@/assets/brownie.jpg";
import gummiesCalm from "@/assets/gummies-calm.jpg";
import gummiesBalance from "@/assets/gummies-balance.jpg";
import cookieCalm from "@/assets/cookie-calm.jpg";
import cookieBalance from "@/assets/cookie-balance.jpg";
import brownieCalm from "@/assets/brownie-calm.jpg";
import brownieBalance from "@/assets/brownie-balance.jpg";

export type Mood = "uplift" | "calm" | "balance" | "neutral";
export type Category = "cartridge" | "battery" | "edible";

export type Product = {
  id: string;
  name: string;
  category: Category;
  subcategory: string;
  mood: Mood;
  price: number;
  sku: string;
  image: string;
  description: string;
  spec: string;
  servings: string;
};

export const moodLabels: Record<Mood, string> = {
  uplift: "Uplift",
  calm: "Calm",
  balance: "Balance",
  neutral: "Hardware",
};

export const subcategoryLabels: Record<string, string> = {
  live_resin: "Live Resin",
  mate: "Mate c10g",
  standard: "Standard c10",
  push_button: "Push Battery",
  smart_display: "Smart Display",
  gummies: "Gummies",
  cookies: "Cookies",
  brownies: "Brownies",
};

export const products: Product[] = [
  {
    id: "cart_live_uplift_citrus",
    name: "UPLIFT CITRUS BLEND",
    category: "cartridge",
    subcategory: "live_resin",
    mood: "uplift",
    price: 1400,
    sku: "UPLIFT-LR-CITRUS",
    image: cartUplift,
    description: "Premium live resin cartridge. Bright citrus blend for morning clarity and creative energy.",
    spec: "Live Resin \u00b7 1",
    servings: "Multiple",
  },
  {
    id: "cart_live_calm_mint",
    name: "CALM MINT FROST",
    category: "cartridge",
    subcategory: "live_resin",
    mood: "calm",
    price: 1400,
    sku: "CALM-LR-MINT",
    image: cartCalm,
    description: "Premium live resin. Cool mint with subtle floral notes for evening relaxation.",
    spec: "Live Resin \u00b7 1",
    servings: "Multiple",
  },
  {
    id: "cart_live_balance_berry",
    name: "BALANCE BERRY MEDLEY",
    category: "cartridge",
    subcategory: "live_resin",
    mood: "balance",
    price: 1400,
    sku: "BALANCE-LR-BERRY",
    image: cartBalance,
    description: "Premium live resin. Mixed berry profile for balanced, centered wellness.",
    spec: "Live Resin \u00b7 1",
    servings: "Multiple",
  },
  {
    id: "cart_mate_uplift_gush",
    name: "UPLIFT GUSH",
    category: "cartridge",
    subcategory: "mate",
    mood: "uplift",
    price: 1000,
    sku: "UPLIFT-MATE-GUSH",
    image: cartUpliftMate,
    description: "Mate line, c10g format. Sweet mango notes with energizing clarity.",
    spec: "Mate \u00b7 1 \u00b7 c10g",
    servings: "Multiple",
  },
  {
    id: "cart_mate_calm_pineapple",
    name: "CALM PINEAPPLE EXPRESS",
    category: "cartridge",
    subcategory: "mate",
    mood: "calm",
    price: 1000,
    sku: "CALM-MATE-PINE",
    image: cartCalmMate,
    description: "Mate line, c10g. Tropical pineapple for relaxed focus and calm presence.",
    spec: "Mate \u00b7 1 \u00b7 c10g",
    servings: "Multiple",
  },
  {
    id: "cart_mate_balance_zkittles",
    name: "BALANCE ZKITTLES",
    category: "cartridge",
    subcategory: "mate",
    mood: "balance",
    price: 1000,
    sku: "BALANCE-MATE-ZKIT",
    image: cartBalanceMate,
    description: "Mate line, c10g. Rainbow candy notes for subtle, balanced wellness.",
    spec: "Mate \u00b7 1 \u00b7 c10g",
    servings: "Multiple",
  },
  {
    id: "cart_standard_uplift_mango",
    name: "UPLIFT MANGO",
    category: "cartridge",
    subcategory: "standard",
    mood: "uplift",
    price: 700,
    sku: "UPLIFT-STD-MANGO",
    image: cartUpliftStandard,
    description: "Standard c10 cartridge. Smooth mango flavor for everyday uplift.",
    spec: "Standard \u00b7 1 \u00b7 c10",
    servings: "Multiple",
  },
  {
    id: "cart_standard_calm_lavender",
    name: "CALM LAVENDER",
    category: "cartridge",
    subcategory: "standard",
    mood: "calm",
    price: 700,
    sku: "CALM-STD-LAV",
    image: cartCalmStandard,
    description: "Standard c10 cartridge. Calming lavender notes for relaxation.",
    spec: "Standard \u00b7 1 \u00b7 c10",
    servings: "Multiple",
  },
  {
    id: "cart_standard_balance_tropical",
    name: "BALANCE TROPICAL",
    category: "cartridge",
    subcategory: "standard",
    mood: "balance",
    price: 700,
    sku: "BALANCE-STD-TROP",
    image: cartBalanceStandard,
    description: "Standard c10 cartridge. Tropical blend for balanced wellness.",
    spec: "Standard \u00b7 1 \u00b7 c10",
    servings: "Multiple",
  },
  {
    id: "battery_p107_black",
    name: "510 PUSH BATTERY P107 \u2014 MIDNIGHT BLACK",
    category: "battery",
    subcategory: "push_button",
    mood: "neutral",
    price: 400,
    sku: "P107-BLACK",
    image: p107Black,
    description: "Classic 510 thread push battery. Matte black finish, USB-C charging.",
    spec: "510 Thread \u00b7 P107 \u00b7 1000 \u00b7 USB-C \u00b7 None \u00b7 Midnight Black \u00b7 Matte",
    servings: "N/A",
  },
  {
    id: "battery_p107_white",
    name: "510 PUSH BATTERY P107 \u2014 PEARL WHITE",
    category: "battery",
    subcategory: "push_button",
    mood: "neutral",
    price: 400,
    sku: "P107-WHITE",
    image: p107White,
    description: "Classic 510 thread push battery. Pearl white finish, USB-C charging.",
    spec: "510 Thread \u00b7 P107 \u00b7 1000 \u00b7 USB-C \u00b7 None \u00b7 Pearl White \u00b7 Matte",
    servings: "N/A",
  },
  {
    id: "battery_p112_gold",
    name: "510 PUSH BATTERY P112 \u2014 ROSE GOLD",
    category: "battery",
    subcategory: "smart_display",
    mood: "neutral",
    price: 400,
    sku: "P112-GOLD",
    image: p112Gold,
    description: "Smart 510 battery with LED display. Rose gold finish, 1200mAh capacity.",
    spec: "510 Thread \u00b7 P112 \u00b7 1200 \u00b7 USB-C \u00b7 LED Smart Display \u00b7 Rose Gold \u00b7 Metallic",
    servings: "N/A",
  },
  {
    id: "battery_p112_steel",
    name: "510 PUSH BATTERY P112 \u2014 GUNMETAL STEEL",
    category: "battery",
    subcategory: "smart_display",
    mood: "neutral",
    price: 400,
    sku: "P112-STEEL",
    image: p112Steel,
    description: "Smart 510 battery with LED display. Gunmetal steel finish, 1200mAh capacity.",
    spec: "510 Thread \u00b7 P112 \u00b7 1200 \u00b7 USB-C \u00b7 LED Smart Display \u00b7 Gunmetal Steel \u00b7 Metallic",
    servings: "N/A",
  },
  {
    id: "edible_gummies_uplift_citrus",
    name: "UPLIFTED CITRUS GUMMIES",
    category: "edible",
    subcategory: "gummies",
    mood: "uplift",
    price: 350,
    sku: "EDIBLE-GUM-CITRUS",
    image: gummies,
    description: "Bright citrus blend for morning clarity. Resealable kraft pouch.",
    spec: "5 \u00b7 10 \u00b7 50 \u00b7 Matte kraft pouch, resealable \u00b7 Matte",
    servings: "5 servings, 10mg per serving",
  },
  {
    id: "edible_gummies_calm_blueberry",
    name: "CALM BLUEBERRY GUMMIES",
    category: "edible",
    subcategory: "gummies",
    mood: "calm",
    price: 350,
    sku: "EDIBLE-GUM-BLUE",
    image: gummiesCalm,
    description: "Relaxing blueberry notes for evening ritual. Resealable kraft pouch.",
    spec: "5 \u00b7 10 \u00b7 50 \u00b7 Matte kraft pouch, resealable \u00b7 Matte",
    servings: "5 servings, 10mg per serving",
  },
  {
    id: "edible_gummies_balance_tropical",
    name: "BALANCE TROPICAL GUMMIES",
    category: "edible",
    subcategory: "gummies",
    mood: "balance",
    price: 350,
    sku: "EDIBLE-GUM-TROP",
    image: gummiesBalance,
    description: "Balanced tropical fruit blend. Resealable kraft pouch.",
    spec: "5 \u00b7 10 \u00b7 50 \u00b7 Matte kraft pouch, resealable \u00b7 Matte",
    servings: "5 servings, 10mg per serving",
  },
  {
    id: "edible_cookies_uplift_honey",
    name: "UPLIFTED HONEY OAT COOKIE",
    category: "edible",
    subcategory: "cookies",
    mood: "uplift",
    price: 280,
    sku: "EDIBLE-COOK-HONEY",
    image: cookie,
    description: "Handcrafted honey-oat with warm spices. White kraft box, embossed.",
    spec: "1 \u00b7 20 \u00b7 20 \u00b7 White kraft box, embossed logo \u00b7 Handcrafted",
    servings: "1 serving, 20mg",
  },
  {
    id: "edible_cookies_calm_lavender",
    name: "CALM LAVENDER SHORTBREAD COOKIE",
    category: "edible",
    subcategory: "cookies",
    mood: "calm",
    price: 280,
    sku: "EDIBLE-COOK-LAV",
    image: cookieCalm,
    description: "Buttery shortbread infused with culinary lavender. Embossed kraft box.",
    spec: "1 \u00b7 20 \u00b7 20 \u00b7 Kraft box, embossed logo \u00b7 Handcrafted",
    servings: "1 serving, 20mg",
  },
  {
    id: "edible_cookies_balance_choco",
    name: "BALANCE CHOCOLATE ESPRESSO COOKIE",
    category: "edible",
    subcategory: "cookies",
    mood: "balance",
    price: 280,
    sku: "EDIBLE-COOK-CHOCO",
    image: cookieBalance,
    description: "Dark chocolate meets smooth espresso notes. Embossed kraft box.",
    spec: "1 \u00b7 20 \u00b7 20 \u00b7 Kraft box, embossed logo \u00b7 Handcrafted",
    servings: "1 serving, 20mg",
  },
  {
    id: "edible_brownies_uplift_almond",
    name: "UPLIFTED ALMOND BROWNIE",
    category: "edible",
    subcategory: "brownies",
    mood: "uplift",
    price: 220,
    sku: "EDIBLE-BROW-ALMOND",
    image: brownie,
    description: "Fudgy brownie with sliced almonds. Eco-friendly cardboard sleeve.",
    spec: "1 \u00b7 25 \u00b7 25 \u00b7 Cardboard sleeve, eco-friendly \u00b7 Artisanal",
    servings: "1 serving, 25mg",
  },
  {
    id: "edible_brownies_calm_dark",
    name: "CALM DARK CHOCOLATE BROWNIE",
    category: "edible",
    subcategory: "brownies",
    mood: "calm",
    price: 220,
    sku: "EDIBLE-BROW-DARK",
    image: brownieCalm,
    description: "Premium dark chocolate brownie. Cardboard sleeve, minimal branding.",
    spec: "1 \u00b7 25 \u00b7 25 \u00b7 Cardboard sleeve \u00b7 Artisanal",
    servings: "1 serving, 25mg",
  },
  {
    id: "edible_brownies_balance_seasalt",
    name: "BALANCE SEA SALT BROWNIE",
    category: "edible",
    subcategory: "brownies",
    mood: "balance",
    price: 220,
    sku: "EDIBLE-BROW-SALT",
    image: brownieBalance,
    description: "Rich brownie with sea salt crunch. Cardboard sleeve.",
    spec: "1 \u00b7 25 \u00b7 25 \u00b7 Cardboard sleeve \u00b7 Artisanal",
    servings: "1 serving, 25mg",
  },
];

export const formatZar = (value: number) => `R${value.toLocaleString("en-ZA")}`;
