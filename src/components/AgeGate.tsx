import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "moodies-age-verified";

export function AgeGate() {
  const [status, setStatus] = useState<"pending" | "hidden" | "visible" | "blocked">("pending");
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      setStatus(localStorage.getItem(STORAGE_KEY) === "true" ? "hidden" : "visible");
    } catch {
      setStatus("visible");
    }
  }, []);

  useEffect(() => {
    if (status !== "visible" && status !== "blocked") return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const node = dialogRef.current;
    const focusables = () =>
      Array.from(
        node?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []
      );
    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0]!;
      const last = items[items.length - 1]!;
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !node?.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !node?.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKeyDown, true);
    };
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
      aria-describedby="age-gate-copy"
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 px-5 backdrop-blur"
    >
      <div ref={dialogRef} className="w-full max-w-md rounded-lg border border-border bg-card p-8 text-center">
        <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
          Moodies · Taste Your Mood
        </p>
        <h2 id="age-gate-title" className="mt-4 font-display text-2xl font-bold uppercase">
          {status === "blocked" ? "Come back later" : "Are you 18 or older?"}
        </h2>

        {status === "blocked" ? (
          <>
            <p id="age-gate-copy" className="mt-4 text-sm text-muted-foreground">
              Moodies products are sold to adults aged 18 and over only, so we can't show you this
              store yet.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <a
                href="https://www.westerncape.gov.za/general-publication/substance-abuse-help"
                target="_blank"
                rel="noreferrer"
                className="rounded-md bg-primary px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-85"
              >
                Leave site & get support
              </a>
              <button
                type="button"
                onClick={() => setStatus("visible")}
                className="rounded-md border border-border px-6 py-3 text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
              >
                Back
              </button>
            </div>
          </>
        ) : (
          <>
            <p id="age-gate-copy" className="mt-4 text-sm text-muted-foreground">
              Our products are for adults only. Please confirm your age to continue.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <button
                type="button"
                onClick={confirm}
                className="rounded-md bg-primary px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-85"
              >
                Yes, I'm 18+
              </button>
              <button
                type="button"
                onClick={() => setStatus("blocked")}
                className="rounded-md border border-border px-6 py-3 text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
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
