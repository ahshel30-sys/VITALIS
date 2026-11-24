"use client";

import { useState } from "react";
import { journey, testimonials } from "@/lib/content";

export default function Journey() {
  const [active, setActive] = useState(0);
  const [quote, setQuote] = useState(0);
  const testimonial = testimonials[quote];

  return (
    <section className="section journey" aria-labelledby="journey-title">
      <div className="sechead" data-reveal>
        <p className="tag"><span>(07)</span> Patient journey</p>
        <h2 className="section-title" id="journey-title">Care, made <em>simple.</em></h2>
        <p className="sechead__note">Five clear steps. Select one to see what happens next.</p>
      </div>

      <div className="journey__flow" data-reveal>
        <div className="journey__line"><span style={{ width: `${(active / (journey.length - 1)) * 100}%` }} /></div>
        <ol>
          {journey.map((step, i) => (
            <li key={step.no} className={i === active ? "is-active" : ""}>
              <button type="button" onClick={() => setActive(i)} aria-pressed={i === active}>
                <span className="journey__dot" aria-hidden="true" />
                <span className="tag">{step.no}</span>
                <strong>{step.title}</strong>
              </button>
            </li>
          ))}
        </ol>
        <div className="journey__detail" key={active} role="status" aria-live="polite">
          <p className="tag">Step {journey[active].no}</p>
          <p>{journey[active].text}</p>
        </div>
      </div>

      <div className="testimonials" data-reveal>
        <div>
          <p className="tag"><span>(08)</span> In their words</p>
          <h3>A few notes from<br /><em>imagined patients.</em></h3>
          <p className="testimonials__note">All testimonials are fictional sample content for this portfolio.</p>
          <div className="testimonials__people" role="group" aria-label="Choose a sample impression">
            {testimonials.map((item, i) => (
              <button key={item.name} type="button" className={quote === i ? "is-active" : ""} aria-pressed={quote === i} onClick={() => setQuote(i)}>{item.name}</button>
            ))}
          </div>
        </div>
        <figure key={quote} className="testimonials__quote">
          <blockquote>“{testimonial.quote}”</blockquote>
          <figcaption>{testimonial.name} · {testimonial.detail}</figcaption>
        </figure>
      </div>
    </section>
  );
}
