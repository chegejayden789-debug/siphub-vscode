import { createFileRoute, Link } from "@tanstack/react-router";
import heroPour from "@/assets/hero-pour.jpg";
import lineup from "@/assets/lineup.jpg";
import tracking from "@/assets/tracking.jpg";
import { categories, products } from "@/lib/products";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SipHub — Premium Spirits Delivered in Nairobi" },
      { name: "description", content: "Whiskies, wines, gin, champagne and more. Same-day delivery across Nairobi. Pay with M-Pesa, Airtel Money or card." },
      { property: "og:title", content: "SipHub — Premium Spirits Delivered in Nairobi" },
      { property: "og:description", content: "Kenya's curated luxury liquor marketplace." },
    ],
  }),
  component: Index,
});

const testimonials = [
  { quote: "Ordered at 7pm, bottle of Highland Reserve at my door before guests arrived. Faultless.", name: "Wanjiku M.", role: "Kilimani" },
  { quote: "The Party Planner sized our wedding perfectly — no leftover crates, no run-outs. Genius.", name: "James O.", role: "Karen" },
  { quote: "Finally a spirits site that doesn't look like a supermarket flyer. Beautiful experience.", name: "Aisha K.", role: "Westlands" },
];

function Index() {
  const featured = products.slice(0, 4);
  const newArrivals = products.slice(4, 8);
  const [guests, setGuests] = useState("");

  return (
    <div className="bg-white text-onyx">
      <Header />

      {/* Hero */}
      <header className="relative h-[88vh] min-h-[600px] flex items-center overflow-hidden bg-onyx">
        <div className="absolute inset-0">
          <img src={heroPour} alt="Premium whisky pour" width={1920} height={1080} className="w-full h-full object-cover opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-r from-onyx via-onyx/60 to-transparent" />
        </div>
        <div className="relative z-10 px-6 md:px-12 max-w-4xl animate-fade-up">
          <span className="inline-block text-gold text-xs font-bold uppercase tracking-[0.3em] mb-4">
            Premium Collection · 2026
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05] mb-8">
            The Art of <br /><span className="italic text-gold">Fine Spirits</span>
          </h1>
          <p className="text-white/70 max-w-md mb-10 text-lg">
            Kenya's curated liquor marketplace. Delivered to your door across Nairobi in under 45 minutes.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/shop" className="px-10 py-5 bg-gold text-onyx font-bold uppercase text-xs tracking-widest hover:bg-white transition-colors">
              Shop Now
            </Link>
            <Link to="/recommender" className="px-10 py-5 border border-white/30 text-white font-bold uppercase text-xs tracking-widest hover:bg-white/10 transition-colors">
              AI Sommelier
            </Link>
          </div>
        </div>
      </header>

      {/* Categories */}
      <section className="py-24 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold">Browse</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-2">By Category</h2>
          </div>
          <Link to="/shop" className="text-xs font-bold uppercase border-b border-onyx pb-1 hidden sm:inline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((c) => (
            <Link
              key={c.name}
              to="/shop"
              search={{ category: c.name }}
              className="group relative aspect-[3/4] overflow-hidden bg-stone-100"
            >
              <img src={c.image} alt={c.name} loading="lazy" width={640} height={800} className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx/80 via-onyx/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-serif text-2xl text-white">{c.name}</h3>
                <p className="text-[10px] uppercase tracking-widest text-gold mt-1">{c.count} bottles</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Party Planner feature */}
      <section className="py-24 px-6 md:px-12 bg-onyx text-white">
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">
              The Smart Host<br />
              <span className="text-gold italic underline decoration-1 underline-offset-8">Party Calculator</span>
            </h2>
            <p className="text-white/60 mb-10 max-w-md text-lg">
              Planning a celebration? Tell our AI your guest count and the vibe — we calculate the exact bottles, mixers, ice bags and cups required.
            </p>
            <div className="space-y-6 bg-white/5 p-8 border border-white/10">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase text-gold font-bold tracking-widest">Guests</label>
                  <input
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    placeholder="e.g. 15"
                    className="w-full bg-transparent border-b border-white/20 py-2 focus:border-gold outline-none text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase text-gold font-bold tracking-widest">Event Type</label>
                  <select className="w-full bg-transparent border-b border-white/20 py-2 focus:border-gold outline-none text-white appearance-none">
                    <option className="text-onyx">House Party</option>
                    <option className="text-onyx">Corporate Gala</option>
                    <option className="text-onyx">Wedding After-party</option>
                    <option className="text-onyx">Birthday</option>
                  </select>
                </div>
              </div>
              <Link
                to="/party-planner"
                search={{ guests: Number(guests) || undefined }}
                onClick={() => !guests && toast.info("Tip: try entering your guest count")}
                className="block text-center w-full py-4 bg-white text-onyx font-bold uppercase text-[10px] tracking-widest hover:bg-gold transition-colors"
              >
                Calculate My Order
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={lineup} alt="Luxury spirits lineup" loading="lazy" width={640} height={800} className="aspect-[3/4] object-cover" />
            <div className="flex flex-col gap-4 mt-12">
              <img src={tracking} alt="Live delivery tracking on phone" loading="lazy" width={640} height={800} className="aspect-[3/4] object-cover" />
              <div className="bg-gold p-6 text-onyx">
                <p className="text-xs font-bold uppercase mb-2 tracking-widest">Express Track</p>
                <p className="text-xl font-serif leading-tight italic">Delivery in under 45 minutes across Nairobi.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top shelf / best sellers */}
      <section className="py-24 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold">Curated Selection</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-2">Top Shelf Arrivals</h2>
          </div>
          <Link to="/shop" className="text-xs font-bold uppercase border-b border-onyx pb-1 hidden sm:inline">
            View All Spirits
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featured.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* Deals strip */}
      <section className="bg-gold text-onyx py-12 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-2">Flash Weekend Deals</p>
            <h3 className="font-serif text-3xl md:text-4xl italic">Up to 25% off Champagnes & Sparkling.</h3>
          </div>
          <Link to="/shop" search={{ category: "Champagne" }} className="px-10 py-5 bg-onyx text-white font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-onyx transition-colors whitespace-nowrap">
            Shop the Deals
          </Link>
        </div>
      </section>

      {/* New arrivals */}
      <section className="py-24 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold">Just In</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-2">New Arrivals</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {newArrivals.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-stone-50 py-24 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl text-center mb-16 italic">
            Notes from <span className="text-gold">our guests</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <figure key={i} className="bg-white p-10 border border-onyx/5">
                <blockquote className="font-serif text-xl leading-relaxed italic">"{t.quote}"</blockquote>
                <figcaption className="mt-8 pt-6 border-t border-onyx/10">
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-[10px] uppercase tracking-widest text-onyx/40 mt-1">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-onyx text-white py-8 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto flex flex-wrap justify-center md:justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-white/60">
          <span><span className="text-gold mr-2">01</span>18+ Licensed Vendor</span>
          <span><span className="text-gold mr-2">02</span>M-Pesa & Card Secure</span>
          <span><span className="text-gold mr-2">03</span>Tracked Nairobi Logistics</span>
          <span><span className="text-gold mr-2">04</span>Loyalty Rewards</span>
        </div>
      </section>

      <Footer />
    </div>
  );
}
