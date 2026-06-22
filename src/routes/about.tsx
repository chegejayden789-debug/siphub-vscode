import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — SipHub" },
      { name: "description", content: "SipHub is Kenya's premier curated marketplace for fine spirits, wines, and champagnes." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="bg-white text-onyx">
      <Header />
      <header className="bg-onyx text-white py-24 px-6 md:px-12">
        <div className="max-w-[1000px] mx-auto">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">Our Story</span>
          <h1 className="font-serif text-5xl md:text-7xl mt-4 leading-[1.05]">
            A modern cellar,<br /><span className="italic text-gold">delivered.</span>
          </h1>
        </div>
      </header>
      <section className="max-w-[800px] mx-auto px-6 md:px-12 py-20 space-y-8 text-lg leading-relaxed text-onyx/80">
        <p>SipHub was born in Nairobi in 2024 with a simple obsession: bring the world's finest spirits to Kenyan homes with the speed, polish, and discretion they deserve.</p>
        <p>We work directly with licensed importers and boutique distilleries to curate a tight, considered cellar — no aisles of forgettable bottles, just the ones worth pouring.</p>
        <p>Every order is hand-checked, age-verified at the door, and tracked from rider to recipient. Whether it's a Tuesday nightcap or a wedding for 300, we treat the order the same way.</p>
        <p className="font-serif text-2xl italic text-onyx pt-8">"Drink less. Drink better."</p>
      </section>
      <section className="bg-stone-50 py-20 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-10 text-center">
          {[
            { n: "12K+", l: "Bottles delivered" },
            { n: "45 min", l: "Average Nairobi delivery" },
            { n: "4.9★", l: "Customer satisfaction" },
          ].map((s) => (
            <div key={s.l}>
              <p className="font-serif text-6xl text-gold">{s.n}</p>
              <p className="text-[10px] uppercase tracking-widest text-onyx/60 mt-2">{s.l}</p>
            </div>
          ))}
        </div>
      </section>
      <div className="text-center py-16">
        <Link to="/shop" className="inline-block bg-onyx text-white px-12 py-5 text-xs uppercase tracking-widest font-bold hover:bg-gold hover:text-onyx">
          Browse the Cellar
        </Link>
      </div>
      <Footer />
    </div>
  );
}
