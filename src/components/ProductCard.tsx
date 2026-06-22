import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { formatKsh, type Product } from "@/lib/products";

export function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  return (
    <div className="group">
      <Link to="/product/$id" params={{ id: p.id }} className="block">
        <div className="relative overflow-hidden mb-4 aspect-[4/5] bg-stone-50">
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            width={800}
            height={1000}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
          />
          {p.badge && (
            <div className="absolute top-4 left-4 bg-onyx text-white px-3 py-1 text-[8px] font-bold uppercase tracking-widest">
              {p.badge}
            </div>
          )}
        </div>
        <h3 className="font-serif text-lg leading-tight">{p.name}</h3>
        <p className="text-[10px] text-onyx/50 uppercase tracking-widest mb-2">{p.subtitle}</p>
        <p className="font-bold">{formatKsh(p.price)}</p>
      </Link>
      <button
        onClick={() => {
          add(p);
          toast.success(`${p.name} added to cart`);
        }}
        className="mt-4 w-full py-3 border border-onyx/10 hover:bg-onyx hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest cursor-pointer"
      >
        Add to Cart
      </button>
    </div>
  );
}
