import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Timer } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { categories, recommendations, trendingDeals } from "@/lib/mock-data";
import heroBanner from "@/assets/hero-banner.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AisleMind — Intelligent commerce, beautifully curated" },
      { name: "description", content: "AI-powered shopping with personalised recommendations across electronics, lifestyle, home, books, fitness and grocery." },
      { property: "og:title", content: "AisleMind — Intelligent commerce" },
      { property: "og:description", content: "Personalised recommendations across vetted vendors and timeless products." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      <Hero />
      <AnnouncementBar />
      <Recommended />
      <CategoriesGrid />
      <TrendingDeals />
      <ValueProps />
    </SiteLayout>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary">
      <img
        src={heroBanner}
        alt=""
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
      <div className="relative mx-auto grid min-h-[640px] max-w-7xl items-center px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="max-w-xl text-primary-foreground">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber/40 bg-primary-soft/40 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-amber backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> AI personalised
          </span>
          <h1 className="mt-6 font-serif text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
            Shopping, <span className="text-amber">refined</span> by intelligence.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-primary-foreground/80">
            A curated marketplace that learns your taste — across electronics, lifestyle, home,
            and the everyday essentials worth keeping.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/products"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-amber px-10 text-base font-semibold text-amber-foreground shadow-amber transition hover:brightness-105"
            >
              Shop Now <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/recommended-for-you"
              className="inline-flex h-14 items-center justify-center rounded-xl border border-primary-foreground/30 px-8 text-base font-medium text-primary-foreground transition hover:bg-primary-foreground/10"
            >
              For you
            </Link>
          </div>
          <div className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-primary-foreground/15 pt-6">
            {[
              { v: "10K+", l: "Products" },
              { v: "1.2K", l: "Vendors" },
              { v: "4.8★", l: "Avg rating" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-serif text-2xl text-amber">{s.v}</p>
                <p className="text-xs uppercase tracking-wider text-primary-foreground/60">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AnnouncementBar() {
  const items = ["Free shipping over ₹999", "30-day easy returns", "Verified vendors only", "Secure checkout", "Earn AisleRewards"];
  return (
    <div className="overflow-hidden border-y border-border bg-secondary/50 py-3">
      <div className="flex animate-marquee gap-12 whitespace-nowrap text-sm text-foreground/70">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="font-medium">{t}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Recommended() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">For You</span>
          <h2 className="mt-2 font-serif text-4xl text-foreground sm:text-5xl">Personalised picks</h2>
          <p className="mt-2 max-w-md text-muted-foreground">Hand-tuned by our AI from your taste, history, and what's trending in your circle.</p>
        </div>
        <Link to="/recommended-for-you" className="hidden text-sm font-medium text-primary hover:text-accent sm:inline-flex sm:items-center sm:gap-1">
          See all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recommendations.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}

function CategoriesGrid() {
  return (
    <section className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">Browse</span>
          <h2 className="mt-2 font-serif text-4xl sm:text-5xl">Explore the aisles</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.name}
              to="/products"
              search={{ category: c.name }}
              className="group relative h-64 overflow-hidden rounded-2xl shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
            >
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                width={800}
                height={800}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                <h3 className="font-serif text-2xl text-primary-foreground">{c.name}</h3>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber text-amber-foreground transition-transform group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrendingDeals() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-coral">
            <Timer className="h-3.5 w-3.5" /> Limited time
          </span>
          <h2 className="mt-2 font-serif text-4xl sm:text-5xl">Trending deals</h2>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-3 shadow-soft">
          <Timer className="h-5 w-5 text-coral" />
          <div className="flex items-baseline gap-2 font-serif text-xl font-semibold tabular-nums text-primary">
            <span>14</span><span className="text-muted-foreground">:</span>
            <span>32</span><span className="text-muted-foreground">:</span>
            <span>09</span>
          </div>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {trendingDeals.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}

function ValueProps() {
  const items = [
    { title: "AI Personalisation", body: "Recommendations that learn your taste — never noisy, always relevant." },
    { title: "Vetted Vendors", body: "Every seller approved by our team. Quality and authenticity guaranteed." },
    { title: "Effortless Returns", body: "30-day, no-questions-asked returns. Refunds in 48 hours." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-6 rounded-3xl bg-gradient-royal p-8 text-primary-foreground sm:p-12 lg:grid-cols-3">
        {items.map((i) => (
          <div key={i.title}>
            <h3 className="font-serif text-2xl text-amber">{i.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-primary-foreground/75">{i.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
