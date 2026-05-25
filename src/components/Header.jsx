import LogoMark from "@/components/Logo";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, ArrowRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AnimatePresence } from "framer-motion";
import ContactForm from "@/components/ContactForm";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm py-0" : "bg-transparent py-2"}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo Area */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <LogoMark className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
            <span className="text-sm font-medium tracking-[0.25em] text-foreground uppercase group-hover:text-primary transition-colors duration-300">
              VITALITY
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <Link to="/" className="text-[10px] text-muted-foreground hover:text-foreground hover:underline underline-offset-4 transition-all duration-300 tracking-[0.15em] uppercase">Home</Link>
          <Link to="/TheProgram" className="text-[10px] text-muted-foreground hover:text-foreground hover:underline underline-offset-4 transition-all duration-300 tracking-[0.15em] uppercase">The Program</Link>
          <Link to="/ForCompanies" className="text-[10px] text-muted-foreground hover:text-foreground hover:underline underline-offset-4 transition-all duration-300 tracking-[0.15em] uppercase">For Companies</Link>
          <Link to="/About" className="text-[10px] text-muted-foreground hover:text-foreground hover:underline underline-offset-4 transition-all duration-300 tracking-[0.15em] uppercase">About</Link>
          <button onClick={() => setShowForm(true)} className="text-[10px] text-muted-foreground hover:text-foreground hover:underline underline-offset-4 transition-all duration-300 tracking-[0.15em] uppercase">Contact</button>
        </nav>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowForm(true)}
            className="hidden sm:inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 text-[10px] font-medium tracking-widest uppercase rounded-sm hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300"
          >
            Book a Call <ArrowRight className="w-3 h-3" />
          </button>

          <Sheet>
            <SheetTrigger asChild className="sm:hidden">
              <Button variant="ghost" size="icon" className="h-10 w-10 text-foreground hover:bg-muted rounded-full">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background/95 backdrop-blur-xl border-l border-border w-72 sm:w-80 p-8">
              <div className="flex flex-col h-full">
                <div className="flex flex-col gap-8 mt-12">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/70">Menu</p>
                  <nav className="flex flex-col gap-5">
                    <Link to="/" className="text-lg font-light text-foreground hover:text-primary transition-colors tracking-wide">Home</Link>
                    <Link to="/TheProgram" className="text-lg font-light text-foreground hover:text-primary transition-colors tracking-wide">The Program</Link>
                    <Link to="/ForCompanies" className="text-lg font-light text-foreground hover:text-primary transition-colors tracking-wide">For Companies</Link>
                    <Link to="/About" className="text-lg font-light text-foreground hover:text-primary transition-colors tracking-wide">About</Link>
                    <button onClick={() => setShowForm(true)} className="text-lg font-light text-foreground hover:text-primary transition-colors tracking-wide text-left">Contact</button>
                  </nav>
                </div>
                
                <div className="mt-auto pb-8">
                  <button onClick={() => setShowForm(true)} className="flex items-center justify-between w-full bg-primary text-primary-foreground px-6 py-4 text-xs font-medium tracking-widest uppercase rounded-sm hover:shadow-md transition-all duration-300 group">
                    Book a Call 
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <div className="pt-6 mt-6 border-t border-border">
                    <p className="text-[10px] tracking-widest uppercase text-muted-foreground/60 mb-2">Vitality Partners</p>
                    <p className="text-xs text-muted-foreground">Custom team performance programs for remote tech companies.</p>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <AnimatePresence>{showForm && <ContactForm onClose={() => setShowForm(false)} />}</AnimatePresence>
    </header>
  );
}