import Seo from "@/components/Seo";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ContactForm from "@/components/ContactForm";

const AnimatedElement = ({ children, className, delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) { setIsVisible(true); return; }
    const fallback = setTimeout(() => setIsVisible(true), 800 + delay);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { clearTimeout(fallback); setTimeout(() => setIsVisible(true), delay); observer.unobserve(el); }
    }, { threshold: 0.05, rootMargin: "0px 0px 200px 0px" });
    observer.observe(el);
    return () => { observer.disconnect(); clearTimeout(fallback); };
  }, [delay]);
  return (
    <div ref={ref} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className || ""}`}>
      {children}
    </div>
  );
};

const pillars = [
  {
    num: "01",
    title: "The intake call.",
    body: "Every person who comes to Vitality goes through a 30-minute discovery call. We ask about goals, history, schedule, stress, sleep, injuries, and how they've responded to coaching in the past. No online forms. A real conversation."
  },
  {
    num: "02",
    title: "The match.",
    body: "We don't hand someone a list of coaches and ask them to choose. We make the match. Based on the intake, we select one coach from our pool of vetted professionals, the right discipline, the right style, the right person."
  },
  {
    num: "03",
    title: "The coach.",
    body: "Every coach in the Vitality network has been individually vetted. We don't publish their names publicly. The introduction happens only after the triage, when we're confident the match is correct. This protects both coach and client."
  },
  {
    num: "04",
    title: "The program.",
    body: "Once matched, the coach takes full ownership. Programming, scheduling, check-ins, adjustments. We sit in the background, managing the relationship and making sure nothing slips."
  },
  {
    num: "05",
    title: "The report.",
    body: "For individuals: a simple record of what's been built. For companies: monthly aggregate data on participation, engagement, and outcomes, no names, no private data. One document, once a month."
  },
  {
    num: "06",
    title: "The invoice.",
    body: "One line item. Per-head or flat company rate. No hidden extras, no platform fees buried in fine print. You pay once, we run everything."
  },
];

const values = [
  { title: "Named, not browsed.", body: "We believe the right coach is found by knowing the person, not by showing them a catalogue. Every introduction is intentional." },
  { title: "Depth over scale.", body: "We are not trying to be the biggest wellness platform. We are trying to be the most considered matching service. A carefully sized pool of coaches, no more until we're confident we can maintain the standard." },
  { title: "The whole person.", body: "Fitness is not separate from sleep, stress, diet, or how someone feels on Monday morning. Our coaches are matched to address all of it, or the part that matters most right now." },
  { title: "No noise.", body: "No app, no dashboard, no streak tracking. Coaching is a human relationship. We manage the infrastructure around it so the relationship can be the thing." },
];

export default function About() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <Seo title="About Vitality, A Considered Coach-Matching Service" description="Vitality is a remote coach-matching service, a project by Arenzo. We match each person to the right coach from a vetted pool. Here is what we are and how it works." path="/About" />
      {/* Hero */}
      <section className="relative bg-background min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 pb-16 pt-36 w-full">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-5">About · Vitality Partners</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
              <h1 className="text-[clamp(52px,8vw,96px)] font-bold leading-[0.9] tracking-tight text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                What we are.<br />
                <em className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">How it works.</em>
              </h1>
              <div className="flex flex-col gap-5">
                <p className="text-base text-muted-foreground leading-relaxed max-w-md">
                  Vitality Partners is a managed coach-matching service. We run a discovery process on every person, then select the right coach from our pool of vetted coaches across the Nordics and EU.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed max-w-md">
                  We work with individuals and with companies. In both cases, the model is the same: intake first, match second, coaching third.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The six pillars */}
      <AnimatedElement>
        <section className="bg-muted py-24">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-12">How the system works</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pillars.map((p, i) => (
                <AnimatedElement key={p.num} delay={i * 80}>
                  <div className="bg-card border border-border rounded-sm p-6 flex flex-col gap-3 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300 h-full">
                    <span className="text-xs font-mono text-muted-foreground">{p.num}</span>
                    <h3 className="text-2xl italic text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* What we believe */}
      <AnimatedElement>
        <section className="bg-background py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">What we believe</p>
                <h2 className="text-[clamp(32px,4vw,52px)] font-bold text-foreground leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Four things we<br />won't compromise on.
                </h2>
              </div>
              <div className="flex flex-col divide-y divide-border">
                {values.map((v, i) => (
                  <AnimatedElement key={v.title} delay={i * 80}>
                    <div className="py-6">
                      <h3 className="text-base font-semibold text-foreground mb-2">{v.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{v.body}</p>
                    </div>
                  </AnimatedElement>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* The network */}
      <AnimatedElement>
        <section className="bg-foreground py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-background/70 mb-4">The network</p>
                <h2 className="text-[clamp(32px,4vw,52px)] font-bold text-background leading-tight mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  A vetted pool.<br />12 disciplines.<br />Fully remote.
                </h2>
                <p className="text-sm text-background/60 leading-relaxed max-w-sm">
                  Every coach in the Vitality network has been individually vetted. We assess discipline, method, personality, and coaching style. We don't publish names, introductions happen only after the triage call.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {["Stockholm", "Copenhagen", "Oslo", "Helsinki", "Amsterdam", "Berlin", "London", "Paris", "Zurich"].map((city, i) => (
                  <AnimatedElement key={city} delay={i * 40}>
                    <div className="bg-background/10 border border-background/15 rounded-sm px-4 py-3 text-center">
                      <p className="text-xs text-background/70 font-light">{city}</p>
                    </div>
                  </AnimatedElement>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* Who we are */}
      <AnimatedElement>
        <section className="bg-background py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl">
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">Who we are</p>
              <h2 className="text-[clamp(32px,4vw,52px)] font-bold text-foreground leading-tight mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                A small team.<br />A very specific focus.
              </h2>
              <div className="flex flex-col gap-5 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Vitality Partners was founded in Stockholm with a simple observation: most people don't fail at fitness because they lack motivation. They fail because they're matched with the wrong coach, the wrong method, or no coach at all.
                </p>
                <p>
                  We built a triage and matching service to fix that. We keep the team small deliberately, the matching process only works if it's done by people who understand what they're looking for.
                </p>
                <p>
                  We work across the Nordics and EU, primarily with remote-first tech companies and their employees, and with individuals who want a match that actually fits.
                </p>
                <p className="text-foreground font-medium">
                  The intake is free. Always.
                </p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* CTA */}
      <AnimatedElement>
        <section className="bg-background py-28 text-center">
          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-primary/15 rounded-full blur-[100px] pointer-events-none" />
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4 relative z-10">€0, the intake is free</p>
            <h2 className="text-[clamp(36px,5vw,68px)] font-bold text-foreground leading-tight mb-10 relative z-10" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Ready to begin?
            </h2>
            <button onClick={() => setShowForm(true)} className="relative z-10 inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-sm font-medium rounded-sm hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300">
              Get in touch <ArrowRight className="w-4 h-4" />
            </button>
            <AnimatePresence>{showForm && <ContactForm onClose={() => setShowForm(false)} />}</AnimatePresence>
          </div>
        </section>
      </AnimatedElement>
    </div>
  );
}