import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type Recommendation = { id: string; reason: string };

export const recommendProducts = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ prompt: z.string().trim().min(3).max(500) }).parse(data))
  .handler(
    async ({ data }): Promise<{ intro: string; picks: Recommendation[]; error?: string }> => {
      const { enforceRateLimit, RateLimitError } = await import("./rate-limit.server");
      try {
        // Each request spends AI credits; cap per visitor.
        enforceRateLimit("recommend", 8, 10 * 60 * 1000);
      } catch (e) {
        if (e instanceof RateLimitError)
          return {
            intro: "",
            picks: [],
            error: "Our guide is busy right now. Please try again in a few minutes.",
          };
        throw e;
      }
      const apiKey = process.env["LOVABLE_API_KEY"];
      if (!apiKey)
        return { intro: "", picks: [], error: "Recommendations are not configured yet." };
      const { products, moodLabels } = await import("@/data/products");
      const { createOpenAI } = await import("@ai-sdk/openai");
      const { streamText } = await import("ai");
      const { createLovableAiGatewayRunIdFetch } = await import("./run-id.server");

      const catalog = products
        .map(
          (p) =>
            `${p.id} | ${p.name} | ${p.category} | mood: ${moodLabels[p.mood]} | R${p.price} | ${p.description}`,
        )
        .join("\n");

      const runIdFetch = createLovableAiGatewayRunIdFetch();
      const provider = createOpenAI({
        baseURL: "https://ai.gateway.lovable.dev/v1",
        apiKey,
        headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
        fetch: runIdFetch.fetch,
      });

      try {
        const result = streamText({
          model: provider.responses("openai/gpt-6-astra"),
          system:
            'You are the Moodies product guide for an adult (18+) South African wellness brand. Recommend 2-4 products ONLY from the catalog that fit the shopper\'s mood or occasion. Never give medical claims. Reply with ONLY JSON: {"intro": string (one warm sentence), "picks": [{"id": catalog id, "reason": short sentence}]}.',
          prompt: `Catalog (id | name | category | mood | price | description):\n${catalog}\n\nShopper: ${data.prompt}`,
          providerOptions: {
            openai: {
              forceReasoning: true,
              reasoningEffort: "low",
              reasoningSummary: "auto",
              store: false,
              include: ["reasoning.encrypted_content"],
            },
          },
        });
        const text = await result.text;
        const json = JSON.parse(text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1));
        const ids = new Set(products.map((p) => p.id));
        const picks = (Array.isArray(json.picks) ? json.picks : [])
          .filter((p: Recommendation) => ids.has(p.id))
          .slice(0, 4);
        return {
          intro: String(json.intro ?? "").slice(0, 400),
          picks: picks.map((p: Recommendation) => ({
            id: p.id,
            reason: String(p.reason ?? "").slice(0, 300),
          })),
        };
      } catch (e) {
        const status = (e as { statusCode?: number }).statusCode;
        const msg =
          status === 429
            ? "Our guide is busy right now. Please try again in a moment."
            : status === 402
              ? "AI credits have run out for this workspace."
              : "We couldn't find recommendations right now. Please try again.";
        return { intro: "", picks: [], error: msg };
      }
    },
  );
