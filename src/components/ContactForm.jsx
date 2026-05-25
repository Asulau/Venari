import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Check } from "lucide-react";
import { base44 } from "@/api/base44Client";

const CAL_LINK = "laurence-idelenburg-ilrsov/30min";
const WEB3FORMS_KEY = "367c2abd-f809-4b72-a64d-a5b153240159";
const JOTFORM_URL = "https://form.jotform.com/261442431810043";

const COUNTRY_CODES = [
  { flag: "🇸🇪", code: "+46", name: "Sweden" },
  { flag: "🇳🇴", code: "+47", name: "Norway" },
  { flag: "🇩🇰", code: "+45", name: "Denmark" },
  { flag: "🇫🇮", code: "+358", name: "Finland" },
  { flag: "🇮🇸", code: "+354", name: "Iceland" },
  { flag: "🇬🇧", code: "+44", name: "United Kingdom" },
  { flag: "🇮🇪", code: "+353", name: "Ireland" },
  { flag: "🇩🇪", code: "+49", name: "Germany" },
  { flag: "🇳🇱", code: "+31", name: "Netherlands" },
  { flag: "🇫🇷", code: "+33", name: "France" },
  { flag: "🇧🇪", code: "+32", name: "Belgium" },
  { flag: "🇪🇸", code: "+34", name: "Spain" },
  { flag: "🇵🇹", code: "+351", name: "Portugal" },
  { flag: "🇮🇹", code: "+39", name: "Italy" },
  { flag: "🇨🇭", code: "+41", name: "Switzerland" },
  { flag: "🇦🇹", code: "+43", name: "Austria" },
  { flag: "🇵🇱", code: "+48", name: "Poland" },
  { flag: "🇪🇪", code: "+372", name: "Estonia" },
  { flag: "🇱🇻", code: "+371", name: "Latvia" },
  { flag: "🇱🇹", code: "+370", name: "Lithuania" },
  { flag: "🇱🇺", code: "+352", name: "Luxembourg" },
  { flag: "🇨🇿", code: "+420", name: "Czechia" },
  { flag: "🇬🇷", code: "+30", name: "Greece" },
  { flag: "🇺🇸", code: "+1", name: "United States / Canada" },
  { flag: "🇦🇪", code: "+971", name: "United Arab Emirates" },
  { flag: "🇦🇺", code: "+61", name: "Australia" },
  { flag: "🇳🇿", code: "+64", name: "New Zealand" },
  { flag: "🇸🇬", code: "+65", name: "Singapore" },
  { flag: "🇮🇳", code: "+91", name: "India" },
  { flag: "🇿🇦", code: "+27", name: "South Africa" },
];

