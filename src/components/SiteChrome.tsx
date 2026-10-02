import { useEffect, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/hooks/useAuth";
import { amIAdmin } from "@/lib/admin.functions";
import { supabase } from "@/integrations/supabase/client";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

const linkClass =
  "text-xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function SiteHeader() {
  const { count } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const checkAdmin = useServerFn(amIAdmin);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const { data: isAdmin } = useQuery({
    queryKey: ["am-i-admin"],
    queryFn: () => checkAdmin(),
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
  });

  const handleSignOut = async () => {
    setMenuOpen(false);
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    void navigate({ to: "/auth", search: { redirect: undefined }, replace: true });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link
          to="/"
          className="font-display text-base font-bold uppercase tracking-[0.28em] sm:text-lg sm:tracking-[0.3em]"
        >
          Moodies
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={linkClass}
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: link.to === "/" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <>
                <Link to="/orders" className={linkClass}>
                  Orders
                </Link>
                {isAdmin ? (
                  <Link to="/admin" className={linkClass}>
                    Admin
                  </Link>
                ) : null}
                <button type="button" onClick={() => void handleSignOut()} className={linkClass}>
                  Sign out
                </button>
              </>
            ) : (
              <Link to="/auth" search={{ redirect: undefined }} className={linkClass}>
                Sign in
              </Link>
            )}
          </div>

          <Link
            to="/cart"
            aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
            className="flex items-center gap-2 border border-border px-3 py-2 text-xs uppercase tracking-[0.16em] transition-colors hover:bg-secondary sm:px-4"
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            <span>({count})</span>
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center border border-border transition-colors hover:bg-secondary md:hidden"
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-t border-border bg-background md:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col px-5 py-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="border-b border-border/60 py-4 text-sm uppercase tracking-[0.16em] text-muted-foreground last:border-b-0"
                activeProps={{ className: "text-foreground" }}
                activeOptions={{ exact: link.to === "/" }}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  to="/orders"
                  onClick={() => setMenuOpen(false)}
                  className="border-t border-border/60 py-4 text-sm uppercase tracking-[0.16em] text-muted-foreground"
                >
                  Orders
                </Link>
                {isAdmin ? (
                  <Link
                    to="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="border-t border-border/60 py-4 text-sm uppercase tracking-[0.16em] text-muted-foreground"
                  >
                    Admin
                  </Link>
                ) : null}
                <button
                  type="button"
                  onClick={() => void handleSignOut()}
                  className="border-t border-border/60 py-4 text-left text-sm uppercase tracking-[0.16em] text-muted-foreground"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                search={{ redirect: undefined }}
                onClick={() => setMenuOpen(false)}
                className="border-t border-border/60 py-4 text-sm uppercase tracking-[0.16em] text-muted-foreground"
              >
                Sign in
              </Link>
            )}
          </div>
        </nav>
      ) : null}
    </header>
  );
}

const footerLinkClass = "text-muted-foreground transition-colors hover:text-foreground";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.3em]">Moodies</p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Taste Your Mood. Premium wellness edibles and devices, made for emotional clarity.
          </p>
        </div>

        <nav aria-label="Shop" className="text-sm">
          <h2 className="font-display text-xs font-bold uppercase tracking-[0.18em]">Shop</h2>
          <ul className="mt-4 flex flex-col gap-2">
            <li>
              <Link to="/shop" className={footerLinkClass}>
                All products
              </Link>
            </li>
            <li>
              <Link to="/shop" search={{ mood: "uplift", category: undefined }} className={footerLinkClass}>
                Uplift
              </Link>
            </li>
            <li>
              <Link to="/shop" search={{ mood: "calm", category: undefined }} className={footerLinkClass}>
                Calm
              </Link>
            </li>
            <li>
              <Link to="/shop" search={{ mood: "balance", category: undefined }} className={footerLinkClass}>
                Balance
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Help" className="text-sm">
          <h2 className="font-display text-xs font-bold uppercase tracking-[0.18em]">Help</h2>
          <ul className="mt-4 flex flex-col gap-2">
            <li>
              <Link to="/contact" className={footerLinkClass}>
                Contact
              </Link>
            </li>
            <li>
              <Link to="/orders" className={footerLinkClass}>
                Order history
              </Link>
            </li>
            <li>
              <a href="mailto:hello@moodies.life" className={footerLinkClass}>
                hello@moodies.life
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/moodies"
                target="_blank"
                rel="noreferrer"
                aria-label="Moodies on Instagram (opens in a new tab)"
                className={footerLinkClass}
              >
                @moodies
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label="Company" className="text-sm">
          <h2 className="font-display text-xs font-bold uppercase tracking-[0.18em]">Company</h2>
          <ul className="mt-4 flex flex-col gap-2">
            <li>
              <Link to="/about" className={footerLinkClass}>
                About Moodies
              </Link>
            </li>
            <li>
              <Link to="/legal" className={footerLinkClass}>
                Legal & privacy
              </Link>
            </li>
            <li className="text-muted-foreground">Delivery: flat R100 nationwide</li>
            <li className="text-muted-foreground">18+ only. Enjoy responsibly.</li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            <span className="font-display uppercase tracking-[0.16em] text-foreground">
              Evenor Holdings (Pty) Ltd
            </span>{" "}
            · Always Better. · Reg. No. K2025/717968 · CIPC South Africa · B-BBEE Level 2
          </p>
          <p>© {new Date().getFullYear()} Evenor Holdings (Pty) Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
