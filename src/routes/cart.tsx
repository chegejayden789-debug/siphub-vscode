import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cart";
import { formatKsh } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — SipHub" }] }),
  component: Cart,
});

function Cart() {
  const { items, remove, setQty, subtotal, clear } = useCart();
  const delivery = items.length ? 250 : 0;

  return (
    <div className="bg-white text-onyx min-h-screen">
      <Header />
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16">
        <h1 className="font-serif text-5xl mb-12">Your Cart</h1>
        {items.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-onyx/15">
            <p className="font-serif text-2xl italic mb-6">Your cart is empty.</p>
            <Link to="/shop" className="inline-block bg-onyx text-white px-8 py-4 text-xs uppercase tracking-widest font-bold hover:bg-gold hover:text-onyx">
              Explore the Cellar
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_400px] gap-12">
            <div className="divide-y divide-onyx/10">
              {items.map((i) => (
                <div key={i.product.id} className="py-6 flex gap-6">
                  <Link to="/product/$id" params={{ id: i.product.id }} className="w-24 h-32 bg-stone-50 shrink-0">
                    <img src={i.product.image} alt={i.product.name} className="w-full h-full object-cover" width={200} height={250} loading="lazy" />
                  </Link>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between gap-4">
                      <div>
                        <Link to="/product/$id" params={{ id: i.product.id }} className="font-serif text-xl hover:text-gold">{i.product.name}</Link>
                        <p className="text-[10px] uppercase tracking-widest text-onyx/50 mt-1">{i.product.subtitle}</p>
                      </div>
                      <p className="font-bold">{formatKsh(i.product.price * i.qty)}</p>
                    </div>
                    <div className="mt-auto flex justify-between items-center pt-4">
                      <div className="flex items-center border border-onyx/15">
                        <button onClick={() => setQty(i.product.id, i.qty - 1)} className="px-3 py-1 hover:bg-onyx hover:text-white">−</button>
                        <span className="px-4 text-sm font-bold">{i.qty}</span>
                        <button onClick={() => setQty(i.product.id, i.qty + 1)} className="px-3 py-1 hover:bg-onyx hover:text-white">+</button>
                      </div>
                      <button onClick={() => remove(i.product.id)} className="text-[10px] uppercase tracking-widest text-onyx/50 hover:text-onyx">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-6">
                <button onClick={clear} className="text-[10px] uppercase tracking-widest text-onyx/50 hover:text-onyx">Clear cart</button>
              </div>
            </div>

            <aside className="bg-onyx text-white p-10 h-fit">
              <h2 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-6">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-white/60">Subtotal</span><span>{formatKsh(subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-white/60">Express Delivery</span><span>{formatKsh(delivery)}</span></div>
              </div>
              <div className="border-t border-white/10 mt-6 pt-6 flex justify-between font-bold text-lg">
                <span>Total</span><span className="text-gold">{formatKsh(subtotal + delivery)}</span>
              </div>
              <Link to="/checkout" className="block text-center mt-8 w-full bg-gold text-onyx py-4 text-xs font-bold uppercase tracking-widest hover:bg-white">
                Secure Checkout
              </Link>
              <p className="mt-4 text-[10px] text-white/40 text-center uppercase tracking-widest">M-Pesa · Airtel · Card · COD</p>
            </aside>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
