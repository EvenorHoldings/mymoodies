import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const { count } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSignOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    void navigate({ to: "/auth", search: { redirect: undefined }, replace: true });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="font-display text-lg font-bold uppercase tracking-[0.3em]">
          Moodies
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: link.to === "/" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/orders"
                className="text-xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
              >
                Orders
              </Link>
              <button
                type="button"
                onClick={() => void handleSignOut()}
                className="text-xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              search={{ redirect: undefined }}
              className="text-xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
            >
              Sign in
            </Link>
          )}

          <Link
            to="/cart"
            className="border border-border px-4 py-2 text-xs uppercase tracking-[0.16em] transition-colors hover:bg-secondary"
          >
            Cart ({count})
          </Link>
        </div>
      </div>
    </header>
  );
}


export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.3em]">Moodies</p>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Premium wellness edibles & devices. Emotional clarity. Collectible packaging.
          </p>
        </div>

        <div className="flex gap-12 text-sm">
          <div className="flex flex-col gap-2">
            <Link to="/about" className="text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link to="/legal" className="text-muted-foreground hover:text-foreground">
              Legal
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
          <div className="flex flex-col gap-2 text-muted-foreground">
            <a href="mailto:hello@moodies.site" className="hover:text-foreground">
              hello@moodies.site
            </a>
            <a
              href="https://instagram.com/moodies"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
            >
              @moodies
            </a>
          </div>
        </div>

        <div className="max-w-xs text-sm">
          <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-foreground">
            Evenor Holdings (Pty) Ltd
          </p>
          <p className="mt-1 text-xs italic text-muted-foreground">Always Better.</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Reg. No. K2025/717968
            <br />
            CIPC South Africa · B-BBEE Level 2
          </p>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Evenor Holdings (Pty) Ltd. All rights reserved.
      </div>
    </footer>
  );
}
