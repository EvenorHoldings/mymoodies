import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate, useSearch, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search["redirect"] === "string" ? (search["redirect"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Sign In — Moodies" },
      { name: "robots", content: "noindex" },
      {
        name: "description",
        content: "Sign in to your Moodies account to track orders and view your order history.",
      },
      { property: "og:title", content: "Sign In — Moodies" },
      { property: "og:description", content: "Access your Moodies orders and order history." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/auth" });
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const field =
    "w-full border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-ring";
  const label = "text-[11px] uppercase tracking-[0.16em] text-muted-foreground";

  // Only allow same-site paths ("/orders"), never "//evil.com" or "/\\evil.com".
  const destination =
    search.redirect && /^\/(?![/\\])/.test(search.redirect) ? search.redirect : "/orders";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setNotice(null);
    setBusy(true);
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    try {
      if (mode === "signup") {
        const { data: result, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (signUpError) throw signUpError;
        if (!result.session) {
          setNotice("Check your email to confirm your account, then sign in.");
          return;
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
      }
      void navigate({ to: destination });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setError("Google sign-in failed. Please try again.");
      return;
    }
    if (result.redirected) return;
    void navigate({ to: destination });
  };

  return (
    <div className="mx-auto max-w-md px-5 py-20">
      <h1 className="font-display text-4xl font-bold uppercase">
        {mode === "signin" ? "Sign in" : "Create account"}
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Track your orders and keep your full order history in one place.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label className="block space-y-1.5">
          <span className={label}>Email</span>
          <input
            name="email"
            type="email"
            required
            maxLength={255}
            autoComplete="email"
            className={field}
          />
        </label>
        <label className="block space-y-1.5">
          <span className={label}>Password</span>
          <input
            name="password"
            type="password"
            required
            minLength={mode === "signup" ? 8 : 6}
            maxLength={72}
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
            className={field}
          />
        </label>

        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        {notice ? <p className="text-sm text-muted-foreground">{notice}</p> : null}

        <button
          type="submit"
          disabled={busy}
          className="w-full bg-primary py-3 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-85 disabled:opacity-50"
        >
          {mode === "signin" ? "Sign in" : "Create account"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => void handleGoogle()}
        className="mt-4 w-full border border-border py-3 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-secondary"
      >
        Continue with Google
      </button>

      <button
        type="button"
        onClick={() => {
          setMode(mode === "signin" ? "signup" : "signin");
          setError(null);
          setNotice(null);
        }}
        className="mt-8 text-xs uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground"
      >
        {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
      </button>

      <p className="mt-8 text-xs text-muted-foreground">
        You can also{" "}
        <Link to="/shop" className="text-foreground underline">
          keep shopping
        </Link>{" "}
        and check out as a guest.
      </p>
    </div>
  );
}
