import Seo from "@/components/Seo";
import { useState, useEffect, useRef } from "react";
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

const steps = [
  {
    num: "01",
    title: "Analyze.",
    body: "A discovery call with each person. We map their goal, their history, their schedule, and how they best respond to coaching. Energy levels, injuries, lifestyle, stress, all of it."
  },
  {
    num: "02",
    title: "Match.",
    body: "Based on everything from the intake, we select a single coach from the network. You don't browse. We choose. The match is made because it makes sense, not because someone was available."
  },
  {
    num: "03",
    title: "Run.",
    body: "The coach takes it from here. Programming, scheduling, ongoing check-ins. We manage the relationship between coach and client so nothing falls through."
  },
  {
    num: "04",
    title: "Report.",
    body: "Monthly summaries on progress, participation, and engagement. For companies, aggregate reports. For individuals, a simple record of what's been built."
  },
];

const disciplines = [
  { name: "Strength", desc: "Compound lifting, progressive overload, foundation-first." },
  { name: "Endurance", desc: "Running, cycling, heart-rate-led training, long-view building." },
  { name: "Mobility", desc: "Movement quality, flexibility, joint health, post-rehab." },
  { name: "PT", desc: "Clinical, corrective, body-aware, pain-prevention-focused." },
  { name: "Mindset", desc: "Habits, sleep, stress response, behavioral change." },
  { name: "Hybrid", desc: "Combines disciplines for the full-picture person." },
  { name: "Running", desc: "Beginner to advanced, race-prep or general fitness." },
  { name: "Yoga", desc: "Technique-led, non-spiritual, breath and body combined." },
  { name: "Pilates", desc: "Core-centered, postural, accessible at every level." },
  { name: "Sleep", desc: "Recovery-first coaching; often the real unlock." },
  { name: "Nutrition", desc: "Fuelling performance, not restriction. Sustainable." },
  { name: "Recovery", desc: "For the overworked. Deload, restore, rebuild." },
];

const whyMatch = [
  {
    title: "You don't know what you need.",
    body: "Most people have a vague sense, 'I should move more' or 'I'm always tired.' The intake process surfaces the real need. Then we find the right coach for that need."
  },
  {
    title: "The wrong match means nothing.",
    body: "A strength coach for someone who needs mobility work. A hard-pushing trainer for someone who's burned out. It doesn't work. The match has to be right, discipline, pace, personality."
  },
  {
    title: "A wide pool means real choice.",
    body: "We maintain a wide pool of vetted coaches. That depth means we can always find the right fit, not just whoever is available."
  },
  {
    title: "Named after the intake, not before.",
    body: "We don't introduce a coach until we're confident in the match. Names come after the triage call. This keeps the quality of every introduction high."
  },
];

const faqs = [
  { q: "How long does the intake take?", a: "The discovery call is 30 minutes. We match within 3 working days. Your first plan usually lands within 2 weeks of signing." },
  { q: "What can I be matched to?", a: "Every discipline in our pool: strength, endurance, mobility, mindset, nutrition and more. Coaching is fully remote, so where you live never limits the match." },
  { q: "How does the coaching work?", a: "Your coach builds a nutrition plan and a workout plan around your intake, then runs weekly check-ins to adjust as you progress. Everything is remote." },
  { q: "Is this in-person or remote?", a: "Fully remote. Plans, check-ins and coaching all happen online, so it fits any schedule and any location." },
];