export default function ContactForm({ onClose }) {
  const [form, setForm] = useState({ name: "", countryCode: "+46", phone: "", email: "", interest: "", companyName: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);          // Cal booking confirmed
  const [showJotform, setShowJotform] = useState(false); // optional extra details

  const isCompany = form.interest === "company";

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // After the enquiry is submitted, load the Cal.com inline booking calendar
  // and listen for a successful booking.
  useEffect(() => {
    if (!submitted) return;
    (function (C, A, L) {
      let p = function (a, ar) { a.q.push(ar); };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal; let ar = arguments;
        if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; }
        if (ar[0] === L) {
          const api = function () { p(api, arguments); };
          const namespace = ar[1]; api.q = api.q || [];
          if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); }
          else { p(cal, ar); }
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    window.Cal("init", "intro", { origin: "https://app.cal.com" });
    window.Cal.ns.intro("inline", {
      elementOrSelector: "#cal-inline-embed",
      config: { layout: "month_view" },
      calLink: CAL_LINK,
    });
    window.Cal.ns.intro("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
      cssVarsPerTheme: { light: { "cal-brand": "#5C8E4F", "cal-text": "#1B2418", "cal-bg": "#FBFAF6", "cal-border-subtle": "#D8D4C5" } },
    });
    // When the visitor picks a time, reveal the optional Jotform.
    window.Cal.ns.intro("on", {
      action: "bookingSuccessful",
      callback: () => setBooked(true),
    });
  }, [submitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const interestLabel = isCompany ? "Company Matching" : "Personal Matching";
    try {
      if (WEB3FORMS_KEY) {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: `New enquiry, ${interestLabel}`,
            from_name: form.name || "Website enquiry",
            name: form.name, email: form.email,
            phone: `${form.countryCode} ${form.phone}`,
            interest: interestLabel,
            company: isCompany ? form.companyName : "",
          }),
        });
      } else {
        await base44.integrations.Core.SendEmail({
          to: "David@vitality.training",
          subject: `New enquiry, ${interestLabel}`,
          body: `Name: ${form.name}\nPhone: ${form.countryCode} ${form.phone}\nEmail: ${form.email}\nInterest: ${interestLabel}\n${isCompany ? `Company: ${form.companyName}` : ""}`.trim(),
        });
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitted(true);
    }
    setLoading(false);
  };

  const inputCls = "w-full bg-muted border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors";

  const modal = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.3 }}
        className={`relative bg-background border border-border rounded-sm shadow-2xl w-full p-8 max-h-[92vh] overflow-y-auto transition-[max-width] duration-300 ${submitted ? "max-w-3xl" : "max-w-md"}`}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10">
          <X className="w-4 h-4" />
        </button>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div key="success" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 shrink-0 rounded-full bg-primary/15 flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-light text-foreground leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {booked ? "Your intro call is booked." : "Message received."}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {booked
                      ? "One optional step below helps your coach match come prepared."
                      : "Now pick a time below, your intro call is confirmed instantly."}
                  </p>
                </div>
              </div>

              {/* Cal calendar — stays mounted; hidden once booked */}
              <div id="cal-inline-embed" style={{ width: "100%", minHeight: 560, overflow: "auto", display: booked ? "none" : "block" }} />

              {/* Optional Jotform — only after a booking is made */}
              {booked && (
                <div className="flex flex-col gap-4">
                  {!showJotform ? (
                    <div className="rounded-sm border border-border bg-muted/50 p-5 flex flex-col sm:flex-row sm:items-center gap-3">
                      <p className="text-sm text-muted-foreground flex-1 leading-relaxed">
                        Optional: a few more details about your goals make the first call sharper. Takes about two minutes.
                      </p>
                      <button onClick={() => setShowJotform(true)}
                        className="shrink-0 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 text-[10px] font-medium tracking-widest uppercase rounded-sm hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                        Add details <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="rounded-sm overflow-hidden border border-border">
                      <iframe
                        title="Optional intake details"
                        src={JOTFORM_URL}
                        style={{ width: "100%", minHeight: 620, border: "0" }}
                        scrolling="auto"
                      />
                    </div>
                  )}
                  <button onClick={onClose} className="self-center text-[10px] tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">
                    {showJotform ? "Done" : "Skip and close"}
                  </button>
                </div>
              )}

              {!booked && (
                <button onClick={onClose} className="self-center text-[10px] tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">
                  Close
                </button>
              )}
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">Get in touch</p>
                <h3 className="text-2xl font-light text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Tell us about yourself.
                </h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Share a few details and you can book your intro call right after.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <input required type="text" placeholder="Full name" value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inputCls} />
                <input required type="email" placeholder="Email address" value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={inputCls} />
                <div className="flex gap-2">
                  <select aria-label="Country code" value={form.countryCode}
                    onChange={e => setForm(f => ({ ...f, countryCode: e.target.value }))}
                    className="shrink-0 bg-muted border border-border rounded-sm px-3 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors">
                    {COUNTRY_CODES.map(c => (<option key={c.code + c.name} value={c.code}>{c.flag} {c.code}</option>))}
                  </select>
                  <input type="tel" placeholder="Phone number" value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="flex-1 min-w-0 bg-muted border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {["personal", "company"].map(opt => (
                    <button key={opt} type="button" onClick={() => setForm(f => ({ ...f, interest: opt }))}
                      className={`py-3 px-4 text-xs tracking-wide rounded-sm border transition-all duration-200 ${form.interest === opt ? "bg-foreground border-foreground text-background" : "bg-card border-border text-foreground hover:border-primary/50"}`}>
                      {opt === "personal" ? "Personal matching" : "Company matching"}
                    </button>
                  ))}
                </div>
                <AnimatePresence>
                  {isCompany && (
                    <motion.input initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                      required type="text" placeholder="Company name" value={form.companyName}
                      onChange={e => setForm(f => ({ ...f, companyName: e.target.value }))} className={inputCls} />
                  )}
                </AnimatePresence>
              </div>
              <p className="text-[11px] leading-relaxed text-muted-foreground">
                By submitting, you agree to our{" "}
                <Link to="/privacy" onClick={onClose} className="underline hover:text-foreground">Privacy Policy</Link>.
                We use your details only to respond to your enquiry.
              </p>
              <button type="submit" disabled={loading || !form.interest}
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-[11px] tracking-widest uppercase font-medium rounded-sm hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0">
                {loading ? "Sending..." : "Continue to booking"} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );

  return createPortal(modal, document.body);
}
