import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <span className="font-serif text-3xl font-bold">
            Aisle<span className="text-amber">Mind</span>
          </span>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
            Intelligent commerce, beautifully curated. Personalised recommendations powered by AI,
            from a marketplace of vetted vendors and timeless products.
          </p>
        </div>

        <FooterCol title="Company" links={[
          { to: "/about", label: "About" },
          { to: "/careers", label: "Careers" },
          { to: "/press", label: "Press" },
        ]} />
        <FooterCol title="Support" links={[
          { to: "/help", label: "Help Centre" },
          { to: "/orders", label: "Track Order" },
          { to: "/contact", label: "Contact" },
        ]} />
        <FooterCol title="For Vendors" links={[
          { to: "/vendor-signup", label: "Sell on AisleMind" },
          { to: "/vendor-dashboard", label: "Vendor Dashboard" },
          { to: "/policies", label: "Policies" },
        ]} />
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-primary-foreground/60 sm:flex-row sm:px-6 lg:px-8">
          <span>© {new Date().getFullYear()} AisleMind. All rights reserved.</span>
          <div className="flex gap-5">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h4 className="mb-4 font-serif text-base">{title}</h4>
      <ul className="space-y-2 text-sm text-primary-foreground/70">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="hover:text-amber">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
