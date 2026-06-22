import { useEffect, useState } from "react";

const KEY = "siphub.ageverified";

export function AgeGate() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(KEY)) setOpen(true);
  }, []);

  if (!open) return null;

  const accept = () => {
    localStorage.setItem(KEY, "1");
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-onyx/95 backdrop-blur-sm px-6">
      <div className="max-w-md w-full p-10 bg-onyx border border-gold/30 text-center animate-fade-up">
        <h2 className="font-serif text-3xl text-gold mb-2 italic">SipHub</h2>
        <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] mb-8">Kenya · Premium Spirits</p>
        <p className="text-white/70 mb-2 uppercase tracking-widest text-xs">Are you of legal drinking age?</p>
        <p className="text-white/40 text-xs mb-8">You must be 18 years or older to enter this site.</p>
        <div className="flex gap-4">
          <button
            onClick={accept}
            className="flex-1 py-4 bg-gold text-onyx font-semibold uppercase text-xs tracking-widest hover:bg-white transition-colors"
          >
            I am 18+
          </button>
          <a
            href="https://www.google.com"
            className="flex-1 py-4 border border-white/20 text-white/50 font-semibold uppercase text-xs tracking-widest flex items-center justify-center hover:bg-white/5"
          >
            No
          </a>
        </div>
        <p className="mt-8 text-[10px] text-white/30 uppercase tracking-widest">Please drink responsibly</p>
      </div>
    </div>
  );
}
