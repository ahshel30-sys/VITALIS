"use client";

import { useState } from "react";
import { ArrowUp, Check, Loader2 } from "lucide-react";
import { site, specialties, patientServices } from "@/lib/content";
import { persistDemo, validateNewsletter } from "@/lib/forms";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [legal, setLegal] = useState<"privacy" | "terms" | null>(null);

  const subscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = validateNewsletter(email);
    setError(message);
    if (message) return;
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 600));
    persistDemo("vitalis:newsletter", { email, createdAt: new Date().toISOString() });
    setStatus("success");
  };

  return (
    <footer className="footer">
      <div className="footer__top">
        <div>
          <p className="tag"><span>(+)</span> Stay in touch</p>
          <h2>Occasional notes<br />on care &amp; living well.</h2>
        </div>
        <form onSubmit={subscribe} noValidate>
          <label className="sr-only" htmlFor="footer-email">Email address</label>
          <div className="footer__news-row">
            <input id="footer-email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(null); setStatus("idle"); }} placeholder="Your email address" aria-invalid={Boolean(error)} aria-describedby={error ? "footer-email-error" : undefined} />
            <button className="btn btn--paper" type="submit" disabled={status === "submitting"}>{status === "submitting" ? <Loader2 className="spin" size={14} /> : "Subscribe"}</button>
          </div>
          {error ? <p className="field-error" id="footer-email-error">{error}</p> : null}
          {status === "success" ? <p className="footer__ok" role="status"><Check size={12} /> You&apos;re on the list. Demo only — no email sent.</p> : <p className="footer__note">Demo newsletter — stored in your browser only.</p>}
        </form>
      </div>

      <div className="footer__grid">
        <nav aria-label="Footer navigation">
          <p className="tag">Navigate</p>
          <ul>{site.nav.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}<li><a href="#booking">Booking</a></li></ul>
        </nav>
        <div>
          <p className="tag">Specialties</p>
          <ul>{specialties.slice(0, 5).map((s) => <li key={s.id}><a href="#specialties">{s.name}</a></li>)}</ul>
        </div>
        <div>
          <p className="tag">Patient services</p>
          <ul>{patientServices.slice(0, 5).map((s) => <li key={s.no}><a href="#services">{s.title}</a></li>)}</ul>
        </div>
        <div>
          <p className="tag">Contact — demo</p>
          <address>{site.address.line1}<br />{site.address.line2}</address>
          <ul>
            <li><a href={site.phoneHref}>{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            {site.socials.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer">{s.label}</a></li>)}
          </ul>
        </div>
      </div>

      <p className="footer__wordmark" aria-label="VITALIS">VITALIS</p>

      <div className="footer__bottom">
        <p>© 2026 VITALIS Medical Center — fictional portfolio concept. All details are samples.</p>
        <div>
          <button type="button" onClick={() => setLegal("privacy")}>Privacy</button>
          <button type="button" onClick={() => setLegal("terms")}>Terms</button>
          <a href="#home">Back to top <ArrowUp size={12} /></a>
        </div>
      </div>

      <dialog className="legal-dialog" open={Boolean(legal)} onClose={() => setLegal(null)}>
        <div>
          <h2>{legal === "privacy" ? "Privacy — demo notice" : "Terms — demo notice"}</h2>
          <p>
            {legal === "privacy"
              ? "This is a fictional portfolio demonstration. Booking notes and sensitive medical details are never stored or transmitted. Only an optional contact message and newsletter email are saved in your browser's localStorage. No analytics or tracking are used."
              : "All names, doctors, departments, facilities, figures and contact details on this website are fictional demonstration content. No medical services are offered and no appointments are created."}
          </p>
          <button className="btn btn--dark" type="button" onClick={() => setLegal(null)}>Close</button>
        </div>
      </dialog>
    </footer>
  );
}
