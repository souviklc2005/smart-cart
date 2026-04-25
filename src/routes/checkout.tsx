import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, CreditCard, Smartphone, Truck } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { formatPrice, products } from "@/lib/mock-data";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — AisleMind" },
      { name: "description", content: "Securely complete your purchase." },
    ],
  }),
  component: CheckoutPage,
});

const steps = ["Shipping", "Payment", "Review"] as const;

function CheckoutPage() {
  const [step, setStep] = useState(0);
  const [pay, setPay] = useState<"card" | "upi" | "cod">("card");

  const items = [products[0], products[2], products[4]];
  const subtotal = items.reduce((s, p) => s + p.price, 0);
  const total = subtotal + Math.round(subtotal * 0.05);

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl text-foreground sm:text-5xl">Checkout</h1>

        <div className="mt-10 flex items-center gap-2 sm:gap-4">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 items-center gap-3">
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition ${
                i < step ? "bg-success text-success-foreground" : i === step ? "bg-primary text-primary-foreground" : "border border-border bg-card text-muted-foreground"
              }`}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={`text-sm font-medium ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
              {i < steps.length - 1 && <div className={`h-px flex-1 ${i < step ? "bg-success" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="rounded-2xl bg-card p-8 shadow-soft">
            {step === 0 && (
              <div className="space-y-5">
                <h2 className="font-serif text-2xl">Shipping details</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" placeholder="Anika Mehra" />
                  <Field label="Phone" placeholder="+91 98XXXXXX12" />
                  <Field label="Address line 1" placeholder="221B Hawthorne Lane" full />
                  <Field label="City" placeholder="Mumbai" />
                  <Field label="State" placeholder="Maharashtra" />
                  <Field label="Pincode" placeholder="400001" />
                  <Field label="Country" placeholder="India" />
                </div>
              </div>
            )}
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="font-serif text-2xl">Payment method</h2>
                <div className="grid gap-3 sm:grid-cols-3">
                  <PayOption icon={CreditCard} label="Card" hint="Visa, MC, Amex" active={pay === "card"} onClick={() => setPay("card")} />
                  <PayOption icon={Smartphone} label="UPI" hint="GPay, PhonePe…" active={pay === "upi"} onClick={() => setPay("upi")} />
                  <PayOption icon={Truck} label="Cash on Delivery" hint="Pay at door" active={pay === "cod"} onClick={() => setPay("cod")} />
                </div>
                {pay === "card" && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Card number" placeholder="•••• •••• •••• 4242" full />
                    <Field label="Expiry" placeholder="MM/YY" />
                    <Field label="CVC" placeholder="•••" />
                  </div>
                )}
                {pay === "upi" && <Field label="UPI ID" placeholder="anika@upi" full />}
                {pay === "cod" && (
                  <div className="rounded-xl bg-secondary/60 p-5 text-sm text-foreground">
                    Pay <span className="font-semibold text-primary">{formatPrice(total)}</span> in cash when your parcel arrives. A small handling fee may apply.
                  </div>
                )}
              </div>
            )}
            {step === 2 && (
              <div className="space-y-5">
                <h2 className="font-serif text-2xl">Review your order</h2>
                <ul className="divide-y divide-border">
                  {items.map((p) => (
                    <li key={p.id} className="flex items-center gap-4 py-3">
                      <img src={p.image} alt={p.name} className="h-14 w-14 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="font-serif text-base">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.brand}</p>
                      </div>
                      <span className="font-semibold text-primary">{formatPrice(p.price)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 flex justify-between">
              <button
                disabled={step === 0}
                onClick={() => setStep(step - 1)}
                className="rounded-lg border border-border bg-background px-6 py-2.5 text-sm font-medium text-foreground transition hover:bg-secondary disabled:opacity-40"
              >
                Back
              </button>
              {step < 2 ? (
                <button onClick={() => setStep(step + 1)} className="rounded-lg bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-soft">Continue</button>
              ) : (
                <Link to="/orders" className="rounded-lg bg-amber px-8 py-2.5 text-sm font-semibold text-amber-foreground shadow-amber hover:brightness-105">Place order</Link>
              )}
            </div>
          </div>

          <aside className="h-fit rounded-2xl bg-card p-6 shadow-soft">
            <h3 className="font-serif text-xl">Summary</h3>
            <ul className="mt-4 space-y-2 text-sm text-foreground">
              <li className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></li>
              <li className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>Free</span></li>
              <li className="flex justify-between"><span className="text-muted-foreground">Tax</span><span>{formatPrice(Math.round(subtotal * 0.05))}</span></li>
            </ul>
            <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
              <span className="text-sm uppercase tracking-wider text-muted-foreground">Total</span>
              <span className="font-serif text-3xl font-bold text-primary">{formatPrice(total)}</span>
            </div>
          </aside>
        </div>
      </div>
    </SiteLayout>
  );
}

function Field({ label, placeholder, full }: { label: string; placeholder: string; full?: boolean }) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      <input
        type="text"
        placeholder={placeholder}
        className="h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm text-foreground outline-none transition focus:border-accent"
      />
    </label>
  );
}

function PayOption({ icon: Icon, label, hint, active, onClick }: { icon: typeof CreditCard; label: string; hint: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-start gap-2 rounded-xl border-2 p-4 text-left transition ${
        active ? "border-primary bg-primary/5" : "border-border bg-background hover:border-accent"
      }`}
    >
      <Icon className={`h-5 w-5 ${active ? "text-primary" : "text-muted-foreground"}`} />
      <div>
        <p className="font-serif text-base font-semibold">{label}</p>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </div>
    </button>
  );
}
