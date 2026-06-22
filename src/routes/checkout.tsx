import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cart";
import { formatKsh } from "@/lib/products";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — SipHub" }] }),
  component: Checkout,
});

function Checkout() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [pay, setPay] = useState<"mpesa" | "airtel" | "card" | "cod">("mpesa");
  const [delivery, setDelivery] = useState<"express" | "scheduled" | "midnight">("express");
  const [loading, setLoading] = useState(false);
  const deliveryFee = delivery === "express" ? 250 : delivery === "scheduled" ? 150 : 500;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      clear();
      toast.success("Order placed! Tracking link sent via SMS.");
      navigate({ to: "/account" });
    }, 1200);
  };

  return (
    <div className="bg-white text-onyx min-h-screen">
      <Header />
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16">
        <h1 className="font-serif text-5xl mb-12">Checkout</h1>
        <form onSubmit={submit} className="grid lg:grid-cols-[1fr_400px] gap-12">
          <div className="space-y-12">
            <section>
              <h2 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-6">Delivery Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full Name" required />
                <Field label="Phone (M-Pesa)" type="tel" placeholder="07XXXXXXXX" required />
                <Field label="Email" type="email" required />
                <Field label="City">
                  <select className="w-full border-b border-onyx/20 py-3 outline-none focus:border-gold bg-transparent">
                    <option>Nairobi</option><option>Mombasa</option><option>Kisumu</option><option>Nakuru</option>
                  </select>
                </Field>
                <div className="sm:col-span-2"><Field label="Delivery Address" required /></div>
                <div className="sm:col-span-2"><Field label="Delivery Note (optional)" /></div>
              </div>
            </section>

            <section>
              <h2 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-6">Delivery Option</h2>
              <div className="grid sm:grid-cols-3 gap-3">
                {(["express", "scheduled", "midnight"] as const).map((d) => (
                  <button type="button" key={d} onClick={() => setDelivery(d)}
                    className={`p-5 border text-left transition-all ${delivery === d ? "border-onyx bg-onyx text-white" : "border-onyx/15 hover:border-onyx/40"}`}>
                    <p className="text-[10px] uppercase tracking-widest font-bold">{d}</p>
                    <p className={`text-xs mt-1 ${delivery === d ? "text-white/60" : "text-onyx/50"}`}>
                      {d === "express" ? "Under 45 min" : d === "scheduled" ? "Pick a slot" : "11pm – 1am"}
                    </p>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-6">Payment Method</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { id: "mpesa", label: "M-Pesa STK Push" },
                  { id: "airtel", label: "Airtel Money" },
                  { id: "card", label: "Visa / Mastercard" },
                  { id: "cod", label: "Cash on Delivery" },
                ].map((p) => (
                  <button type="button" key={p.id} onClick={() => setPay(p.id as never)}
                    className={`p-5 border text-left transition-all ${pay === p.id ? "border-onyx bg-onyx text-white" : "border-onyx/15 hover:border-onyx/40"}`}>
                    <p className="text-sm font-bold">{p.label}</p>
                  </button>
                ))}
              </div>
            </section>
          </div>

          <aside className="bg-stone-50 p-10 h-fit sticky top-24">
            <h2 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-6">Order</h2>
            <div className="space-y-3 max-h-64 overflow-auto">
              {items.map((i) => (
                <div key={i.product.id} className="flex justify-between text-sm">
                  <span className="text-onyx/70">{i.qty} × {i.product.name}</span>
                  <span>{formatKsh(i.product.price * i.qty)}</span>
                </div>
              ))}
              {items.length === 0 && <p className="text-sm text-onyx/50">Your cart is empty.</p>}
            </div>
            <div className="border-t border-onyx/10 mt-6 pt-6 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-onyx/60">Subtotal</span><span>{formatKsh(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-onyx/60">Delivery</span><span>{formatKsh(deliveryFee)}</span></div>
            </div>
            <div className="border-t border-onyx/10 mt-6 pt-6 flex justify-between font-bold text-lg">
              <span>Total</span><span>{formatKsh(subtotal + deliveryFee)}</span>
            </div>
            <button type="submit" disabled={loading || items.length === 0}
              className="block text-center mt-8 w-full bg-onyx text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-gold hover:text-onyx disabled:opacity-40 disabled:cursor-not-allowed">
              {loading ? "Processing..." : `Pay ${formatKsh(subtotal + deliveryFee)}`}
            </button>
            <p className="mt-4 text-[10px] text-onyx/40 text-center uppercase tracking-widest">Secure · ID verified on delivery · 18+</p>
          </aside>
        </form>
      </div>
      <Footer />
    </div>
  );
}

function Field({ label, type = "text", placeholder, required, children }: {
  label: string; type?: string; placeholder?: string; required?: boolean; children?: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-widest text-onyx/60 font-bold">{label}{required && " *"}</span>
      {children ?? (
        <input type={type} required={required} placeholder={placeholder}
          className="mt-1 w-full border-b border-onyx/20 py-3 outline-none focus:border-gold bg-transparent" />
      )}
    </label>
  );
}
