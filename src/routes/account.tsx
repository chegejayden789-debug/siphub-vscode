import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { formatKsh } from "@/lib/products";

const orders = [
  { id: "SH-10472", date: "Jun 14, 2026", items: "Highland Reserve 18Y · Maison Doré Brut", total: 22550, status: "Delivered" },
  { id: "SH-10398", date: "May 30, 2026", items: "Botanist's Secret No. 4 × 2", total: 9850, status: "Delivered" },
  { id: "SH-10331", date: "May 12, 2026", items: "Reserva del Sol Añejo", total: 19150, status: "Delivered" },
];

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "Your Account — SipHub" }] }),
  component: Account,
});

function Account() {
  const points = 1240;
  return (
    <div className="bg-white text-onyx min-h-screen">
      <Header />
      <header className="bg-onyx text-white py-20 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto flex flex-wrap justify-between items-end gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">Member</span>
            <h1 className="font-serif text-5xl md:text-6xl mt-3">Karibu, Wanjiku</h1>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-gold font-bold">Loyalty Points</p>
            <p className="font-serif text-4xl text-white">{points.toLocaleString()}</p>
            <p className="text-xs text-white/50 mt-1">Gold Tier · 260 to Platinum</p>
          </div>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 space-y-16">
        <section>
          <h2 className="font-serif text-3xl mb-8">Order History</h2>
          <div className="border border-onyx/10 divide-y divide-onyx/10">
            {orders.map((o) => (
              <div key={o.id} className="p-6 grid md:grid-cols-5 gap-4 items-center">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-onyx/50">Order</p>
                  <p className="font-bold mt-1">{o.id}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-onyx/50">Date</p>
                  <p className="mt-1">{o.date}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-[10px] uppercase tracking-widest text-onyx/50">Items</p>
                  <p className="mt-1 text-sm">{o.items}</p>
                </div>
                <div className="flex md:flex-col md:items-end justify-between">
                  <p className="font-bold">{formatKsh(o.total)}</p>
                  <span className="text-[10px] uppercase tracking-widest text-gold font-bold mt-1">{o.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-stone-50 p-10">
          <h2 className="font-serif text-3xl mb-3">The SipHub Loyalty Program</h2>
          <p className="text-onyx/70 max-w-xl">Earn 1 point for every KSh 100 spent. Refer friends for 500 bonus points each. Reach Platinum for free express delivery and early access to limited bottles.</p>
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            {[
              { tier: "Silver", req: "0 – 999 pts", perk: "Birthday discount" },
              { tier: "Gold", req: "1,000 – 4,999 pts", perk: "Priority delivery" },
              { tier: "Platinum", req: "5,000+ pts", perk: "Free express · Limited bottle access" },
            ].map((t) => (
              <div key={t.tier} className="bg-white p-6 border border-onyx/10">
                <p className="font-serif text-2xl text-gold">{t.tier}</p>
                <p className="text-[10px] uppercase tracking-widest text-onyx/50 mt-1">{t.req}</p>
                <p className="text-sm mt-4">{t.perk}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center">
          <Link to="/shop" className="inline-block bg-onyx text-white px-12 py-4 text-xs uppercase tracking-widest font-bold hover:bg-gold hover:text-onyx">
            Continue Shopping
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
