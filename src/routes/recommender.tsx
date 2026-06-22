import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { products, formatKsh } from "@/lib/products";
import { useState } from "react";

export const Route = createFileRoute("/recommender")({
  head: () => ({
    meta: [
      { title: "AI Sommelier — SipHub" },
      { name: "description", content: "Tell us what you're eating, your mood and your budget — we'll suggest the perfect bottle." },
    ],
  }),
  component: Recommender,
});

function Recommender() {
  const [occasion, setOccasion] = useState("Quiet evening in");
  const [taste, setTaste] = useState("Smooth & smoky");
  const [budget, setBudget] = useState(10000);
  const [show, setShow] = useState(false);

  const matches = (() => {
    let r = products.filter((p) => p.price <= budget);
    if (taste.includes("smoky")) r = r.filter((p) => p.category === "Whisky" || p.category === "Tequila");
    if (taste.includes("Sweet")) r = r.filter((p) => p.category === "Wine" || p.category === "Champagne");
    if (taste.includes("Crisp")) r = r.filter((p) => p.category === "Gin" || p.category === "Champagne");
    return r.slice(0, 3);
  })();

  return (
    <div className="bg-white text-onyx min-h-screen">
      <Header />
      <header className="bg-onyx text-white py-20 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">SipHub Intelligence</span>
          <h1 className="font-serif text-5xl md:text-7xl mt-4">The AI<br /><span className="italic text-gold">Sommelier</span></h1>
          <p className="mt-6 max-w-lg text-white/60 text-lg">
            Three questions. One perfect bottle.
          </p>
        </div>
      </header>

      <div className="max-w-[900px] mx-auto px-6 md:px-12 py-16">
        <div className="space-y-10">
          <Q label="What's the occasion?">
            <Choices value={occasion} setValue={setOccasion} options={["Quiet evening in", "Dinner party", "Gift", "Celebration", "Cocktails"]} />
          </Q>
          <Q label="How do you like it?">
            <Choices value={taste} setValue={setTaste} options={["Smooth & smoky", "Sweet & easy", "Crisp & refreshing", "Bold & complex"]} />
          </Q>
          <Q label={`Budget: ${formatKsh(budget)}`}>
            <input type="range" min={2000} max={50000} step={500} value={budget}
              onChange={(e) => setBudget(Number(e.target.value))} className="w-full accent-onyx" />
          </Q>
          <button onClick={() => setShow(true)}
            className="bg-onyx text-white px-12 py-5 text-xs uppercase tracking-widest font-bold hover:bg-gold hover:text-onyx">
            Find My Bottle
          </button>
        </div>

        {show && (
          <section className="mt-20 animate-fade-up">
            <h2 className="font-serif text-3xl mb-2">Our picks for you</h2>
            <p className="text-onyx/60 mb-10">Hand-matched by taste, occasion and budget.</p>
            {matches.length === 0 ? (
              <p className="text-onyx/60">Try widening your budget — we'll find something special.</p>
            ) : (
              <div className="grid sm:grid-cols-3 gap-6">
                {matches.map((p) => (
                  <Link to="/product/$id" params={{ id: p.id }} key={p.id} className="group">
                    <div className="aspect-[4/5] bg-stone-50 overflow-hidden">
                      <img src={p.image} alt={p.name} loading="lazy" width={400} height={500} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <p className="font-serif text-xl mt-3">{p.name}</p>
                    <p className="text-[10px] uppercase tracking-widest text-onyx/50 mt-1">{p.subtitle}</p>
                    <p className="text-sm font-bold mt-2">{formatKsh(p.price)}</p>
                  </Link>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
}

function Q({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-gold font-bold mb-4">{label}</p>
      {children}
    </div>
  );
}

function Choices({ value, setValue, options }: { value: string; setValue: (v: string) => void; options: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button key={o} onClick={() => setValue(o)}
          className={`px-5 py-3 border text-sm transition-all ${value === o ? "border-onyx bg-onyx text-white" : "border-onyx/15 hover:border-onyx/40"}`}>
          {o}
        </button>
      ))}
    </div>
  );
}
