import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Store } from "lucide-react";

export const Route = createFileRoute("/vendors")({
  head: () => ({ meta: [{ title: "Our vendors — AisleMind" }] }),
  component: VendorsPage,
});

const vendors = [
  { name: "SonicLab", cat: "Electronics", desc: "Studio-grade audio engineered for everyday listening.", products: 28 },
  { name: "Maison Coast", cat: "Lifestyle", desc: "Coastal-inspired linen, leather and wovens.", products: 42 },
  { name: "Atelier Verde", cat: "Home", desc: "Hand-thrown ceramics and small-batch homeware.", products: 19 },
  { name: "Penbrook Press", cat: "Books", desc: "Independent press for slow, considered reading.", products: 67 },
  { name: "Kindred Move", cat: "Fitness", desc: "Mindful movement gear for daily practice.", products: 23 },
  { name: "Olive Grove Co.", cat: "Grocery", desc: "Single-estate Mediterranean pantry staples.", products: 14 },
];

function VendorsPage() {
  return (
    <SiteLayout>
      <section className="bg-gradient-royal py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-5xl sm:text-6xl">Vetted vendors</h1>
          <p className="mt-3 max-w-xl text-lg text-primary-foreground/80">
            Every brand on AisleMind is reviewed by our team for quality, ethics and craft.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vendors.map((v) => (
            <article key={v.name} className="rounded-2xl bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-card">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-royal text-amber">
                <Store className="h-5 w-5" />
              </div>
              <h2 className="mt-4 font-serif text-2xl text-foreground">{v.name}</h2>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">{v.cat}</p>
              <p className="mt-3 text-sm text-muted-foreground">{v.desc}</p>
              <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-sm">
                <span className="text-muted-foreground">{v.products} products</span>
                <span className="font-medium text-primary">View store →</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
