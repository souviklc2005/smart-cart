import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Package } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { formatPrice, products } from "@/lib/mock-data";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "Your orders — AisleMind" },
      { name: "description", content: "Track your orders, download receipts, and manage returns." },
    ],
  }),
  component: OrdersPage,
});

const orders = [
  { id: "AM-10248", date: "Apr 22, 2026", status: "Delivered", items: [products[0], products[3]], total: 9798 },
  { id: "AM-10231", date: "Apr 18, 2026", status: "Shipped", items: [products[2]], total: 1899 },
  { id: "AM-10219", date: "Apr 14, 2026", status: "Processing", items: [products[1], products[4]], total: 5798 },
  { id: "AM-10204", date: "Apr 10, 2026", status: "Confirmed", items: [products[5]], total: 649 },
] as const;

const statusTone: Record<string, string> = {
  Placed: "bg-muted text-foreground",
  Confirmed: "bg-secondary text-primary",
  Processing: "bg-amber/15 text-amber-foreground border border-amber/40",
  Shipped: "bg-accent/15 text-accent border border-accent/40",
  Delivered: "bg-success/15 text-success border border-success/40",
  Cancelled: "bg-destructive/10 text-destructive border border-destructive/30",
};

function OrdersPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl text-foreground sm:text-5xl">Your orders</h1>
        <p className="mt-2 text-muted-foreground">Receipts, status updates, and returns — all in one place.</p>

        <div className="mt-10 space-y-5">
          {orders.map((o) => (
            <article key={o.id} className="rounded-2xl bg-card p-6 shadow-soft">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Order</p>
                  <p className="font-serif text-xl font-semibold text-primary">{o.id}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Placed on {o.date}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusTone[o.status]}`}>{o.status}</span>
              </div>

              <ul className="mt-4 space-y-3">
                {o.items.map((p) => (
                  <li key={p.id} className="flex items-center gap-4">
                    <img src={p.image} alt={p.name} className="h-14 w-14 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="font-serif text-base text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.brand}</p>
                    </div>
                    <span className="text-sm font-semibold text-primary">{formatPrice(p.price)}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Total</p>
                  <p className="font-serif text-xl font-bold text-primary">{formatPrice(o.total)}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2 text-xs font-medium text-foreground hover:bg-secondary">
                    <Package className="h-3.5 w-3.5" /> Track
                  </button>
                  <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2 text-xs font-medium text-foreground hover:bg-secondary">
                    <Download className="h-3.5 w-3.5" /> Receipt
                  </button>
                  {o.status !== "Delivered" && o.status !== "Shipped" && (
                    <button className="inline-flex items-center gap-1.5 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-2 text-xs font-medium text-destructive hover:bg-destructive/10">
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/products" className="text-sm text-primary underline-offset-4 hover:underline">Continue shopping</Link>
        </div>
      </div>
    </SiteLayout>
  );
}
