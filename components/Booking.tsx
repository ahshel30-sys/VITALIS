"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { doctors, specialties, timeSlots } from "@/lib/content";
import { bookingReference, formatDate, persistBookingSummary, todayISO, validateBookingPart, type Booking, type Errors } from "@/lib/forms";

const steps = ["Specialty", "Doctor", "Date", "Time", "Details", "Confirmation"];
const empty: Booking = { specialty: "", doctor: "", date: "", time: "", name: "", phone: "", email: "", notes: "" };

export default function Booking() {
  const [values, setValues] = useState<Booking>(empty);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [reference, setReference] = useState("");
  const dateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const specialty = sessionStorage.getItem("vitalis:selectedSpecialty") || "";
    const doctor = sessionStorage.getItem("vitalis:selectedDoctor") || "";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (specialty || doctor) setValues((v) => ({ ...v, specialty, doctor }));
    if (dateRef.current) dateRef.current.min = todayISO();
  }, []);

  const set = (field: keyof Booking, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => {
      if (!e[field]) return e;
      const next = { ...e };
      delete next[field];
      return next;
    });
    if (field === "specialty") setValues((v) => ({ ...v, specialty: value, doctor: "" }));
  };

  const selectedSpecialty = specialties.find((s) => s.id === values.specialty);
  const availableDoctors = doctors.filter((d) => !values.specialty || d.specialtyId === values.specialty);
  const selectedDoctor = doctors.find((d) => d.id === values.doctor);

  const next = () => {
    const found = validateBookingPart(step, values);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document.getElementById(`booking-${first}`)?.focus();
      return;
    }
    setStep((s) => Math.min(6, s + 1));
  };

  const back = () => { setErrors({}); setStep((s) => Math.max(1, s - 1)); };

  const submit = async () => {
    setStatus("submitting");
    try {
      await new Promise((r) => setTimeout(r, 900));
      const ref = bookingReference();
      persistBookingSummary(values, ref);
      setReference(ref);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setValues(empty); setStep(1); setErrors({}); setReference(""); setStatus("idle");
    sessionStorage.removeItem("vitalis:selectedSpecialty");
    sessionStorage.removeItem("vitalis:selectedDoctor");
  };

  return (
    <section className="section booking" id="booking" aria-labelledby="booking-title">
      <div className="sechead" data-reveal>
        <p className="tag"><span>(05)</span> Appointments</p>
        <h2 className="section-title" id="booking-title">A simpler way<br /><em>to book care.</em></h2>
        <p className="sechead__note">A six-step demonstration flow. No patient information is transmitted or stored with sensitive details.</p>
      </div>

      <div className="booking__layout" data-reveal>
        <aside className="booking__rail">
          <p className="tag"><span>Flow</span> 06 steps</p>
          <ol>
            {steps.map((label, i) => {
              const n = i + 1;
              return (
                <li key={label} className={n === step ? "is-active" : n < step ? "is-done" : ""} aria-current={n === step ? "step" : undefined}>
                  <button type="button" onClick={() => { if (n < step) { setErrors({}); setStep(n); } }} disabled={n > step}>
                    <span>{String(n).padStart(2, "0")}</span>
                    <span>{label}</span>
                    {n < step ? <Check size={13} aria-hidden="true" /> : null}
                  </button>
                </li>
              );
            })}
          </ol>
          <p className="demo-strip"><span>DEMO</span> Not a real medical appointment.</p>
        </aside>

        <div className="booking__panel">
          <div className="booking__progress" aria-hidden="true"><span style={{ width: `${(step / 6) * 100}%` }} /></div>
          <p className="tag booking__stage">Step {String(step).padStart(2, "0")} / 06 — {steps[step - 1]}</p>

          {status === "success" ? (
            <div className="booking__done" role="status" aria-live="polite">
              <span className="booking__done-icon"><Check size={24} /></span>
              <h3>Your request is noted.</h3>
              <p>Thank you, {values.name.split(" ")[0]}. This is a portfolio demonstration — no appointment has been created and nothing was sent to a medical center.</p>
              <dl className="booking__summary">
                <div><dt>Reference</dt><dd>{reference}</dd></div>
                <div><dt>Specialty</dt><dd>{selectedSpecialty?.name}</dd></div>
                <div><dt>Doctor</dt><dd>{selectedDoctor?.name}</dd></div>
                <div><dt>Date</dt><dd>{formatDate(values.date)}</dd></div>
                <div><dt>Time</dt><dd>{values.time}</dd></div>
              </dl>
              <p className="demo-strip"><span>DEMO</span> Only a non-sensitive summary was saved in your browser.</p>
              <button className="btn btn--line" type="button" onClick={reset}>Start a new demo request</button>
            </div>
          ) : (
            <>
              {step === 1 ? (
                <div className="booking__choices" role="group" aria-label="Select a specialty">
                  {specialties.map((s, i) => (
                    <button key={s.id} id={s.id === values.specialty ? "booking-specialty" : undefined} type="button" className={`choice ${values.specialty === s.id ? "is-selected" : ""}`} aria-pressed={values.specialty === s.id} onClick={() => set("specialty", s.id)}>
                      <span>0{i + 1}</span><strong>{s.name}</strong><small>{s.focus[0]}</small>
                    </button>
                  ))}
                </div>
              ) : null}

              {step === 2 ? (
                <div className="booking__choices" role="group" aria-label="Select a doctor">
                  {availableDoctors.map((d, i) => (
                    <button key={d.id} id={d.id === values.doctor ? "booking-doctor" : undefined} type="button" className={`choice choice--doctor ${values.doctor === d.id ? "is-selected" : ""}`} aria-pressed={values.doctor === d.id} onClick={() => set("doctor", d.id)}>
                      <span>0{i + 1}</span><strong>{d.name}</strong><small>{d.specialty}</small>
                    </button>
                  ))}
                  {!availableDoctors.length ? <p>No demo doctors are listed for this specialty. Please go back and choose another.</p> : null}
                </div>
              ) : null}

              {step === 3 ? (
                <div className="booking__field">
                  <label htmlFor="booking-date">Preferred date</label>
                  <input ref={dateRef} id="booking-date" type="date" value={values.date} onChange={(e) => set("date", e.target.value)} aria-invalid={Boolean(errors.date)} aria-describedby={errors.date ? "booking-date-error" : undefined} />
                  {errors.date ? <p className="field-error" id="booking-date-error">{errors.date}</p> : null}
                  <p className="hint">Demo availability is illustrative. Choose any date from today onward.</p>
                </div>
              ) : null}

              {step === 4 ? (
                <div className="booking__slots" role="group" aria-label="Select a time">
                  {timeSlots.map((time) => (
                    <button key={time} id={time === values.time ? "booking-time" : undefined} type="button" className={`slot ${values.time === time ? "is-selected" : ""}`} aria-pressed={values.time === time} onClick={() => set("time", time)}>{time}</button>
                  ))}
                </div>
              ) : null}

              {step === 5 ? (
                <div className="booking__form">
                  <div className="booking__review">
                    <p className="tag"><span>✓</span> Selected</p>
                    <p>{selectedSpecialty?.name} · {selectedDoctor?.name} · {formatDate(values.date)} · {values.time}</p>
                  </div>
                  <div className={`booking__field ${errors.name ? "has-error" : ""}`}>
                    <label htmlFor="booking-name">Full name</label>
                    <input id="booking-name" value={values.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" placeholder="Your name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "booking-name-error" : undefined} />
                    {errors.name ? <p className="field-error" id="booking-name-error">{errors.name}</p> : null}
                  </div>
                  <div className={`booking__field ${errors.phone ? "has-error" : ""}`}>
                    <label htmlFor="booking-phone">Phone number</label>
                    <input id="booking-phone" type="tel" value={values.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" placeholder="+1 212 555 0000" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "booking-phone-error" : undefined} />
                    {errors.phone ? <p className="field-error" id="booking-phone-error">{errors.phone}</p> : null}
                  </div>
                  <div className={`booking__field ${errors.email ? "has-error" : ""}`}>
                    <label htmlFor="booking-email">Email</label>
                    <input id="booking-email" type="email" value={values.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" placeholder="you@example.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "booking-email-error" : undefined} />
                    {errors.email ? <p className="field-error" id="booking-email-error">{errors.email}</p> : null}
                  </div>
                  <div className="booking__field">
                    <label htmlFor="booking-notes">Additional notes (optional)</label>
                    <textarea id="booking-notes" rows={3} maxLength={500} value={values.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Anything you would like us to know — please do not include sensitive medical details." aria-invalid={Boolean(errors.notes)} aria-describedby={errors.notes ? "booking-notes-error" : undefined} />
                    {errors.notes ? <p className="field-error" id="booking-notes-error">{errors.notes}</p> : null}
                  </div>
                  <p className="demo-strip"><span>PRIVACY</span> Do not enter real medical information. Notes are never stored.</p>
                </div>
              ) : null}

              {step === 6 ? (
                <div className="booking__confirm">
                  <h3>Review your demo request</h3>
                  <dl className="booking__summary">
                    <div><dt>Specialty</dt><dd>{selectedSpecialty?.name}</dd></div>
                    <div><dt>Doctor</dt><dd>{selectedDoctor?.name}</dd></div>
                    <div><dt>Date</dt><dd>{formatDate(values.date)}</dd></div>
                    <div><dt>Time</dt><dd>{values.time}</dd></div>
                    <div><dt>Patient</dt><dd>{values.name}</dd></div>
                    <div><dt>Contact</dt><dd>{values.email}</dd></div>
                  </dl>
                  {status === "error" ? <p className="form-alert" role="alert"><AlertCircle size={15} /> Could not save the demo summary in your browser. Please try again.</p> : null}
                  <p className="demo-strip"><span>DEMO</span> Submitting does not create a real appointment.</p>
                </div>
              ) : null}

              <div className="booking__actions">
                {step > 1 ? <button type="button" className="btn btn--line" onClick={back} disabled={status === "submitting"}><ArrowLeft size={14} /> Previous</button> : <span />}
                {step < 6 ? (
                  <button type="button" className="btn btn--dark" onClick={next}>Continue <ArrowRight size={14} /></button>
                ) : (
                  <button type="button" className="btn btn--dark" onClick={submit} disabled={status === "submitting"}>
                    {status === "submitting" ? <><Loader2 className="spin" size={14} /> Saving demo…</> : <>Confirm demo request <Check size={14} /></>}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
