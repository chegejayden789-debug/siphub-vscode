import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { formatKsh, getProduct, products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — SipHub` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — SipHub` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-serif text-3xl mb-4">Bottle not found</h1>
        <Link to="/shop" className="text-xs uppercase tracking-widest border-b border-onyx">Back to shop</Link>
      </div>
    </div>
  ),
  component: ProductPage,
});

const reviews = [
  { name: "Brian K.", rating: 5, text: "Smooth, complex, and arrived in perfect condition. Will reorder." },
  { name: "Lillian W.", rating: 5, text: "Gift for my husband — packaging was elegant, he loved it." },
  { name: "Tom M.", rating: 4, text: "Excellent value at this price point. Delivery was prompt." },
];

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-white text-onyx">
      <Header />
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12">
        <nav className="text-[10px] uppercase tracking-widest text-onyx/40 mb-8">
          <Link to="/" className="hover:text-gold">Home</Link> / <Link to="/shop" className="hover:text-gold">Shop</Link> / <span className="text-onyx">{product.category}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="bg-stone-50 aspect-[4/5]">
            <img src={product.image} alt={product.name} width={800} height={1000} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-3">{product.subtitle}</p>
            <h1 className="font-serif text-5xl md:text-6xl leading-tight">{product.name}</h1>
            <div className="flex items-center gap-4 mt-4 text-xs uppercase tracking-widest text-onyx/60">
              <span>★ {product.rating} ({product.reviewCount})</span>
              <span>·</span>
              <span>{product.country}</span>
              <span>·</span>
              <span>{product.abv}% ABV</span>
            </div>

            <p className="text-3xl font-bold mt-8">{formatKsh(product.price)}</p>
            <p className="text-xs text-onyx/50 mt-1">Or 3× KSh {Math.round(product.price / 3).toLocaleString()} with Lipa Later</p>

            <p className="mt-8 text-lg leading-relaxed text-onyx/80">{product.description}</p>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex items-center border border-onyx/15">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-3 hover:bg-onyx hover:text-white">−</button>
                <span className="px-6 font-bold">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="px-4 py-3 hover:bg-onyx hover:text-white">+</button>
              </div>
              <button
                onClick={() => { add(product, qty); toast.success(`${qty} × ${product.name} added`); }}
                className="flex-1 bg-onyx text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-gold hover:text-onyx transition-colors"
              >
                Add to Cart
              </button>
            </div>

            <div className="mt-12 pt-8 border-t border-onyx/10 grid grid-cols-2 gap-6 text-xs">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2">Express Delivery</p>
                <p className="text-onyx/70">Under 45 min across Nairobi · KSh 250</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2">Scheduled</p>
                <p className="text-onyx/70">Pick a time slot up to 14 days ahead</p>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-4">Food Pairings</h3>
              <div className="flex flex-wrap gap-2">
                {product.pairings.map((p: string) => (
                  <span key={p} className="px-4 py-2 border border-onyx/15 text-xs">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <section className="mt-24 max-w-3xl">
          <h2 className="font-serif text-3xl mb-8">Customer Reviews</h2>
          <div className="space-y-6">
            {reviews.map((r, i) => (
              <div key={i} className="border-b border-onyx/10 pb-6">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold text-sm">{r.name}</p>
                  <p className="text-gold text-sm">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</p>
                </div>
                <p className="text-onyx/70">{r.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="font-serif text-3xl mb-8">More from {product.category}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {related.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
}
