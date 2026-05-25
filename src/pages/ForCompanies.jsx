import Seo from "@/components/Seo";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
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

const departments = [
  {
    num: "01",
    name: "Finance",
    tagline: "Hours brutal. Stakes high.",
    painPoints: ["Burnout culture", "Weekend work", "Stress-driven illness"],
    approach: "Mindset-first coaching. Recovery rituals. Peer-cohort accountability across desks.",
    proof: "Argo Capital, -18% sick days · 11 funds onboarded",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
  },
  {
    num: "02",
    name: "Tech",
    tagline: "Sedentary. Always-on.",
    painPoints: ["Back and shoulder pain", "Sleep disruption", "Decision fatigue"],
    approach: "Mobility and strength matched to screen-heavy schedules. Evening-friendly workout plans.",
    proof: "Norrsken portfolio, 91% participation after 3 months",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
  },
  {
    num: "03",
    name: "Creative",
    tagline: "Erratic. Ambitious. Tired.",
    painPoints: ["Inconsistent energy", "Motivation cycles", "Physical neglect"],
    approach: "Habit-led coaching. Short, repeatable routines. Coaches who understand irregular schedules.",
    proof: "Design studio, Stockholm, avg. 2.4 check-ins/week sustained",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
  },
  {
    num: "04",
    name: "Industrial",
    tagline: "Shift work. Physical.",
    painPoints: ["Injury recovery", "Joint wear", "Off-hours access"],
    approach: "PT and mobility coaches who work around shift patterns. Injury-aware, body-first.",
    proof: "Logistics client, 3 sites, 100% uptake in first cohort",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80",
  },
];

const howItWorks = [
  { num: "01", title: "You brief us.", body: "Tell us about your team size, location, and what you're trying to solve, energy, focus, movement, stress." },
  { num: "02", title: "We triage each person.", body: "Every employee gets a short discovery call. We map goals, history, schedule, and style before making a match." },
  { num: "03", title: "We align the team.", body: "We match your whole team to the right coaches, ensuring everyone moves in the same direction, with coaches who understand your company culture." },
  { num: "04", title: "We run everything.", body: "Coaching, scheduling, programming, follow-up. HR doesn't manage it. We do, and we report back." },
  { num: "05", title: "You get one report.", body: "Monthly aggregate insights: participation, engagement, outcomes. No names, no private data." },
  { num: "06", title: "One invoice.", body: "Per-head or flat company rate. No hidden extras. One line item, one contact." },
];

const testimonials = [
  { quote: "The first benefit my company offered that I actually used twice.", role: "Software engineer, 34, member, year one" },
  { quote: "I've had a PT through work before. This was completely different. My coach actually knew what I needed before I did.", role: "Head of Product, 41, matched with mobility coach" },
  { quote: "It's the only wellness line item I haven't had to defend at budget review.", role: "CFO, 38-person company, year two" },
];

