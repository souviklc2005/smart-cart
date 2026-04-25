import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/mock-data";

export const Route = createFileRoute("/recommended-for-you")({
  head: () => ({
    meta: [
      { title: "Recommended for you — AisleMind" },
      { name: "description", content: "AI-curated products tailored to your taste, history, and similar shoppers." },
    ],
  }),
  component: RecommendedPage,
});

function RecommendedPage() {
  return (
    <SiteLayout>
      <section className="bg-gradient-royal py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber/40 px-3 py-1 text-xs font-medium uppercase tracking-widest text-amber">
            <Sparkles className="h-3.5 w-3.5" /> AI personalised
          </span>
          <h1 className="mt-4 font-serif text-5xl sm:text-6xl">Made for your taste</h1>
          <p className="mt-3 max-w-xl text-lg text-primary-foreground/80">
            From your recently viewed, your purchase history, and what shoppers like you are loving today.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...products, ...products].map((p, i) => <ProductCard key={`${p.id}-${i}`} product={p} />)}
        </div>
      </div>
    </SiteLayout>
  );
}
