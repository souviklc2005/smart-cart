import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { Tag } from "lucide-react";
import { trendingDeals, products } from "@/lib/mock-data";

export const Route = createFileRoute("/offers")({
  head: () => ({ meta: [{ title: "Offers & deals — AisleMind" }] }),
  component: OffersPage,
});

const codes = [
  { code: "AISLE10", desc: "10% off your first order", min: "Min ₹1,000" },
  { code: "WEEKEND25", desc: "25% off lifestyle category", min: "Min ₹2,500" },
  { code: "FREESHIP", desc: "Free express shipping", min: "Min ₹999" },
];

function OffersPage() {
  return (
    <SiteLayout>
      <section className="bg-coral py-20 text-coral-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-5xl sm:text-6xl">Offers worth it</h1>
          <p className="mt-3 max-w-xl text-lg opacity-90">Hand-picked deals, refreshed daily.</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {codes.map((c) => (
            <div key={c.code} className="flex items-center gap-4 rounded-2xl border-2 border-dashed border-amber/50 bg-amber/5 p-5">
              <Tag className="h-8 w-8 text-amber" />
              <div>
                <p className="font-mono text-xl font-bold text-primary">{c.code}</p>
                <p className="text-sm text-foreground">{c.desc}</p>
                <p className="text-xs text-muted-foreground">{c.min}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mt-16 font-serif text-3xl text-foreground sm:text-4xl">Today's best deals</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...trendingDeals, ...products.slice(4, 8)].map((p, i) => <ProductCard key={`${p.id}-${i}`} product={p} />)}
        </div>
      </div>
    </SiteLayout>
  );
}
