import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/shop", label: "Whiskies", search: { category: "Whisky" } },
  { to: "/shop", label: "Wines", search: { category: "Wine" } },
  { to: "/shop", label: "Champagne", search: { category: "Champagne" } },
  { to: "/party-planner", label: "Party Planner" },
  { to: "/blog", label: "Journal" },
];

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-onyx/5">
      <div className="px-6 py-4 flex items-center justify-between max-w-[1440px] mx-auto">
        <div className="flex items-center gap-10">
          <Link to="/" className="font-serif text-2xl font-bold tracking-tight text-onyx">
            SIPHUB
          </Link>
          <div className="hidden lg:flex gap-7 text-[10px] font-semibold uppercase tracking-widest text-onyx/60">
            {nav.map((n, i) => (
              <Link
                key={i}
                to={n.to}
                search={n.search as never}
                className="hover:text-gold transition-colors"
                activeProps={{ className: "text-onyx" }}
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-gold mr-2 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Nairobi · 45 min</span>
          </div>
          <Link to="/account" className="hidden md:inline text-xs font-medium hover:text-gold uppercase tracking-widest">
            Account
          </Link>
          <Link to="/cart" className="text-xs font-bold uppercase tracking-widest hover:text-gold">
            Cart ({count})
          </Link>
          <button className="lg:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-onyx/5 bg-white px-6 py-4 flex flex-col gap-3">
          {nav.map((n, i) => (
            <Link
              key={i}
              to={n.to}
              search={n.search as never}
              onClick={() => setOpen(false)}
              className="text-xs font-semibold uppercase tracking-widest text-onyx/70 hover:text-gold py-1"
            >
              {n.label}
            </Link>
          ))}
          <Link to="/account" onClick={() => setOpen(false)} className="text-xs font-semibold uppercase tracking-widest text-onyx/70 py-1">
            Account
          </Link>
        </div>
      )}
    </nav>
  );
}
