import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const { count } = useCart();

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

        <Link
          to="/cart"
          className="border border-border px-4 py-2 text-xs uppercase tracking-[0.16em] transition-colors hover:bg-secondary"
        >
          Cart ({count})
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-start sm:justify-between">
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
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Moodies. 18+ only. Enjoy responsibly.
      </div>
    </footer>
  );
}
