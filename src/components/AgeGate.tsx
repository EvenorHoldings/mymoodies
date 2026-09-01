import { useEffect, useState } from "react";

const STORAGE_KEY = "moodies-age-verified";

export function AgeGate() {
  const [status, setStatus] = useState<"pending" | "hidden" | "visible" | "blocked">("pending");

  useEffect(() => {
    try {
      setStatus(localStorage.getItem(STORAGE_KEY) === "true" ? "hidden" : "visible");
    } catch {
      setStatus("visible");
    }
  }, []);

  useEffect(() => {
    if (status === "visible" || status === "blocked") {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [status]);

  if (status === "pending" || status === "hidden") return null;

  const confirm = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      /* storage unavailable — session-only confirmation */
    }
    setStatus("hidden");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 px-5 backdrop-blur"
    >
      <div className="w-full max-w-md border border-border bg-card p-8 text-center">
        <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Moodies</p>
        <h2 id="age-gate-title" className="mt-4 font-display text-2xl font-bold uppercase">
          {status === "blocked" ? "Come back later" : "Are you 18 or older?"}
        </h2>

        {status === "blocked" ? (
          <>
            <p className="mt-4 text-sm text-muted-foreground">
              You must be 18 or older to browse this store. You're being redirected away.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <a
                href="https://www.google.com"
                className="bg-primary px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-85"
              >
                Leave site now
              </a>
              <button
                type="button"
                onClick={() => setStatus("visible")}
                className="border border-border px-6 py-3 text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
              >
                Back
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="mt-4 text-sm text-muted-foreground">
              Our products are for adults only. Please confirm your age to continue.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <button
                type="button"
                onClick={confirm}
                className="bg-primary px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-85"
              >
                Yes, I'm 18+
              </button>
              <button
                type="button"
                onClick={() => setStatus("blocked")}
                className="border border-border px-6 py-3 text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
              >
                No, I'm under 18
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
