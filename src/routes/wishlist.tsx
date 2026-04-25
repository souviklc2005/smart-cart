import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { Heart } from "lucide-react";
import { products } from "@/lib/mock-data";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — AisleMind" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const items = products.slice(1, 5);
  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Heart className="h-7 w-7 fill-coral text-coral" />
          <h1 className="font-serif text-4xl text-foreground sm:text-5xl">Wishlist</h1>
        </div>
        <p className="mt-2 text-muted-foreground">{items.length} saved items.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </SiteLayout>
  );
}
