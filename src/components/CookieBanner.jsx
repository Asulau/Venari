import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try { if (!localStorage.getItem("vitality_cookie_ack")) setShow(true); }
    catch { setShow(true); }
  }, []);
  const accept = () => {
    try { localStorage.setItem("vitality_cookie_ack", "1"); } catch {}
    setShow(false);
  };
  if (!show) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] p-4 sm:p-6">
      <div className="max-w-3xl mx-auto bg-foreground text-background border border-background/15 rounded-sm shadow-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <p className="text-xs leading-relaxed text-background/80 flex-1">
          This site keeps things minimal: no marketing or analytics cookies. If you open the
          booking calendar, Cal.com may set cookies needed to schedule a call. See our{" "}
          <Link to="/privacy" className="underline text-background hover:text-primary">Privacy Policy</Link>.
        </p>
        <button onClick={accept}
          className="shrink-0 bg-primary text-primary-foreground px-5 py-2.5 text-[10px] font-medium tracking-widest uppercase rounded-sm hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
          Got it
        </button>
      </div>
    </div>
  );
}
