import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const faqs = [
  { q: "How fast is delivery in Nairobi?", a: "Express orders arrive in under 45 minutes within Nairobi city limits. Outside the CBD, plan 60–90 minutes." },
  { q: "What payment methods do you accept?", a: "M-Pesa STK Push, Airtel Money, Visa, Mastercard, and cash on delivery (where eligible)." },
  { q: "Do you verify age on delivery?", a: "Yes. Our riders check a valid government ID showing 18+ before handing over any order." },
  { q: "Can I schedule a delivery?", a: "Yes — pick any 1-hour slot up to 14 days in advance during checkout. Perfect for parties." },
  { q: "Do you deliver outside Nairobi?", a: "We currently serve Nairobi, Mombasa, Kisumu, and Nakuru. More cities coming soon." },
  { q: "What about bulk orders for bars or events?", a: "We offer wholesale pricing and dedicated account managers — write to business@siphub.co.ke." },
  { q: "Can I return a bottle?", a: "Sealed, unopened bottles can be returned within 24 hours of delivery. Damaged in transit? We replace at no charge." },
  { q: "How do loyalty points work?", a: "Earn 1 point per KSh 100 spent. 500 points = KSh 500 off your next order." },
];

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [{ title: "FAQ — SipHub" }, { name: "description", content: "Answers to common questions about SipHub delivery, payment, age verification, and more." }] }),
  component: Faq,
});

function Faq() {
  return (
    <div className="bg-white text-onyx">
      <Header />
      <header className="bg-onyx text-white py-20 px-6 md:px-12">
        <div className="max-w-[1000px] mx-auto">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">Answers</span>
          <h1 className="font-serif text-5xl md:text-6xl mt-4">Frequently Asked</h1>
        </div>
      </header>
      <div className="max-w-[800px] mx-auto px-6 md:px-12 py-16">
        <div className="divide-y divide-onyx/10">
          {faqs.map((f, i) => (
            <details key={i} className="py-6 group">
              <summary className="cursor-pointer flex justify-between items-center font-serif text-xl list-none">
                <span>{f.q}</span>
                <span className="text-gold text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-onyx/70 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