export default function TheProgram() {
  const [openFaq, setOpenFaq] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const staticFallback = [
    { id: "1", code: "02", specialty: "Nutrition", years: "Dietitian, author", tags: "Evidence-led · Practical · Sustainable", image_url: "https://media.base44.com/images/public/6a0eb81dae1b03d0a5acd42f/1e355d05c_generated_28592ea0.png" },
    { id: "2", code: "05", specialty: "Strength + Mindset", years: "Former IFBB pro", tags: "Disciplined · Hard-won perspective · Direct", image_url: "https://media.base44.com/images/public/6a0eb81dae1b03d0a5acd42f/4cbfaf8fb_generated_4286a8d8.png" },
    { id: "3", code: "26", specialty: "Mobility + Running", years: "Pro athlete", tags: "Athletic · Mobility · All-round", image_url: "https://media.base44.com/images/public/6a0eb81dae1b03d0a5acd42f/5214281d3_generated_77684430.png" },
    { id: "4", code: "21", specialty: "Performance + Aesthetic", years: "All-round coach", tags: "Performance · Aesthetic · Lifestyle", image_url: "https://media.base44.com/images/public/6a0eb81dae1b03d0a5acd42f/7f42a055a_generated_b827342a.png" },
  ];
  const items = staticFallback;

  return (
    <div>
      <Seo title="The Program, How Vitality Matches You to a Coach" description="A discovery call, a human triage, then the right coach. See how the fully remote Vitality coaching program works, from intake to your first plan." path="/TheProgram" jsonLd={{ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "How long does the intake take?", "acceptedAnswer": { "@type": "Answer", "text": "The discovery call is 30 minutes. We match within 3 working days. Your first plan usually lands within 2 weeks of signing." } }, { "@type": "Question", "name": "What can I be matched to?", "acceptedAnswer": { "@type": "Answer", "text": "Every discipline in our pool: strength, endurance, mobility, mindset, nutrition and more. Coaching is fully remote." } }, { "@type": "Question", "name": "How does the coaching work?", "acceptedAnswer": { "@type": "Answer", "text": "Your coach builds a nutrition plan and a workout plan around your intake, then runs weekly check-ins to adjust as you progress. Everything is remote." } }, { "@type": "Question", "name": "Is this in-person or remote?", "acceptedAnswer": { "@type": "Answer", "text": "Fully remote. Plans, check-ins and coaching all happen online, so it fits any schedule and any location." } } ] }} />
      {/* Hero */}
      <section className="relative bg-background min-h-[55vh] flex items-end overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 pb-16 pt-36 w-full">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-5">p. 04 · The Program</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
              <h1 className="text-[clamp(52px,8vw,96px)] font-bold leading-[0.9] tracking-tight text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                A practice in<br />
                <em className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">four parts.</em>
              </h1>
              <div className="flex flex-col gap-4">
                <p className="text-base text-muted-foreground leading-relaxed max-w-md">
                  Vitality isn't a platform you browse. It's a service that runs a discovery process on every person, then selects the right coach from our pool of vetted coaches.
                </p>
                <a href="#how" className="inline-flex items-center gap-2 text-sm text-[#2c4a25] hover:underline underline-offset-4">
                  See the process <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Four steps */}
      <AnimatedElement>
        <section className="bg-muted py-20" id="how">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <AnimatedElement key={step.num} delay={i * 80}>
                  <div className="bg-card border border-border rounded-sm p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full flex flex-col gap-3">
                    <span className="text-xs font-mono text-muted-foreground">{step.num}</span>
                    <h3 className="text-2xl italic text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* Why matching matters */}
      <AnimatedElement>
        <section className="bg-background py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">Why it works</p>
                <h2 className="text-[clamp(32px,4vw,52px)] font-bold text-foreground leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  The match is<br />everything.
                </h2>
              </div>
              <div className="flex flex-col gap-8">
                {whyMatch.map((item, i) => (
                  <AnimatedElement key={item.title} delay={i * 80}>
                    <div className="flex flex-col gap-2 border-t border-border pt-6">
                      <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                    </div>
                  </AnimatedElement>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* 12 Disciplines */}
      <AnimatedElement>
        <section className="bg-muted py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">12 disciplines covered</p>
                <h2 className="text-[clamp(32px,4vw,52px)] font-bold text-foreground leading-tight mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Every body,<br />every discipline.
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                  Our network spans 12 disciplines. The intake determines which one (or combination) fits each person. Nobody is slotted into a generic category.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {disciplines.map((d, i) => (
                  <AnimatedElement key={d.name} delay={i * 40}>
                    <div className="flex gap-3 bg-card border border-border rounded-sm p-4">
                      <Check className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{d.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{d.desc}</p>
                      </div>
                    </div>
                  </AnimatedElement>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* Coach roster teaser */}
      <AnimatedElement>
        <section className="bg-foreground py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-background/70 mb-3">The roster, anonymized</p>
                <h2 className="text-[clamp(32px,4vw,52px)] font-bold text-background leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  A sample of<br />the network.
                </h2>
              </div>
              <p className="text-sm text-background/60 max-w-xs">Names come after the triage call. What you see here is the method, not the person.</p>
            </div>
            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 transition-opacity duration-500 opacity-100`}>
              {items.slice(0, 4).map((coach, i) => (
                <AnimatedElement key={coach.id || i} delay={i * 80}>
                  <div className="relative group overflow-hidden rounded-sm">
                    <img
                      src={coach.image_url}
                      alt={`Coach ${coach.code}`}
                      className="w-full aspect-[4/5] object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-3">
                      <p className="text-[10px] text-background/60 font-mono">Coach {coach.code}</p>
                      <p className="text-sm font-medium text-background">{coach.specialty}</p>
                      <p className="text-xs text-background/60">{coach.years}</p>
                    </div>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* FAQs */}
      <AnimatedElement>
        <section className="bg-background py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">Common questions</p>
                <h2 className="text-[clamp(32px,4vw,52px)] font-bold text-foreground leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Things people<br />usually ask.
                </h2>
              </div>
              <div className="flex flex-col divide-y divide-border">
                {faqs.map((faq, i) => (
                  <AnimatedElement key={i} delay={i * 60}>
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="flex justify-between items-start gap-4 py-5 text-left w-full group"
                    >
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{faq.q}</p>
                      <span className={`text-muted-foreground text-lg leading-none transition-transform duration-200 shrink-0 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                    </button>
                    {openFaq === i && (
                      <p className="text-sm text-muted-foreground pb-5 leading-relaxed">{faq.a}</p>
                    )}
                  </AnimatedElement>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* CTA */}
      <AnimatedElement>
        <section className="bg-background py-24 text-center">
          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-primary/15 rounded-full blur-[80px] pointer-events-none" />
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4 relative z-10">€0, the intake is free</p>
            <h2 className="text-[clamp(36px,5vw,64px)] font-bold text-foreground leading-tight mb-8 relative z-10" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Ready to begin?
            </h2>
            <button onClick={() => setShowForm(true)} className="relative z-10 overflow-hidden inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-sm font-medium rounded hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300">
              Book intro call <ArrowRight className="w-4 h-4" />
            </button>
            <AnimatePresence>{showForm && <ContactForm onClose={() => setShowForm(false)} />}</AnimatePresence>
          </div>
        </section>
      </AnimatedElement>
    </div>
  );
}