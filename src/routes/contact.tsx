import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — SipHub" }, { name: "description", content: "Reach SipHub via WhatsApp, phone, email, or live chat." }] }),
  component: Contact,
});

function Contact() {
  return (
    <div className="bg-white text-onyx">
      <Header />
      <header className="bg-onyx text-white py-20 px-6 md:px-12">
        <div className="max-w-[1000px] mx-auto">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">Get in Touch</span>
          <h1 className="font-serif text-5xl md:text-6xl mt-4">Contact</h1>
        </div>
      </header>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-20 grid lg:grid-cols-2 gap-16">
        <div className="space-y-10">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2">WhatsApp Concierge</p>
            <a
              href="https://wa.me/254798749080?text=Hi%20SipHub%2C%20I%27d%20like%20to%20place%20an%20order%20or%20ask%20about%20a%20product."
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif text-3xl hover:text-gold transition-colors"
            >
              0798 749 080
            </a>
            <p className="text-sm text-onyx/60 mt-2">Order, ask, or track via WhatsApp — 24/7.</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2">Email</p>
            <p className="font-serif text-3xl">hello@siphub.co.ke</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2">HQ</p>
            <p className="font-serif text-2xl">Westlands, Nairobi</p>
            <p className="text-sm text-onyx/60 mt-2">Mon–Sun · 10am – 1am</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2">Business / B2B</p>
            <p className="font-serif text-2xl">business@siphub.co.ke</p>
            <p className="text-sm text-onyx/60 mt-2">Wholesale for bars, hotels and event organisers.</p>
          </div>
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); toast.success("Thanks — we'll reply within 2 hours."); (e.target as HTMLFormElement).reset(); }}
          className="bg-stone-50 p-10 space-y-6"
        >
          <h2 className="font-serif text-2xl">Send us a note</h2>
          <Input label="Name" required />
          <Input label="Email" type="email" required />
          <label className="block">
            <span className="text-[10px] uppercase tracking-widest text-onyx/60 font-bold">Message *</span>
            <textarea required maxLength={1000} rows={5}
              className="mt-1 w-full border-b border-onyx/20 py-3 outline-none focus:border-gold bg-transparent resize-none" />
          </label>
          <button type="submit" className="w-full bg-onyx text-white py-4 text-xs uppercase tracking-widest font-bold hover:bg-gold hover:text-onyx">
            Send
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

function Input({ label, type = "text", required }: { label: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-widest text-onyx/60 font-bold">{label}{required && " *"}</span>
      <input type={type} required={required} maxLength={200}
        className="mt-1 w-full border-b border-onyx/20 py-3 outline-none focus:border-gold bg-transparent" />
    </label>
  );
}