export default function ForCompanies() {
  const [activeTab, setActiveTab] = useState(0);
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <Seo title="Corporate Wellness and Team Performance, Vitality" description="Give every employee a coach matched to them. Vitality runs fully remote team performance programs for companies across the Nordics and EU. One invoice, one report." path="/ForCompanies" />
      {/* Hero */}
      <section className="relative bg-background min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 pb-16 pt-36 w-full">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-5">p. 18 · For Companies</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
              <div>
                <h1 className="text-[clamp(52px,8vw,96px)] font-bold leading-[0.9] tracking-tight text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Wellness,<br />
                  <em className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">on the P&L.</em>
                </h1>
              </div>
              <div className="flex flex-col gap-5">
                <p className="text-base text-muted-foreground leading-relaxed max-w-md">
                  We run a discovery call with every person on your team, then match each one to the right coach, so the whole team moves together, in the right direction.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => setShowForm(true)} className="relative overflow-hidden inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm font-medium rounded-sm hover:shadow-lg hover:shadow-primary/30 transition-all duration-300">
                    Book a company call <ArrowRight className="w-4 h-4" />
                  </button>
                  <a href="#how-it-works" className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 text-sm font-medium rounded-sm hover:bg-muted transition-all duration-300">
                    How it works <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What it is */}
      <AnimatedElement>
        <section className="bg-background py-20 border-t border-border/40">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">What it is</p>
                <h2 className="text-[clamp(36px,5vw,60px)] font-bold text-foreground leading-tight mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Not a gym membership.<br />Not a wellness app.
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed mb-4">
                  Vitality is a managed matching service. Every person on your team gets a discovery call, we map their goals, history, and schedule. Then we match the whole team to the right coaches, so everyone is aligned and nobody falls through the cracks.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  One invoice. One report. A team that actually uses the benefit.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Team-wide alignment", desc: "Every person matched. Every coach briefed on the company context. The team moves together." },
                  { label: "One coach per person", desc: "Not a platform to browse, a specific coach, chosen for each individual's needs." },
                  { label: "Remote-first teams", desc: "Coaches across the Nordics and EU, all coaching delivered remotely. Your team wherever they are." },
                  { label: "One invoice", desc: "Per-head or flat rate. No hidden extras. One contact, one report." },
                ].map((item, i) => (
                  <AnimatedElement key={item.label} delay={i * 80}>
                    <div className="border border-border rounded-sm p-5 bg-card hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300">
                      <div className="flex items-start gap-2 mb-2">
                        <Check className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </AnimatedElement>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* Departments, dark section */}
      <AnimatedElement>
        <section className="bg-foreground py-24">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-[10px] tracking-[0.2em] uppercase text-background/85 mb-10">Pain points we recognise</p>

            {/* Tab headers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-background/10 mb-0 border border-background/10">
              {departments.map((dept, i) => (
                <button
                  key={dept.name}
                  onClick={() => setActiveTab(i)}
                  className={`text-left px-6 py-5 transition-all duration-300 ${activeTab === i ? "bg-background/15" : "bg-transparent hover:bg-background/5"}`}
                >
                  <p className="text-[10px] text-background/85 font-mono mb-1">{dept.num}</p>
                  <p className={`text-lg font-light transition-colors duration-300 ${activeTab === i ? "text-background" : "text-background/60"}`} style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {dept.name}
                  </p>
                  <p className="text-[11px] text-background/85 mt-0.5">{dept.tagline}</p>
                </button>
              ))}
            </div>

            {/* Tab content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 border border-t-0 border-background/10"
            >
              {/* Left: pain points */}
              <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-background/10">
                <p className="text-[10px] tracking-[0.2em] uppercase text-background/85 mb-6">The pain</p>
                <div className="flex flex-col divide-y divide-background/10">
                  {departments[activeTab].painPoints.map((p, i) => (
                    <div key={p} className="flex items-center gap-4 py-4">
                      <span className="text-[10px] text-primary/70 font-mono w-5 shrink-0">0{i + 1}</span>
                      <p className="text-xl font-light text-background" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{p}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-10">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-background/85 mb-3">The Vitality Partners approach</p>
                  <p className="text-sm text-background/60 leading-relaxed font-light">{departments[activeTab].approach}</p>
                </div>
              </div>

              {/* Right: image + proof */}
              <div className="relative overflow-hidden min-h-[320px]">
                <img
                  src={departments[activeTab].image}
                  alt={departments[activeTab].name}
                  className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-primary/80 mb-2">Proof</p>
                  <p className="text-base text-background font-light leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {departments[activeTab].proof}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </AnimatedElement>

      {/* How it works */}
      <AnimatedElement>
        <section className="bg-background py-24" id="how-it-works">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">The process</p>
            <h2 className="text-[clamp(32px,4vw,52px)] font-bold text-foreground leading-tight mb-12" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              From brief to first plan<br />in two weeks.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {howItWorks.map((step, i) => (
                <AnimatedElement key={step.num} delay={i * 80}>
                  <div className="flex flex-col gap-3 border-t border-border pt-5">
                    <span className="text-xs font-mono text-muted-foreground">{step.num}</span>
                    <h3 className="text-xl italic text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* Testimonials */}
      <AnimatedElement>
        <section className="bg-foreground py-24">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-[10px] tracking-[0.2em] uppercase text-background/85 mb-12">Members, in their words</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <AnimatedElement key={i} delay={i * 100}>
                  <div className="flex flex-col gap-4">
                    <p className="text-lg italic text-background leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif" }}>"{t.quote}"</p>
                    <p className="text-xs text-background/85 uppercase tracking-wide">{t.role}</p>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* CTA */}
      <AnimatedElement>
        <section className="bg-background py-28 text-center" id="contact">
          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-primary/15 rounded-full blur-[100px] pointer-events-none" />
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4 relative z-10">€0, the intake is free</p>
            <h2 className="text-[clamp(36px,5vw,68px)] font-bold text-foreground leading-tight mb-4 relative z-10" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Ready to brief us?
            </h2>
            <p className="text-sm text-muted-foreground mb-10 relative z-10 max-w-md mx-auto">
              Tell us about your team. We'll come back with a plan within 48 hours. No commitment required.
            </p>
            <button onClick={() => setShowForm(true)} className="relative z-10 overflow-hidden inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-sm font-medium rounded-sm hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300">
            Email us directly <ArrowRight className="w-4 h-4" />
            </button>
            <AnimatePresence>{showForm && <ContactForm onClose={() => setShowForm(false)} />}</AnimatePresence>
          </div>
        </section>
      </AnimatedElement>
    </div>
  );
}