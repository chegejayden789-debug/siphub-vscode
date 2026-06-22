import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { useMemo, useState } from "react";

type Search = {
  category?: string;
  q?: string;
  sort?: "popular" | "price-asc" | "price-desc";
  country?: string;
  maxPrice?: number;
};

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    category: typeof s.category === "string" ? s.category : undefined,
    q: typeof s.q === "string" ? s.q : undefined,
    sort: (s.sort as Search["sort"]) || "popular",
    country: typeof s.country === "string" ? s.country : undefined,
    maxPrice: typeof s.maxPrice === "number" ? s.maxPrice : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop All Spirits — SipHub" },
      { name: "description", content: "Browse premium whiskies, wines, gin, champagne and more. Filter by category, brand, country and price." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [maxPrice, setMaxPrice] = useState(search.maxPrice ?? 100000);

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  const countries = Array.from(new Set(products.map((p) => p.country)));

  const filtered = useMemo(() => {
    let r = products.slice();
    if (search.category && search.category !== "All") r = r.filter((p) => p.category === search.category);
    if (search.country) r = r.filter((p) => p.country === search.country);
    if (search.q) {
      const q = search.q.toLowerCase();
      r = r.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }
    r = r.filter((p) => p.price <= maxPrice);
    if (search.sort === "price-asc") r.sort((a, b) => a.price - b.price);
    else if (search.sort === "price-desc") r.sort((a, b) => b.price - a.price);
    else r.sort((a, b) => b.rating - a.rating);
    return r;
  }, [search, maxPrice]);

  const setSearch = (patch: Partial<Search>) =>
    navigate({ search: (prev: Search) => ({ ...prev, ...patch }) as Search });

  return (
    <div className="bg-white text-onyx min-h-screen">
      <Header />
      <header className="bg-onyx text-white py-16 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">The Cellar</span>
          <h1 className="font-serif text-5xl md:text-6xl mt-3">Shop All Spirits</h1>
        </div>
      </header>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 grid lg:grid-cols-[260px_1fr] gap-12">
        {/* Filters */}
        <aside className="space-y-10">
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gold mb-4">Search</h3>
            <input
              defaultValue={search.q ?? ""}
              onChange={(e) => setSearch({ q: e.target.value || undefined })}
              placeholder="Brand or product"
              className="w-full border-b border-onyx/20 py-2 outline-none focus:border-gold text-sm"
            />
          </div>
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gold mb-4">Category</h3>
            <ul className="space-y-2">
              {categories.map((c) => {
                const active = (search.category ?? "All") === c;
                return (
                  <li key={c}>
                    <button
                      onClick={() => setSearch({ category: c === "All" ? undefined : c })}
                      className={`text-sm hover:text-gold transition-colors ${active ? "text-onyx font-bold" : "text-onyx/60"}`}
                    >
                      {c}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gold mb-4">Country</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setSearch({ country: undefined })} className={`text-sm hover:text-gold ${!search.country ? "font-bold" : "text-onyx/60"}`}>All</button>
              </li>
              {countries.map((c) => (
                <li key={c}>
                  <button onClick={() => setSearch({ country: c })} className={`text-sm hover:text-gold ${search.country === c ? "font-bold" : "text-onyx/60"}`}>{c}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gold mb-4">Max Price</h3>
            <input
              type="range"
              min={1000}
              max={100000}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-onyx"
            />
            <p className="text-xs mt-2">Up to <span className="font-bold">KSh {maxPrice.toLocaleString()}</span></p>
          </div>
        </aside>

        {/* Grid */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <p className="text-sm text-onyx/60">{filtered.length} bottles</p>
            <select
              value={search.sort ?? "popular"}
              onChange={(e) => setSearch({ sort: e.target.value as Search["sort"] })}
              className="border border-onyx/10 px-4 py-2 text-xs uppercase tracking-widest"
            >
              <option value="popular">Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-onyx/10">
              <p className="font-serif text-2xl italic">Nothing on this shelf.</p>
              <Link to="/shop" className="mt-4 inline-block text-xs uppercase tracking-widest text-gold border-b border-gold">Clear filters</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
