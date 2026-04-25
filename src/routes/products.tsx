import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal, Star } from "lucide-react";
import { z } from "zod";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { categories, products, type Category } from "@/lib/mock-data";

const searchSchema = z.object({
  category: z.string().optional(),
});

export const Route = createFileRoute("/products")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Shop all products — AisleMind" },
      { name: "description", content: "Browse our entire curated catalogue across electronics, lifestyle, home, books, fitness and grocery." },
    ],
  }),
  component: ProductsPage,
});

const sortOptions = ["Recommended", "Price: Low to High", "Price: High to Low", "Top Rated"] as const;
type Sort = (typeof sortOptions)[number];

function ProductsPage() {
  const { category } = Route.useSearch();
  const initial = (categories.find((c) => c.name === category)?.name ?? null) as Category | null;
  const [activeCat, setActiveCat] = useState<Category | null>(initial);
  const [sort, setSort] = useState<Sort>("Recommended");
  const [maxPrice, setMaxPrice] = useState(20000);
  const [minRating, setMinRating] = useState(0);

  const filtered = useMemo(() => {
    let list = products.filter((p) =>
      (!activeCat || p.category === activeCat) &&
      p.price <= maxPrice &&
      p.rating >= minRating,
    );
    if (sort === "Price: Low to High") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "Top Rated") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [activeCat, sort, maxPrice, minRating]);

  return (
    <SiteLayout>
      <div className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl text-foreground sm:text-5xl">
            {activeCat ?? "All products"}
          </h1>
          <p className="mt-2 text-muted-foreground">{filtered.length} curated items waiting for you.</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
        <aside className="space-y-8">
          <FilterBlock title="Category">
            <div className="space-y-1.5">
              <FilterPill active={activeCat === null} onClick={() => setActiveCat(null)}>All</FilterPill>
              {categories.map((c) => (
                <FilterPill key={c.name} active={activeCat === c.name} onClick={() => setActiveCat(c.name)}>
                  {c.name}
                </FilterPill>
              ))}
            </div>
          </FilterBlock>

          <FilterBlock title="Max price">
            <input
              type="range"
              min={500}
              max={20000}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-accent"
            />
            <p className="mt-2 text-sm font-medium text-primary">Up to ₹{maxPrice.toLocaleString()}</p>
          </FilterBlock>

          <FilterBlock title="Minimum rating">
            <div className="flex gap-2">
              {[0, 3, 4, 4.5].map((r) => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={`flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                    minRating === r
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:border-accent"
                  }`}
                >
                  {r === 0 ? "Any" : <>{r}<Star className="h-3 w-3 fill-current" /></>}
                </button>
              ))}
            </div>
          </FilterBlock>
        </aside>

        <section>
          <div className="mb-6 flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 shadow-soft">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <SlidersHorizontal className="h-4 w-4" />
              Showing {filtered.length} items
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground outline-none focus:border-accent"
            >
              {sortOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card p-16 text-center">
              <p className="font-serif text-2xl text-foreground">Nothing matches</p>
              <p className="mt-2 text-sm text-muted-foreground">Try widening your filters.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </section>
      </div>
    </SiteLayout>
  );
}

function FilterBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 font-serif text-base text-foreground">{title}</h3>
      {children}
    </div>
  );
}

function FilterPill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`block w-full rounded-md px-3 py-2 text-left text-sm font-medium transition ${
        active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
      }`}
    >
      {children}
    </button>
  );
}
