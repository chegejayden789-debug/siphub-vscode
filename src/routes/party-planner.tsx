import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { products, formatKsh } from "@/lib/products";
import { useMemo, useState } from "react";

type Search = { guests?: number };

export const Route = createFileRoute("/party-planner")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    guests: typeof s.guests === "number" ? s.guests : undefined,
  }),
  head: () => ({
    meta: [
      { title: "AI Party Planner — SipHub" },
      { name: "description", content: "Tell us your guest count and we'll calculate exact bottles, mixers, ice, and cups — built for Kenyan parties." },
    ],
  }),
  component: PartyPlanner,
});

function PartyPlanner() {
  const search = Route.useSearch();
  const [guests, setGuests] = useState(search.guests?.toString() ?? "20");
  const [event, setEvent] = useState("House Party");
  const [budget, setBudget] = useState("medium");
  const [vibe, setVibe] = useState("Mixed Drinks");

  const plan = useMemo(() => {
    const g = Math.max(1, Number(guests) || 0);
    const bottles = Math.ceil(g * 0.6);
    const beers = Math.ceil(g * 3);
    const mixers = Math.ceil(g * 1.5);
    const ice = Math.ceil(g / 8);
    const cups = Math.ceil(g * 4);
    const tier = budget === "low" ? products.filter((p) => p.price < 7000) :
                 budget === "high" ? products.filter((p) => p.price > 10000) :
                 products.filter((p) => p.price >= 4000 && p.price <= 15000);
    const picks = tier.slice(0, 3);
    const est = picks.reduce((s, p) => s + p.price * Math.ceil(bottles / picks.length), 0) + beers * 350 + mixers * 200 + ice * 500;
    return { bottles, beers, mixers, ice, cups, picks, est };
  }, [guests, budget]);

  return (
    <div className="bg-white text-onyx min-h-screen">
      <Header />
      <header className="bg-onyx text-white py-20 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">SipHub Intelligence</span>
          <h1 className="font-serif text-5xl md:text-7xl mt-4">The Party<br /><span className="italic text-gold">Planner</span></h1>
          <p className="mt-6 max-w-lg text-white/60 text-lg">
            Built for Kenyan hosts. Tell us your event and we'll size your order — exact bottles, beers, mixers, ice and cups.
          </p>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 grid lg:grid-cols-[400px_1fr] gap-12">
        <aside className="bg-stone-50 p-10 h-fit space-y-8">
          <Field label="Number of Guests">
            <input value={guests} onChange={(e) => setGuests(e.target.value)} type="number" min={1}
              className="w-full bg-transparent border-b border-onyx/20 py-3 outline-none focus:border-gold text-lg font-bold" />
          </Field>
          <Field label="Event Type">
            <select value={event} onChange={(e) => setEvent(e.target.value)}
              className="w-full bg-transparent border-b border-onyx/20 py-3 outline-none focus:border-gold">
              <option>House Party</option><option>Wedding After-party</option><option>Corporate Gala</option>
              <option>Birthday</option><option>Graduation</option>
            </select>
          </Field>
          <Field label="Budget Tier">
            <select value={budget} onChange={(e) => setBudget(e.target.value)}
              className="w-full bg-transparent border-b border-onyx/20 py-3 outline-none focus:border-gold">
              <option value="low">Comfortable</option><option value="medium">Premium</option><option value="high">Top Shelf</option>
            </select>
          </Field>
          <Field label="Vibe">
            <select value={vibe} onChange={(e) => setVibe(e.target.value)}
              className="w-full bg-transparent border-b border-onyx/20 py-3 outline-none focus:border-gold">
              <option>Mixed Drinks</option><option>Wine & Cheese</option><option>Beer & Grill</option><option>Champagne Reception</option>
            </select>
          </Field>
        </aside>

        <section>
          <h2 className="font-serif text-3xl mb-2">Your Plan for {guests || 0} Guests</h2>
          <p className="text-onyx/60 mb-10">A {vibe.toLowerCase()} {event.toLowerCase()}, sized to last the evening.</p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-12">
            {[
              { l: "Bottles", v: plan.bottles },
              { l: "Beers", v: plan.beers },
              { l: "Mixers", v: plan.mixers },
              { l: "Ice bags", v: plan.ice },
              { l: "Cups", v: plan.cups },
            ].map((s) => (
              <div key={s.l} className="border border-onyx/10 p-6">
                <p className="font-serif text-4xl">{s.v}</p>
                <p className="text-[10px] uppercase tracking-widest text-onyx/50 mt-1">{s.l}</p>
              </div>
            ))}
          </div>

          <h3 className="font-serif text-2xl mb-6">Recommended Bottles</h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {plan.picks.map((p) => (
              <Link to="/product/$id" params={{ id: p.id }} key={p.id} className="group">
                <div className="aspect-[4/5] bg-stone-50 overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={400} height={500} />
                </div>
                <p className="font-serif text-lg mt-3">{p.name}</p>
                <p className="text-sm font-bold">{formatKsh(p.price)}</p>
              </Link>
            ))}
          </div>

          <div className="mt-12 bg-onyx text-white p-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gold font-bold">Estimated Total</p>
              <p className="font-serif text-4xl mt-2">{formatKsh(plan.est)}</p>
            </div>
            <Link to="/shop" className="px-10 py-4 bg-gold text-onyx font-bold uppercase text-xs tracking-widest hover:bg-white">
              Build My Order
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-widest text-gold font-bold">{label}</span>
      {children}
    </label>
  );
}
