import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, Minus, Plus, ShieldCheck, Star, Truck, Undo2 } from "lucide-react";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { findProduct, formatPrice, products } from "@/lib/mock-data";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = findProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — AisleMind` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: loaderData.product.name },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  component: ProductDetailPage,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <h1 className="font-serif text-4xl">Product not found</h1>
        <p className="mt-3 text-muted-foreground">The product you're looking for has wandered off.</p>
        <Link to="/products" className="mt-6 inline-block text-primary underline-offset-4 hover:underline">
          Back to products
        </Link>
      </div>
    </SiteLayout>
  ),
});

function ProductDetailPage() {
  const { product } = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <nav className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-primary">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-3xl bg-secondary shadow-card">
              <img src={product.image} alt={product.name} width={800} height={800} className="h-full w-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[product.image, product.image, product.image, product.image].map((src, i) => (
                <button key={i} className={`aspect-square overflow-hidden rounded-xl border-2 ${i === 0 ? "border-primary" : "border-transparent"} bg-secondary`}>
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">{product.brand}</p>
            <h1 className="mt-3 font-serif text-4xl leading-tight text-foreground sm:text-5xl">{product.name}</h1>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-full bg-amber/15 px-3 py-1 text-sm font-semibold text-foreground">
                <Star className="h-4 w-4 fill-amber text-amber" />
                {product.rating}
              </div>
              <span className="text-sm text-muted-foreground">{product.reviews.toLocaleString()} reviews</span>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-serif text-4xl font-bold text-primary">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">{formatPrice(product.oldPrice)}</span>
                  <span className="rounded-md bg-coral/15 px-2 py-0.5 text-sm font-bold text-coral">
                    Save {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            <p className="mt-6 text-base leading-relaxed text-muted-foreground">{product.description}</p>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-12 items-center rounded-xl border border-border bg-card">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="flex h-full w-12 items-center justify-center text-foreground hover:text-primary"><Minus className="h-4 w-4" /></button>
                <span className="w-10 text-center font-semibold tabular-nums">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="flex h-full w-12 items-center justify-center text-foreground hover:text-primary"><Plus className="h-4 w-4" /></button>
              </div>
              <p className="text-sm text-success">In stock — ships in 1–2 days</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button className="inline-flex h-14 flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-8 font-semibold text-accent-foreground shadow-teal transition hover:brightness-110 sm:flex-none sm:px-12">
                Add to cart
              </button>
              <Link to="/checkout" className="inline-flex h-14 flex-1 items-center justify-center rounded-xl bg-amber px-8 font-semibold text-amber-foreground shadow-amber transition hover:brightness-105 sm:flex-none sm:px-12">
                Buy now
              </Link>
              <button className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-border bg-card text-foreground hover:border-coral hover:text-coral" aria-label="Wishlist">
                <Heart className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3 border-t border-border pt-8">
              {[
                { icon: Truck, label: "Free shipping", note: "Over ₹999" },
                { icon: Undo2, label: "30-day returns", note: "No questions" },
                { icon: ShieldCheck, label: "Secure pay", note: "256-bit SSL" },
              ].map((f) => (
                <div key={f.label} className="text-center">
                  <f.icon className="mx-auto h-5 w-5 text-accent" />
                  <p className="mt-2 text-xs font-semibold text-foreground">{f.label}</p>
                  <p className="text-[11px] text-muted-foreground">{f.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="font-serif text-3xl text-foreground sm:text-4xl">You may also like</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </SiteLayout>
  );
}
