import assert from "node:assert/strict";
import { test } from "node:test";
import { products } from "@/data/products";

const drinks = products.filter((product) => product.category === "drink");

test("Moodies canned drinks are priced at R70 per can", () => {
  assert.deepEqual(
    drinks.map((product) => product.price),
    [70, 70, 70],
  );
});

test("drink strength labels match the supplied color coding", () => {
  const strengths = drinks.map(({ subcategory, spec }) => [subcategory, spec]);
  assert.deepEqual(strengths, [
    ["soda_oxblood", "45 mg THC · Non-alcoholic · Cannabis-infused"],
    ["soda_maroon", "Mild strength · Non-alcoholic · Cannabis-infused"],
    ["soda_scarlet", "Lighter strength · Non-alcoholic · Cannabis-infused"],
  ]);
});