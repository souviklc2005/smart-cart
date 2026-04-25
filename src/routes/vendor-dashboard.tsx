import { createFileRoute } from "@tanstack/react-router";
import { Box, IndianRupee, Package, Plus, TrendingUp } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { formatPrice, products } from "@/lib/mock-data";

export const Route = createFileRoute("/vendor-dashboard")({
  head: () => ({ meta: [{ title: "Vendor dashboard — AisleMind" }] }),
  component: VendorDashboard,
});

function VendorDashboard() {
  const stats = [
    { icon: IndianRupee, label: "Sales (30d)", value: formatPrice(184320), tone: "text-primary" },
    { icon: Package, label: "Orders", value: "248", tone: "text-accent" },
    { icon: Box, label: "Active SKUs", value: "36", tone: "text-amber" },
    { icon: TrendingUp, label: "Conv. rate", value: "4.2%", tone: "text-coral" },
  ];

  const orders = [
    { id: "AM-10248", customer: "Anika M.", item: products[0].name, status: "Processing", total: 8999 },
    { id: "AM-10231", customer: "Rahul K.", item: products[2].name, status: "Shipped", total: 1899 },
    { id: "AM-10219", customer: "Priya S.", item: products[1].name, status: "Delivered", total: 2499 },
    { id: "AM-10204", customer: "Vikram R.", item: products[5].name, status: "Processing", total: 649 },
  ];

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Vendor</span>
            <h1 className="mt-1 font-serif text-4xl text-foreground sm:text-5xl">Dashboard</h1>
            <p className="mt-1 text-muted-foreground">Welcome back, Atelier Verde · Approved vendor</p>
          </div>
          <button className="inline-flex h-12 items-center gap-2 rounded-xl bg-amber px-6 font-semibold text-amber-foreground shadow-amber hover:brightness-105">
            <Plus className="h-4 w-4" /> Add product
          </button>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-card p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</p>
                <s.icon className={`h-5 w-5 ${s.tone}`} />
              </div>
              <p className="mt-3 font-serif text-3xl font-bold text-foreground">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <section className="lg:col-span-2 rounded-2xl bg-card shadow-soft">
            <header className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 className="font-serif text-xl">Recent orders</h2>
              <button className="text-xs font-medium text-primary hover:underline">View all</button>
            </header>
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-6 py-3">Order</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Item</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-secondary/40">
                    <td className="px-6 py-4 font-mono text-xs font-semibold text-primary">{o.id}</td>
                    <td className="px-6 py-4">{o.customer}</td>
                    <td className="px-6 py-4 text-muted-foreground">{o.item}</td>
                    <td className="px-6 py-4"><StatusPill s={o.status} /></td>
                    <td className="px-6 py-4 text-right font-semibold text-primary">{formatPrice(o.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="rounded-2xl bg-card p-6 shadow-soft">
            <h2 className="font-serif text-xl">Inventory</h2>
            <ul className="mt-4 space-y-4">
              {products.slice(0, 5).map((p) => {
                const stock = Math.round((p.id.charCodeAt(1) * 7) % 80) + 5;
                const low = stock < 20;
                return (
                  <li key={p.id} className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="h-12 w-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="truncate font-serif text-sm text-foreground">{p.name}</p>
                      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                        <div className={`h-full ${low ? "bg-coral" : "bg-success"}`} style={{ width: `${Math.min(100, stock)}%` }} />
                      </div>
                    </div>
                    <span className={`text-xs font-semibold ${low ? "text-coral" : "text-foreground"}`}>{stock}</span>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>
    </SiteLayout>
  );
}

function StatusPill({ s }: { s: string }) {
  const tone: Record<string, string> = {
    Processing: "bg-amber/15 text-amber-foreground border border-amber/40",
    Shipped: "bg-accent/15 text-accent border border-accent/40",
    Delivered: "bg-success/15 text-success border border-success/40",
    Cancelled: "bg-destructive/10 text-destructive border border-destructive/30",
  };
  return <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${tone[s]}`}>{s}</span>;
}
