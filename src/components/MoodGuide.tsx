import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { recommendProducts, type Recommendation } from "@/lib/recommend.functions";

export function MoodGuide() {
  const recommend = useServerFn(recommendProducts);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    intro: string;
    picks: Recommendation[];
    error?: string;
  } | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (prompt.trim().length < 3 || loading) return;
    setLoading(true);
    try {
      setResult(await recommend({ data: { prompt } }));
    } catch {
      setResult({ intro: "", picks: [], error: "We couldn't find recommendations right now." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="mood-guide" className="bg-secondary py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
            Your personal guide
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-5xl">
            What’s your mood today?
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            Describe how you feel or the occasion, and we’ll suggest products from the Moodies
            range.
          </p>
        </div>
        <form onSubmit={submit} className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row">
          <label htmlFor="mood-prompt" className="sr-only">
            Describe your mood or occasion
          </label>
          <input
            id="mood-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            maxLength={500}
            placeholder="e.g. A slow Sunday evening after a busy week"
            className="min-h-12 flex-1 border border-border bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <Button
            type="submit"
            size="lg"
            disabled={loading || prompt.trim().length < 3}
            className="rounded-none px-7"
          >
            <Sparkles className="size-4" /> {loading ? "Finding…" : "Find my match"}
          </Button>
        </form>
        <div aria-live="polite" className="mt-12">
          {result?.error ? (
            <p className="text-center text-sm text-destructive">{result.error}</p>
          ) : null}
          {result && !result.error ? (
            <>
              {result.intro ? (
                <p className="mx-auto max-w-2xl text-center font-display text-xl">{result.intro}</p>
              ) : null}
              {result.picks.length === 0 ? (
                <p className="text-center text-sm text-muted-foreground">
                  No close matches — try describing it differently.
                </p>
              ) : (
                <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                  {result.picks.map((pick) => {
                    const product = products.find((p) => p.id === pick.id);
                    return product ? (
                      <div key={pick.id}>
                        <ProductCard product={product} compact />
                        <p className="mt-3 text-xs leading-5 text-muted-foreground">
                          {pick.reason}
                        </p>
                      </div>
                    ) : null;
                  })}
                </div>
              )}
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
