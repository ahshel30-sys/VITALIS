"use client";

import { useState } from "react";
import { AlertCircle, ArrowUpRight, Check, Clock, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/content";
import { persistDemo, validateContact } from "@/lib/forms";

const mapHref = `https://www.openstreetmap.org/?mlat=${site.coordinates.lat}&mlon=${site.coordinates.lng}#map=16/${site.coordinates.lat}/${site.coordinates.lng}`;

export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const set = (field: "name" | "email" | "message", value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => { if (!e[field]) return e; const n = { ...e }; delete n[field]; return n; });
    if (status === "error") setStatus("idle");
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`contact-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    setStatus("submitting");
    try {
      await new Promise((r) => setTimeout(r, 800));
      persistDemo("vitalis:messages", { name: values.name, email: values.email, message: values.message, createdAt: new Date().toISOString() });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="sechead" data-reveal>
        <p className="tag"><span>(11)</span> Contact</p>
        <h2 className="section-title" id="contact-title">Come say <em>hello.</em></h2>
        <p className="sechead__note">All contact details below are fictional demonstration information.</p>
      </div>

      <div className="contact__layout">
        <div className="contact__details" data-reveal>
          <div><MapPin size={16} /><div><p className="tag">Address — demo</p><address>{site.address.line1}<br />{site.address.line2}<br />United States</address></div></div>
          <div><Phone size={16} /><div><p className="tag">Telephone — sample</p><p><a href={site.phoneHref}>{site.phone}</a></p></div></div>
          <div><Mail size={16} /><div><p className="tag">Email — demo</p><p><a href={`mailto:${site.email}`}>{site.email}</a></p></div></div>
          <div><Clock size={16} /><div><p className="tag">Opening hours — demo</p><dl>{site.hours.map((h) => <div key={h.label}><dt>{h.label}</dt><dd>{h.value}</dd></div>)}</dl></div></div>
        </div>

        <div className="contact__form" data-reveal>
          {status === "success" ? (
            <div className="contact__done" role="status" aria-live="polite">
              <span><Check size={22} /></span>
              <h3>Message saved.</h3>
              <p>Thank you, {values.name.split(" ")[0]}. Your message was stored locally for this demonstration — nothing was sent.</p>
              <button className="btn btn--line" type="button" onClick={() => { setValues({ name: "", email: "", message: "" }); setStatus("idle"); }}>Write another message</button>
            </div>
          ) : (
            <>
              {status === "error" ? <p className="form-alert" role="alert"><AlertCircle size={15} /> Could not save in this browser. Try again or email the demo address.</p> : null}
              <form onSubmit={submit} noValidate aria-busy={status === "submitting"}>
                <div className={`field ${errors.name ? "has-error" : ""}`}>
                  <label htmlFor="contact-name">Name</label>
                  <input id="contact-name" value={values.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" placeholder="Your name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} />
                  {errors.name ? <p className="field-error" id="contact-name-error">{errors.name}</p> : null}
                </div>
                <div className={`field ${errors.email ? "has-error" : ""}`}>
                  <label htmlFor="contact-email">Email</label>
                  <input id="contact-email" type="email" value={values.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" placeholder="you@example.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} />
                  {errors.email ? <p className="field-error" id="contact-email-error">{errors.email}</p> : null}
                </div>
                <div className={`field field--wide ${errors.message ? "has-error" : ""}`}>
                  <label htmlFor="contact-message">Message</label>
                  <textarea id="contact-message" rows={4} value={values.message} onChange={(e) => set("message", e.target.value)} placeholder="How can we help?" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} />
                  {errors.message ? <p className="field-error" id="contact-message-error">{errors.message}</p> : null}
                </div>
                <button className="btn btn--dark" type="submit" disabled={status === "submitting"}>
                  {status === "submitting" ? <><Loader2 className="spin" size={14} /> Sending…</> : <>Send message <ArrowUpRight size={14} /></>}
                </button>
                <p className="demo-strip"><span>DEMO</span> Stored in your browser only.</p>
              </form>
            </>
          )}
        </div>
      </div>

      <div className="map" data-reveal>
        <svg viewBox="0 0 1200 460" role="img" aria-labelledby="map-title map-desc" preserveAspectRatio="xMidYMid slice">
          <title id="map-title">Illustrative demo map for VITALIS Medical Center</title>
          <desc id="map-desc">A stylised fictional map showing a marker on Riverside Avenue. This is not a live map.</desc>
          <rect width="1200" height="460" fill="#eef3f0" />
          <g stroke="#d4e0da" strokeWidth="1">{Array.from({ length: 24 }, (_, i) => <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="460" />)}{Array.from({ length: 10 }, (_, i) => <line key={`h${i}`} x1="0" y1={i * 50} x2="1200" y2={i * 50} />)}</g>
          <path d="M0 360 C220 330 340 400 560 360 C780 320 960 380 1200 330 L1200 460 L0 460 Z" fill="#dbeae4" />
          <path d="M0 120 C240 100 420 160 640 120 C860 80 1020 130 1200 90" fill="none" stroke="#2f7d73" strokeWidth="8" opacity="0.35" />
          <path d="M300 0 L420 460 M820 0 L700 460" fill="none" stroke="#c7d6cf" strokeWidth="18" />
          <g transform="translate(600 230)">
            <circle r="46" fill="none" stroke="#2f7d73" strokeWidth="1" opacity="0.5" />
            <circle r="22" fill="none" stroke="#2f7d73" strokeWidth="1" />
            <circle r="5" fill="#2f7d73" />
            <text x="0" y="-58" textAnchor="middle" fill="#123b38" fontSize="14" fontFamily="monospace" letterSpacing="3">VITALIS</text>
          </g>
          <text x="40" y="430" fill="#7a8d85" fontSize="11" fontFamily="monospace" letterSpacing="3">ILLUSTRATIVE DEMO MAP · NOT A LIVE LOCATION</text>
        </svg>
        <div className="map__card">
          <p className="tag"><span>Demo</span> Fictional location</p>
          <p>{site.address.line1}, {site.address.line2}</p>
          <a className="text-link" href={mapHref} target="_blank" rel="noreferrer">Open coordinates in OpenStreetMap <ArrowUpRight size={13} /></a>
        </div>
      </div>
    </section>
  );
}
