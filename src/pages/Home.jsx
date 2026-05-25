import Seo from "@/components/Seo";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
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
      if (entry.isIntersecting) { 
        clearTimeout(fallback); 
        setTimeout(() => setIsVisible(true), delay); 
        observer.unobserve(el); 
      }
    }, { threshold: 0.05, rootMargin: "0px 0px 100px 0px" });
    
    observer.observe(el);
    return () => { observer.disconnect(); clearTimeout(fallback); };
  }, [delay]);
  
  return (
    <div ref={ref} className={`transition-all duration-[800ms] ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} ${className || ""}`}>
      {children}
    </div>
  );
};

function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="relative min-h-[100svh] bg-background pt-24 flex flex-col justify-center">
      {/* Decorative floating elements */}
      <div className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none mix-blend-multiply" style={{ animation: "floatA 12s ease-in-out infinite" }} />
      <div className="absolute bottom-[10%] right-[5%] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] bg-accent/10 rounded-full blur-[90px] pointer-events-none mix-blend-multiply" style={{ animation: "floatB 15s ease-in-out infinite reverse" }} />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMSIvPjwvc3ZnPg==')] opacity-[0.03] pointer-events-none mix-blend-overlay" />

      <div className="max-w-[1400px] mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col gap-8 lg:pr-8"
        >
          <div className="flex flex-col">
            <h1 className="text-[clamp(4.5rem,8vw,8.5rem)] font-normal leading-[0.85] tracking-tight text-foreground -ml-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Vitality
            </h1>
            <p className="text-lg text-foreground/70 mt-4 italic tracking-wide font-light border-l border-primary/30 pl-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              the practice of looking after a body
            </p>
          </div>

          <p className="text-sm md:text-base text-foreground/80 max-w-md leading-relaxed font-light mt-2">
            We analyze every person's body, history, schedule, and style, then match them with the right coach from our pool of vetted coaches. One platform, the right coach, for every person.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button onClick={() => setShowForm(true)} className="group relative overflow-hidden inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-[11px] tracking-widest uppercase font-medium rounded-sm hover:shadow-xl hover:shadow-primary/20 transition-all duration-300">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
              Book intro call <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="#program" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-[10px] tracking-widest uppercase font-medium transition-all duration-300 group">
              How matching works <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform opacity-50 group-hover:opacity-100" />
            </a>
          </div>

          <blockquote className="mt-8 relative before:absolute before:-left-3 before:-top-2 before:content-[''] before:w-6 before:h-6 before:border-t before:border-l before:border-primary/30">
            <p className="text-xl italic text-foreground/90 font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              "The first benefit my company offered that I actually used twice."
            </p>
            <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mt-3">member, year one</p>
          </blockquote>
        </motion.div>

        {/* Right Complex Image Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="lg:col-span-7 relative flex flex-col gap-2 h-full justify-center"
          style={{ y, opacity }}
        >
          {/* Main Large Image */}
          <div className="relative overflow-hidden rounded-sm group aspect-[4/5] sm:aspect-[3/4] md:aspect-auto md:h-[65vh]">
            <img
              src="https://media.base44.com/images/public/6a0eb81dae1b03d0a5acd42f/23e12fbbb_generated_09a06836.png"
              alt="Vitality Practice"
              className="w-full h-full object-cover transition-transform duration-[20s] ease-out group-hover:scale-110"
              style={{ animation: "kenBurns 20s ease-in-out infinite alternate" }}
            />
            {/* Subtle overlay for contrast if needed, keeping it light */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent opacity-50" />
            
            {/* Floating Label */}
            <div className="absolute bottom-6 right-6 backdrop-blur-md bg-background/80 border border-white/20 px-4 py-2 rounded-sm flex items-center gap-3">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-medium text-foreground">Coaching Active</span>
            </div>
          </div>

          {/* Bottom Thumbnails Row to match screenshot complexity */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { src: "https://media.base44.com/images/public/6a0eb81dae1b03d0a5acd42f/1e355d05c_generated_28592ea0.png", label: "Cover Treatment" },
              { src: "https://media.base44.com/images/public/6a0eb81dae1b03d0a5acd42f/4cbfaf8fb_generated_4286a8d8.png", label: "Stockholm" },
              { src: "https://media.base44.com/images/public/6a0eb81dae1b03d0a5acd42f/23e12fbbb_generated_09a06836.png", label: "Outdoor" }
            ].map((thumb, idx) => (
              <div key={idx} className="relative overflow-hidden aspect-[4/3] rounded-sm group cursor-pointer">
                <img 
                  src={thumb.src} 
                  alt={thumb.label} 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
                <div className="absolute bottom-2 left-2 text-[8px] tracking-[0.2em] text-white uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md">
                  {thumb.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <AnimatePresence>{showForm && <ContactForm onClose={() => setShowForm(false)} />}</AnimatePresence>
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 hidden sm:flex"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground [writing-mode:vertical-lr]">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
      </motion.div>
    </section>
  );
}

function TableOfContentsSection() {
  return (
    <AnimatedElement>
      <section className="bg-muted/30 border-y border-border/40 py-8 relative overflow-hidden" id="toc">
        {/* Subtle background noise/texture */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')]"></div>
        
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8 relative z-10">
          
          <div className="flex items-center gap-4 whitespace-nowrap">
            <div className="w-8 h-[1px] bg-foreground/20 hidden sm:block"></div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/60">Inside this issue</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-8 flex-1 w-full xl:w-auto xl:px-12">
            {[
              { page: "p. 04", title: "The Program", sub: "A practice in four parts.", href: "#program" },
              { page: "p. 18", title: "For Companies", sub: "Wellness, on the P&L.", href: "/ForCompanies" },
              { page: "p. 36", title: "The seven", sub: "A roster, anonymized.", href: "#coaches" },
              { page: "p. 48", title: "Conversations", sub: "With members, in their words.", href: "#about" },
            ].map((item, idx) => (
              <AnimatedElement key={item.title} delay={idx * 100} className="group cursor-pointer">
                <a href={item.href} className="block border-l-2 border-transparent group-hover:border-primary pl-4 -ml-4 transition-all duration-300">
                  <p className="text-[9px] text-primary/70 mb-1.5 font-medium tracking-widest uppercase">{item.page}</p>
                  <p className="text-sm md:text-base font-medium text-foreground group-hover:text-primary transition-colors duration-300">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 font-light italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{item.sub}</p>
                </a>
              </AnimatedElement>
            ))}
          </div>
          
          <a href="#book" className="group inline-flex items-center gap-2 bg-foreground text-background hover:bg-primary hover:text-primary-foreground px-6 py-3 text-[10px] tracking-widest uppercase rounded-sm font-medium whitespace-nowrap transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
            Start your intake <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </AnimatedElement>
  );
}

function HowItWorksSection() {
  const steps = [
    { num: "01", title: "Analyze.", desc: "A discovery call. We map every person's goal, history, schedule, and style." },
    { num: "02", title: "Match.", desc: "We connect each person to the right coach from the Vitality Partners network." },
    { num: "03", title: "Run.", desc: "Coaching, programming, reporting, managed end-to-end. One invoice, one report." },
  ];
  return (
    <section className="bg-background py-32 relative" id="program">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <AnimatedElement>
          <div className="text-center mb-20">
            <h2 className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-4">The Process</h2>
            <div className="w-12 h-[1px] bg-primary/40 mx-auto"></div>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-y border-border/40 divide-y md:divide-y-0 md:divide-x divide-border/40 bg-background">
          {steps.map((step, i) => (
            <AnimatedElement key={step.num} delay={i * 150} className="relative group">
              <div className="absolute inset-0 bg-muted/0 group-hover:bg-muted/30 transition-colors duration-500" />
              <div className="flex flex-col gap-6 p-10 md:p-16 relative z-10 h-full">
                <span className="text-[10px] font-medium tracking-[0.2em] text-[#2c4a25] bg-primary/25 w-fit px-3 py-1 rounded-sm">{step.num}</span>
                <h3 className="text-4xl md:text-5xl text-foreground font-light transition-transform duration-500 group-hover:translate-x-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-light mt-auto">
                  {step.desc}
                </p>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { value: "12", label: "Disciplines covered" },
    { value: "1:1", label: "Match, never directory" },
  ];
  return (
    <section className="bg-card py-24 border-t border-border/30 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background opacity-80" />
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 gap-12 lg:gap-8 divide-x-0 lg:divide-x divide-border/30 max-w-xl mx-auto w-full">
          {stats.map((stat, i) => (
            <AnimatedElement key={stat.label} delay={i * 100} className="flex flex-col items-center text-center lg:px-8 group">
              <span className="text-[clamp(3.5rem,6vw,5.5rem)] font-light text-foreground leading-none mb-4 group-hover:text-primary transition-colors duration-500" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {stat.value}
              </span>
              <span className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase max-w-[140px] leading-relaxed">
                {stat.label}
              </span>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeelingSection() {
  const feelings = [
    { f: "tired in the afternoons", read: "Afternoon energy dips usually trace back to sleep, nutrition timing or training load. A coach maps all three in the first week." },
    { f: "stiff in the morning", read: "Morning stiffness points to mobility work: gentle, daily, specific. A mobility-focused coach builds it into your plan." },
    { f: "unmotivated", read: "Motivation rarely returns on its own. A weekly check-in and a plan you did not have to design is what restarts it." },
    { f: "overwhelmed by options", read: "That is the exact problem we exist for. You do not pick from a catalogue, we match you to one coach." },
    { f: "older than I am", read: "Feeling older than your age is usually reversible. The right plan rebuilds capacity, not just fitness." },
    { f: "flat lately", read: "Flat is a signal, not a flaw. A coach who tracks your energy treats it as data and works with it." },
    { f: "sore in my lower back", read: "Lower-back soreness needs a careful, body-aware coach: strength and mobility, not pushing through it." },
    { f: "addicted to my phone", read: "Screen habits and energy are linked. Mindset-led coaching works on the habit, not just the gym." },
    { f: "better than ever", read: "Good. The next level is harder to reach alone. A coach is how you keep the curve going." },
    { f: "wasting my potential", read: "That feeling means you already know there is more. A coach turns should into a weekly plan." },
    { f: "fine, but", read: "Fine, but is where most people stay for years. A 30-minute call is how you find what the but is." },
  ];

  const [selected, setSelected] = useState([]);
  const toggle = (f) => {
    setSelected(prev => prev.includes(f) ? prev.filter(x => x !== f) : prev.length < 3 ? [...prev, f] : prev);
  };
  const hasSelection = selected.length > 0;
  const labels = feelings.map(x => x.f);
  const picked = feelings.filter(x => selected.includes(x.f));

  return (
    <section className="bg-background py-32" id="about">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          <AnimatedElement className="lg:col-span-7 flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground flex items-center gap-4">
                <span className="w-8 h-[1px] bg-border"></span>
                Vitality · Lately I feel
              </p>
              <h2 className="text-[clamp(3rem,6vw,5.5rem)] font-light text-foreground leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Lately I feel{" "}
                {hasSelection ? (
                  <span className="italic text-primary">{selected.join(", ")}.</span>
                ) : (
                  <>
                    <br className="hidden sm:block" />
                    <span className="relative inline-block mt-2 sm:mt-0">
                      <span className="relative z-10 italic text-primary">____</span>
                      <span className="absolute bottom-1 left-0 w-full h-3 bg-primary/10 -z-10 -rotate-2"></span>
                    </span>.
                  </>
                )}
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {labels.map((f, i) => (
                <button
                  key={f}
                  onClick={() => toggle(f)}
                  style={{ animationDelay: `${i * 50}ms` }}
                  className={`animate-[fadeIn_0.5s_ease-out_both] px-5 py-2.5 text-xs tracking-wide rounded-sm border transition-all duration-300 hover:shadow-md ${
                    selected.includes(f)
                      ? "bg-foreground border-foreground text-background scale-105"
                      : "bg-card border-border/60 text-foreground hover:border-primary/50 hover:bg-muted"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <p className="text-[10px] tracking-widest uppercase text-muted-foreground/70">Pick up to 3 · Nobody sees this but you</p>
          </AnimatedElement>

          <AnimatedElement delay={300} className="lg:col-span-5 h-full">
            <div className="bg-foreground rounded-sm p-8 md:p-12 h-full min-h-[350px] flex flex-col relative overflow-hidden">
              <p className="text-[10px] tracking-[0.2em] uppercase text-background/70 mb-6">A quick verdict</p>

              <div className="flex-1 flex flex-col justify-center gap-6">
                {!hasSelection ? (
                  <p className="text-2xl text-background/60 font-light italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Select how you are feeling.
                  </p>
                ) : (
                  <motion.div
                    key={selected.join("|")}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col gap-6"
                  >
                    <div className="flex flex-col gap-5">
                      {picked.map((p) => (
                        <div key={p.f} className="flex flex-col gap-1.5">
                          <span className="text-[11px] tracking-[0.18em] uppercase text-primary">{p.f}</span>
                          <p className="text-sm text-background/80 leading-relaxed font-light">{p.read}</p>
                        </div>
                      ))}
                    </div>
                    <Link
                      to="/TheProgram"
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-[11px] tracking-widest uppercase font-medium rounded-sm hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300 w-fit"
                    >
                      See how matching works <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>
          </AnimatedElement>

        </div>
      </div>
    </section>
  );
}

function CoachRosterSection() {
  // Eight real coaches, broadcast anonymously - expertise only, no names, no faces.
  const roster = [
    { id: "c1", code: "02", specialty: "Nutrition", descriptor: "Dietitian · author", tags: "Evidence-led · Practical · Sustainable" },
    { id: "c2", code: "05", specialty: "Strength + Mindset", descriptor: "Former IFBB pro", tags: "Disciplined · Hard-won perspective · Direct" },
    { id: "c3", code: "09", specialty: "Mindset + Lifestyle", descriptor: "Former bodybuilder", tags: "Mindset-led · Grounded · Lifestyle" },
    { id: "c4", code: "13", specialty: "Running + Lifestyle", descriptor: "Endurance coach", tags: "Long-view · Habit-led · Encouraging" },
    { id: "c5", code: "17", specialty: "Breathwork + Lifestyle", descriptor: "Recovery focus", tags: "Calm · Breath-led · Restorative" },
    { id: "c6", code: "21", specialty: "Performance + Aesthetic", descriptor: "All-round coach", tags: "Performance · Aesthetic · Lifestyle" },
    { id: "c7", code: "26", specialty: "Mobility + Running", descriptor: "Pro athlete", tags: "Athletic · Mobility · All-round" },
    { id: "c8", code: "31", specialty: "Nutrition + Food", descriptor: "Cookbook author", tags: "Food-led · Practical · Approachable" },
  ];

  return (
    <section className="bg-foreground py-32 relative overflow-hidden" id="coaches">
      <div className="absolute inset-0 opacity-[0.05] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIvPjwvc3ZnPg==')] pointer-events-none mix-blend-overlay"></div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <AnimatedElement>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
            <div className="max-w-2xl">
              <p className="text-[10px] tracking-[0.25em] uppercase text-background/70 mb-6 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-background/20"></span>
                The roster · anonymized
              </p>
              <h2 className="text-[clamp(3rem,6vw,5.5rem)] font-light leading-[1.1] text-background" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                We don't sell <em className="text-background/70">names.</em><br/>
                We choose the <em className="text-primary not-italic border-b border-primary/30 pb-2">fit.</em>
              </h2>
              <p className="text-background/70 mt-6 text-sm max-w-md font-light">
                These are the coaches we work with, shown by their field of expertise. Names come only after the triage call, when we know the fit is right.
              </p>
            </div>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-background/15 border border-background/15 p-px rounded-sm">
          {roster.map((coach, i) => (
            <AnimatedElement key={coach.id} delay={i * 80} className="h-full">
              <div className="relative group cursor-default overflow-hidden bg-foreground h-full min-h-[300px] p-6 flex flex-col justify-between transition-colors duration-500 hover:bg-foreground/80">
                <div className="absolute inset-0 opacity-[0.07] bg-gradient-to-br from-primary via-transparent to-transparent pointer-events-none" />
                <div className="relative flex justify-between items-start">
                  <p className="text-[10px] text-background/70 font-mono tracking-wider border border-background/20 px-2 py-0.5 rounded-sm">
                    C.{coach.code}
                  </p>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5" />
                </div>
                <div className="relative">
                  <h4 className="text-xl text-background font-light mb-1 leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {coach.specialty}
                  </h4>
                  <p className="text-[10px] tracking-widest uppercase text-background/70">{coach.descriptor}</p>
                  <p className="text-xs text-background/80 font-light border-l border-primary/50 pl-3 py-1 mt-4">
                    {coach.tags}
                  </p>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>

        <AnimatedElement delay={600}>
          <div className="border-t border-background/10 mt-16 pt-8 flex justify-center">
            <p className="text-[9px] text-background/60 tracking-[0.3em] uppercase flex items-center gap-4 text-center">
              <span className="w-4 h-[1px] bg-background/20"></span>
              Names shared after the triage call · a vetted pool of coaches
              <span className="w-4 h-[1px] bg-background/20"></span>
            </p>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}

function CtaSection() {
  const [showForm, setShowForm] = useState(false);
  return (
    <section className="bg-background py-40 relative overflow-hidden" id="book">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" style={{ animation: "breathe 8s ease-in-out infinite" }} />
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <AnimatedElement>
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-primary/40 mb-10" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 22H22L12 2Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h2 className="text-[clamp(3.5rem,8vw,6.5rem)] font-light text-foreground leading-[1.05]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              The right coach,<br/>
              <em className="text-primary italic font-normal">for every person.</em>
            </h2>
            <div className="mt-16 group relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <button onClick={() => setShowForm(true)} className="relative inline-flex items-center gap-4 border border-border/80 bg-background text-foreground px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-medium hover:border-primary hover:text-primary transition-all duration-500 rounded-sm hover:-translate-y-1 hover:shadow-2xl">
                Get in touch
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        </AnimatedElement>
      </div>
      <AnimatePresence>{showForm && <ContactForm onClose={() => setShowForm(false)} />}</AnimatePresence>
    </section>
  );
}

export default function Home() {
  return (
    <div className="bg-background text-foreground selection:bg-primary/30 selection:text-foreground">
      <Seo title="Vitality, Remote Coaching Matched to the Right Coach" description="Vitality matches you to the right coach from a vetted pool. Personalised nutrition and workout plans with weekly check-ins, fully remote across the Nordics and EU." path="/" jsonLd={{ "@context": "https://schema.org", "@type": "ProfessionalService", "name": "Vitality", "description": "Remote coach-matching service. Personalised nutrition and workout plans with weekly check-ins.", "url": "https://vitality.training", "logo": "https://vitality.training/favicon.svg", "image": "https://vitality.training/og-image.png", "slogan": "Remote coaching, matched to the right coach", "email": "David@vitality.training", "areaServed": ["Nordics", "European Union"], "parentOrganization": { "@type": "Organization", "name": "Arenzo" } }} />
      {/* Inject Keyframes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes voices-scroll { 0% { transform: translateX(0px); } 100% { transform: translateX(-50%); } }
        @keyframes vt-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.45; } }
        @keyframes grainShift { 0% { transform: translate(0px, 0px); } 17% { transform: translate(-8px, 4px); } 33% { transform: translate(6px, -10px); } 50% { transform: translate(-4px, 8px); } 67% { transform: translate(10px, 6px); } 83% { transform: translate(-6px, -4px); } 100% { transform: translate(0px, 0px); } }
        @keyframes kenBurns { 0% { transform: scale(1) translate(0px, 0px); } 100% { transform: scale(1.08) translate(-2%, -1%); } }
        @keyframes pulse { 0%, 100% { box-shadow: rgba(74, 103, 65, 0.45) 0px 0px 0px 0px; } 50% { box-shadow: rgba(74, 103, 65, 0) 0px 0px 0px 10px; } }
        @keyframes revealFailsafe { 100% { opacity: 1; transform: none; } }
        @keyframes breathe { 0%, 100% { opacity: 0.55; transform: scale(1); } 50% { opacity: 1; transform: scale(1.15); } }
        @keyframes pageIn { 0% { opacity: 0; clip-path: inset(0px 100% 0px 0px); } 100% { opacity: 1; clip-path: inset(0px); } }
        @keyframes fadeIn { 0% { opacity: 0; transform: translateY(8px); } 100% { opacity: 1; transform: none; } }
        @keyframes rise { 0% { transform: translateY(110%); } 100% { transform: translateY(0px); } }
        @keyframes widen { 0% { width: 0px; } 100% { width: 160px; } }
        @keyframes slide { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        
        /* Custom enhancements */
        @keyframes floatA { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-30px) rotate(5deg); } }
        @keyframes floatB { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(-5deg); } }
        @keyframes shimmer { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }
      `}} />
      
      <HeroSection />
      <TableOfContentsSection />
      <HowItWorksSection />
      <StatsSection />
      <FeelingSection />
      <CoachRosterSection />
      <CtaSection />
    </div>
  );
}