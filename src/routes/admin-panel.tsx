import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, IndianRupee, ShieldAlert, Store, Users, XCircle } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { formatPrice, products } from "@/lib/mock-data";

export const Route = createFileRoute("/admin-panel")({
  head: () => ({ meta: [{ title: "Admin panel — AisleMind" }] }),
  component: AdminPanel,
});

function AdminPanel() {
  const kpis = [
    { icon: IndianRupee, label: "Revenue (30d)", value: formatPrice(2_840_000), delta: "+12.4%", tone: "text-amber" },
    { icon: Users, label: "Active users", value: "12,486", delta: "+3.1%", tone: "text-accent" },
    { icon: Store, label: "Vendors", value: "1,204", delta: "+18 pending", tone: "text-primary" },
    { icon: ShieldAlert, label: "Open flags", value: "7", delta: "moderation", tone: "text-coral" },
  ];

  const pendingVendors = [
    { name: "Heron & Co.", category: "Lifestyle", date: "Apr 22" },
    { name: "Brewhaus Roasters", category: "Grocery", date: "Apr 21" },
    { name: "Lumen Audio", category: "Electronics", date: "Apr 20" },
  ];

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-amber">Admin</span>
          <h1 className="mt-1 font-serif text-4xl text-foreground sm:text-5xl">Operations panel</h1>
          <p className="mt-1 text-muted-foreground">Oversee vendors, moderate listings, and monitor platform health.</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-2xl bg-card p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{k.label}</p>
                <k.icon className={`h-5 w-5 ${k.tone}`} />
              </div>
              <p className="mt-3 font-serif text-3xl font-bold text-foreground">{k.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{k.delta}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <section className="lg:col-span-2 rounded-2xl bg-card shadow-soft">
            <header className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 className="font-serif text-xl">Pending vendor approvals</h2>
              <span className="rounded-full bg-amber/15 px-2.5 py-0.5 text-xs font-semibold text-amber-foreground">{pendingVendors.length}</span>
            </header>
            <ul className="divide-y divide-border">
              {pendingVendors.map((v) => (
                <li key={v.name} className="flex items-center justify-between gap-4 px-6 py-4">
                  <div>
                    <p className="font-serif text-base text-foreground">{v.name}</p>
                    <p className="text-xs text-muted-foreground">{v.category} · applied {v.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="inline-flex items-center gap-1.5 rounded-lg bg-success px-3 py-2 text-xs font-semibold text-success-foreground hover:brightness-110">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                    </button>
                    <button className="inline-flex items-center gap-1.5 rounded-lg border border-destructive/40 bg-destructive/5 px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10">
                      <XCircle className="h-3.5 w-3.5" /> Reject
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl bg-card p-6 shadow-soft">
            <h2 className="font-serif text-xl">Top products this week</h2>
            <ul className="mt-4 space-y-4">
              {products.slice(0, 4).map((p, i) => (
                <li key={p.id} className="flex items-center gap-3">
                  <span className="font-serif text-2xl font-bold text-amber tabular-nums">0{i + 1}</span>
                  <img src={p.image} alt={p.name} className="h-10 w-10 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-serif text-sm">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.brand}</p>
                  </div>
                  <span className="text-sm font-semibold text-primary">{formatPrice(p.price)}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </SiteLayout>
  );
}
