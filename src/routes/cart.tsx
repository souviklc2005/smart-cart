import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Tag, Trash2 } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { formatPrice, products } from "@/lib/mock-data";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart — AisleMind" },
      { name: "description", content: "Review the items in your cart and proceed to checkout." },
    ],
  }),
  component: CartPage,
});

type Item = { id: string; qty: number };

function CartPage() {
  const [items, setItems] = useState<Item[]>([
    { id: "p1", qty: 1 },
    { id: "p3", qty: 2 },
    { id: "p5", qty: 1 },
  ]);

  const lines = items
    .map((i) => ({ ...i, product: products.find((p) => p.id === i.id)! }))
    .filter((l) => l.product);
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const shipping = subtotal > 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  const update = (id: string, delta: number) =>
    setItems((cur) =>
      cur
        .map((i) => (i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i))
        .filter((i) => i.qty > 0),
    );

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl text-foreground sm:text-5xl">Your cart</h1>
        <p className="mt-2 text-muted-foreground">{lines.length} item{lines.length !== 1 && "s"} ready for checkout.</p>

        {lines.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-dashed border-border bg-card p-16 text-center">
            <p className="font-serif text-2xl">Your cart is empty</p>
            <Link to="/products" className="mt-4 inline-block text-primary underline-offset-4 hover:underline">Continue shopping</Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
            <div className="space-y-4">
              {lines.map((l) => (
                <div key={l.id} className="flex gap-5 rounded-2xl bg-card p-5 shadow-soft">
                  <Link to="/product/$id" params={{ id: l.product.id }} className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-secondary">
                    <img src={l.product.image} alt={l.product.name} className="h-full w-full object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{l.product.brand}</p>
                        <h3 className="font-serif text-lg leading-snug text-foreground">{l.product.name}</h3>
                      </div>
                      <button onClick={() => update(l.id, -l.qty)} className="text-muted-foreground hover:text-coral" aria-label="Remove">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-end justify-between pt-3">
                      <div className="flex h-10 items-center rounded-lg border border-border">
                        <button onClick={() => update(l.id, -1)} className="flex h-full w-10 items-center justify-center text-foreground hover:text-primary"><Minus className="h-3.5 w-3.5" /></button>
                        <span className="w-8 text-center text-sm font-semibold tabular-nums">{l.qty}</span>
                        <button onClick={() => update(l.id, 1)} className="flex h-full w-10 items-center justify-center text-foreground hover:text-primary"><Plus className="h-3.5 w-3.5" /></button>
                      </div>
                      <p className="font-serif text-xl font-semibold text-primary">{formatPrice(l.product.price * l.qty)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="h-fit space-y-4 rounded-2xl bg-card p-6 shadow-soft">
              <h2 className="font-serif text-2xl text-foreground">Order summary</h2>
              <div className="space-y-2 text-sm">
                <Row label="Subtotal" value={formatPrice(subtotal)} />
                <Row label="Shipping" value={shipping === 0 ? "Free" : formatPrice(shipping)} />
                <Row label="Tax (5%)" value={formatPrice(tax)} />
              </div>
              <div className="border-t border-border pt-4">
                <div className="flex items-end justify-between">
                  <span className="text-sm uppercase tracking-wider text-muted-foreground">Total</span>
                  <span className="font-serif text-3xl font-bold text-primary">{formatPrice(total)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-dashed border-amber/50 bg-amber/10 p-3 text-xs text-foreground">
                <Tag className="h-4 w-4 text-amber" />
                Use code <span className="font-mono font-semibold text-primary">AISLE10</span> for 10% off.
              </div>
              <Link to="/checkout" className="flex h-12 w-full items-center justify-center rounded-xl bg-amber font-semibold text-amber-foreground shadow-amber transition hover:brightness-105">
                Checkout
              </Link>
            </aside>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-foreground">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
