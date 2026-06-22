import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const posts = [
  { slug: "japanese-whisky-rise", title: "The quiet rise of Japanese whisky in Nairobi", excerpt: "How a once-niche import became Kenya's most-requested pour.", category: "Whisky", read: "5 min" },
  { slug: "summer-cocktails", title: "Five cocktails for a Nairobi heatwave", excerpt: "Built from bottles you already have on the shelf.", category: "Cocktails", read: "4 min" },
  { slug: "wine-pairing-nyama-choma", title: "The wine-pairing guide for nyama choma", excerpt: "Yes, you can pair Bordeaux with goat ribs.", category: "Wine", read: "6 min" },
  { slug: "gift-giving-spirits", title: "Spirits as gifts: a primer for beginners", excerpt: "How to choose a bottle that says something.", category: "Culture", read: "3 min" },
];

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Journal — SipHub" },
      { name: "description", content: "Essays on whisky, wine, cocktails and the culture of drinking well." },
    ],
  }),
  component: Blog,
});

function Blog() {
  return (
    <div className="bg-white text-onyx">
      <Header />
      <header className="bg-onyx text-white py-20 px-6 md:px-12">
        <div className="max-w-[1000px] mx-auto">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">Editorial</span>
          <h1 className="font-serif text-5xl md:text-7xl mt-4">The Journal</h1>
          <p className="mt-6 max-w-lg text-white/60 text-lg">Essays on whisky, wine, cocktails and the culture of drinking well.</p>
        </div>
      </header>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-20 grid md:grid-cols-2 gap-12">
        {posts.map((p) => (
          <article key={p.slug} className="group">
            <Link to="/blog" className="block">
              <div className="aspect-[16/10] bg-stone-100 mb-6 overflow-hidden flex items-center justify-center">
                <span className="font-serif text-7xl italic text-onyx/10">{p.category[0]}</span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-gold font-bold">{p.category} · {p.read}</p>
              <h2 className="font-serif text-3xl mt-3 group-hover:text-gold transition-colors">{p.title}</h2>
              <p className="mt-3 text-onyx/70">{p.excerpt}</p>
            </Link>
          </article>
        ))}
      </div>
      <Footer />
    </div>
  );
}
