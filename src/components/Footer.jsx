import LogoMark from "@/components/Logo";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import ContactForm from "@/components/ContactForm";

export default function Footer() {
  const [showForm, setShowForm] = useState(false);
  return (
    <footer className="bg-foreground text-background">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold tracking-[0.2em] uppercase text-background hover:text-primary transition-colors">
            <LogoMark className="w-5 h-5 text-primary" />
            VITALITY
          </Link>
          <p className="text-xs text-background/70 mt-4 leading-relaxed max-w-xs">
            Custom team performance programs for remote tech companies, matched coach to person. Nordics and Europe.
          </p>
        </div>

        {/* Site */}
        <div>
          <h6 className="text-[10px] tracking-[0.2em] uppercase text-background/60 mb-4">Site</h6>
          <ul className="flex flex-col gap-2.5">
            <li><Link to="/" className="text-xs text-background/70 hover:text-background transition-colors">Home</Link></li>
            <li><Link to="/TheProgram" className="text-xs text-background/70 hover:text-background transition-colors">The Program</Link></li>
            <li><a href="/ForCompanies" className="text-xs text-background/70 hover:text-background transition-colors">For Companies</a></li>
            <li><Link to="/About" className="text-xs text-background/70 hover:text-background transition-colors">About</Link></li>
            <li><a href="/coaches" className="text-xs text-background/70 hover:text-background transition-colors">Apply as a coach</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h6 className="text-[10px] tracking-[0.2em] uppercase text-background/60 mb-4">Contact</h6>
          <ul className="flex flex-col gap-2.5">
            <li>
              <button onClick={() => setShowForm(true)} className="text-xs text-background/70 hover:text-background transition-colors text-left">Book a call</button>
            </li>
            <li>
              <button onClick={() => setShowForm(true)} className="text-xs text-background/70 hover:text-background transition-colors text-left">David@vitality.training</button>
            </li>
          </ul>
        </div>

        {/* Office */}
        <div>
          <h6 className="text-[10px] tracking-[0.2em] uppercase text-background/60 mb-4">Office</h6>
          <ul className="flex flex-col gap-2.5">
            <li className="text-xs text-background/70">Stockholm</li>
            <li className="text-xs text-background/70">Remote-first · Nordics + EU</li>
          </ul>
          <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-1.5 mt-6 bg-primary text-primary-foreground px-4 py-2 text-xs rounded hover:shadow-md hover:shadow-primary/20 transition-all duration-300">
            Book a Call <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      <AnimatePresence>{showForm && <ContactForm onClose={() => setShowForm(false)} />}</AnimatePresence>
      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="text-[10px] text-background/60 tracking-widest uppercase">© 2026 Vitality · A project by Arenzo</span>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="text-[10px] text-background/60 tracking-widest uppercase hover:text-background transition-colors">Privacy</Link>
            <Link to="/terms" className="text-[10px] text-background/60 tracking-widest uppercase hover:text-background transition-colors">Terms</Link>
            <span className="text-[10px] text-background/60 tracking-widest uppercase">TEAM PERFORMANCE / NOT WELLNESS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}