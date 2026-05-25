import { Link } from "react-router-dom";
import Seo from "@/components/Seo";

const UPDATED = "May 2026";

export default function Terms() {
  return (
    <div className="bg-background text-foreground min-h-screen pt-32 pb-24">
      <Seo title="Terms of Use, Vitality" description="The terms governing use of the Vitality website, operated by Arenzo." path="/terms" />
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-4">Legal</p>
        <h1 className="text-[clamp(40px,6vw,72px)] font-light leading-[1.05] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Terms of Use
        </h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: {UPDATED}</p>
        <div className="rounded-sm border border-primary/30 bg-primary/5 px-5 py-4 mb-12">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Template notice.</strong> These terms are a
            starting point and have not been reviewed by a lawyer. Have them checked by a
            qualified advisor before relying on them.
          </p>
        </div>
        <div className="flex flex-col gap-8 text-[15px] leading-relaxed text-foreground/80">
          <section>
            <h2 className="text-2xl font-light text-foreground mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>About this site</h2>
            <p>This website is operated by Arenzo for its project Vitality. It describes a
            coaching-matching service and lets you make an enquiry. Using the site means you
            accept these terms.</p>
          </section>
          <section>
            <h2 className="text-2xl font-light text-foreground mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>No guarantee of outcome</h2>
            <p>Information on this site is provided in good faith for general information. It
            is not health, medical, or fitness advice. Any coaching engagement is subject to
            a separate agreement, and individual results vary.</p>
          </section>
          <section>
            <h2 className="text-2xl font-light text-foreground mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Enquiries and booking</h2>
            <p>Submitting the contact form is an enquiry, not a binding agreement. Booking an
            intro call through the calendar simply reserves a time to talk.</p>
          </section>
          <section>
            <h2 className="text-2xl font-light text-foreground mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Intellectual property</h2>
            <p>The Vitality name, branding, text, and design on this site belong to Arenzo
            and may not be reused without permission.</p>
          </section>
          <section>
            <h2 className="text-2xl font-light text-foreground mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Contact</h2>
            <p>Questions about these terms: <a className="text-[#2c4a25] underline" href="mailto:David@vitality.training">David@vitality.training</a>.</p>
          </section>
        </div>
        <div className="mt-14 pt-8 border-t border-border">
          <Link to="/" className="text-[10px] tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">Back to home</Link>
        </div>
      </div>
    </div>
  );
}
