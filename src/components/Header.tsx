import { Link } from "@tanstack/react-router";
import { Heart, Search, Settings, ShoppingBag, User } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/vendors", label: "Vendors" },
  { to: "/offers", label: "Offers" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-serif text-3xl font-bold tracking-tight text-primary">
            Aisle<span className="text-amber">Mind</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="relative text-sm font-medium text-foreground/80 transition-colors hover:text-primary data-[status=active]:text-primary"
              activeProps={{ className: "font-semibold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden flex-1 max-w-md md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search products, brands, categories…"
              className="h-10 w-full rounded-full border border-border bg-secondary/50 pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent focus:bg-background"
            />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Link
            to="/login"
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground/80 hover:bg-secondary hover:text-primary"
            aria-label="Account"
          >
            <User className="h-5 w-5" />
          </Link>
          <Link
            to="/wishlist"
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground/80 hover:bg-secondary hover:text-primary"
            aria-label="Wishlist"
          >
            <Heart className="h-5 w-5" />
          </Link>
          <Link
            to="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-foreground/80 hover:bg-secondary hover:text-primary"
            aria-label="Cart"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-coral px-1 text-[10px] font-bold text-coral-foreground">
              3
            </span>
          </Link>
          <Link
            to="/admin-panel"
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground/80 hover:bg-secondary hover:text-primary"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
