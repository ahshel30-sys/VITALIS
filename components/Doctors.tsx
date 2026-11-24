"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { doctors, type Doctor } from "@/lib/content";

export default function Doctors() {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggers = useRef<Array<HTMLButtonElement | null>>([]);
  const doctor = active !== null ? doctors[active] : null;

  const close = useCallback(() => {
    const trigger = active !== null ? triggers.current[active] : null;
    setActive(null);
    setTimeout(() => trigger?.focus(), 20);
  }, [active]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active === null) { if (dialog.open) dialog.close(); return; }
    if (!dialog.open) dialog.showModal();
    requestAnimationFrame(() => closeRef.current?.focus());
  }, [active]);

  const choose = (item: Doctor, index: number) => {
    sessionStorage.setItem("vitalis:selectedDoctor", item.id);
    sessionStorage.setItem("vitalis:selectedSpecialty", item.specialtyId);
    close();
    setTimeout(() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" }), 30);
    void index;
  };

  return (
    <section className="section doctors" id="doctors" aria-labelledby="doctors-title">
      <div className="sechead" data-reveal>
        <p className="tag"><span>(04)</span> Medical team</p>
        <h2 className="section-title" id="doctors-title">The people<br /><em>behind the care.</em></h2>
        <p className="sechead__note">Six fictional profiles created for this portfolio. Select a doctor to open their profile.</p>
      </div>

      <div className="doctors__grid">
        {doctors.map((item, i) => (
          <article className="doctor" key={item.id} data-reveal style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
            <button
              type="button"
              className="doctor__open"
              ref={(node) => { triggers.current[i] = node; }}
              onClick={() => setActive(i)}
              aria-label={`Open profile for ${item.name}`}
            >
              <span className="doctor__photo"><Image src={item.image} alt={`Portrait of ${item.name}`} fill sizes="(max-width: 700px) 90vw, 30vw" /></span>
              <span className="doctor__meta">
                <span className="tag">0{i + 1} · {item.specialty}</span>
                <span className="doctor__name">{item.name}</span>
                <span className="doctor__availability">{item.availability.join(" · ")}</span>
              </span>
              <span className="doctor__arrow" aria-hidden="true"><ArrowUpRight size={16} /></span>
            </button>
          </article>
        ))}
      </div>

      <p className="demo-strip" data-reveal><span>DEMO</span> All doctors, biographies and availability are fictional portfolio content.</p>

      <dialog ref={dialogRef} className="profile-dialog" aria-label={doctor ? `${doctor.name} profile` : "Doctor profile"} onCancel={(e) => { e.preventDefault(); close(); }} onClick={(e) => { if (e.target === dialogRef.current) close(); }}>
        {doctor ? (
          <div className="profile-dialog__inner">
            <button ref={closeRef} type="button" className="dialog-close" onClick={close} aria-label="Close doctor profile"><X size={20} /></button>
            <div className="profile-dialog__photo"><Image src={doctor.image} alt={`Portrait of ${doctor.name}`} fill sizes="40vw" /></div>
            <div className="profile-dialog__body">
              <p className="tag"><span>Profile</span> Fictional demonstration content</p>
              <h2>{doctor.name}</h2>
              <p className="profile-dialog__specialty">{doctor.specialty}</p>
              <p>{doctor.bio}</p>
              <div className="profile-dialog__slots">
                <p className="tag">Sample consultation availability</p>
                <ul>{doctor.availability.map((slot) => <li key={slot}>{slot}</li>)}</ul>
              </div>
              <button type="button" className="btn btn--dark" onClick={() => choose(doctor, active ?? 0)}>Book with this doctor <ArrowUpRight size={14} /></button>
            </div>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
