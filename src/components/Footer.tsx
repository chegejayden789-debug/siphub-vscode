import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-onyx text-white py-16 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto grid md:grid-cols-4 gap-12">
        <div>
          <span className="font-serif text-2xl font-bold tracking-tight text-gold">SIPHUB</span>
          <p className="mt-6 text-white/40 text-xs leading-relaxed max-w-xs">
            Kenya's premier online spirits marketplace. Licensed, secure, and delivered with precision across Nairobi, Mombasa, Kisumu, and Nakuru.
          </p>
        </div>
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-gold mb-6">Concierge</h4>
          <ul className="space-y-4 text-xs text-white/60">
            <li><Link to="/party-planner" className="hover:text-white">Party Planner</Link></li>
            <li><Link to="/recommender" className="hover:text-white">AI Sommelier</Link></li>
            <li><Link to="/shop" className="hover:text-white">Corporate Orders</Link></li>
            <li><Link to="/account" className="hover:text-white">Loyalty Points</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-gold mb-6">Support</h4>
          <ul className="space-y-4 text-xs text-white/60">
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/blog" className="hover:text-white">Journal</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-gold mb-6">Payments</h4>
          <div className="flex flex-wrap gap-2">
            {["M-PESA", "AIRTEL", "VISA", "MASTERCARD", "COD"].map((p) => (
              <div key={p} className="px-3 py-2 border border-white/20 text-[9px] font-bold tracking-widest">
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] text-white/30 uppercase tracking-widest">
          © {new Date().getFullYear()} SipHub Luxury Spirits · Enjoy Responsibly · 18+
        </p>
        <p className="text-[10px] text-white/30 uppercase tracking-widest">Licensed Liquor Vendor · NACADA Compliant</p>
      </div>
    </footer>
  );
}
