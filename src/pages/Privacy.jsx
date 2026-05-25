import { Link } from "react-router-dom";
import Seo from "@/components/Seo";

const UPDATED = "May 2026";

export default function Privacy() {
  return (
    <div className="bg-background text-foreground min-h-screen pt-32 pb-24">
      <Seo title="Privacy Policy, Vitality" description="How Vitality, a project by Arenzo, collects, uses and protects your personal data." path="/privacy" />
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-4">Legal</p>
        <h1 className="text-[clamp(40px,6vw,72px)] font-light leading-[1.05] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Privacy Policy
        </h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: {UPDATED}</p>
        <div className="rounded-sm border border-primary/30 bg-primary/5 px-5 py-4 mb-12">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Template notice.</strong> This policy is a
            starting point and has not been reviewed by a lawyer. Have it checked by a
            qualified advisor before relying on it.
          </p>
        </div>
        <div className="flex flex-col gap-8 text-[15px] leading-relaxed text-foreground/80">
          <section>
            <h2 className="text-2xl font-light text-foreground mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Who we are</h2>
            <p>Vitality is a coaching-matching project operated by Arenzo. Vitality is a brand
            and project, not a separately registered company. For any question about this
            policy or your data, contact us at <a className="text-[#2c4a25] underline" href="mailto:David@vitality.training">David@vitality.training</a>.</p>
          </section>
          <section>
            <h2 className="text-2xl font-light text-foreground mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>What we collect</h2>
            <p>When you use our contact form we collect the details you provide: your name,
            email address, phone number, whether your enquiry is personal or for a company,
            and (if applicable) your company name. We do not collect special-category data.</p>
          </section>
          <section>
            <h2 className="text-2xl font-light text-foreground mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Why we use it, and the legal basis</h2>
            <p>We use your details only to respond to your enquiry and arrange an intro call.
            The legal basis is your consent and our taking steps at your request prior to a
            possible engagement. We do not use your details for unrelated marketing.</p>
          </section>
          <section>
            <h2 className="text-2xl font-light text-foreground mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Service providers</h2>
            <p>We rely on a small number of processors to run this site: Web3Forms (delivers
            contact-form submissions to our inbox), Cal.com (scheduling of intro calls),
            Jotform (optional intake details), and Vercel (website hosting). Each processes
            data on our behalf under their own terms.</p>
          </section>
          <section>
            <h2 className="text-2xl font-light text-foreground mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Cookies</h2>
            <p>The site itself sets no marketing cookies. If you open the booking calendar
            after submitting the form, Cal.com may set cookies needed for scheduling. Fonts
            are served from our own domain, so no font data is shared with third parties.</p>
          </section>
          <section>
            <h2 className="text-2xl font-light text-foreground mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Retention</h2>
            <p>We keep enquiry details only as long as needed to handle your request and any
            engagement that follows, then delete them.</p>
          </section>
          <section>
            <h2 className="text-2xl font-light text-foreground mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Your rights</h2>
            <p>Under the GDPR you can request access to, correction of, or deletion of your
            data, object to processing, or withdraw consent at any time. To exercise any of
            these, email <a className="text-[#2c4a25] underline" href="mailto:David@vitality.training">David@vitality.training</a>.
            You may also complain to your local data-protection authority.</p>
          </section>
        </div>
        <div className="mt-14 pt-8 border-t border-border">
          <Link to="/" className="text-[10px] tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">Back to home</Link>
        </div>
      </div>
    </div>
  );
}
