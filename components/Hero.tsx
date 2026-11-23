import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero__disc" aria-hidden="true"><span /></div>

      <div className="hero__meta">
        <p className="tag"><span>(01)</span> Introduction</p>
        <p className="hero__lede">Care that moves you forward. A calm, modern medical center built around the people who walk through our doors.</p>
      </div>

      <div className="hero__main">
        <h1 className="hero__title" id="hero-title">
          <span className="line"><span>Better care.</span></span>
          <span className="line"><span>A better <em>you.</em></span></span>
        </h1>

        <figure className="hero__portrait" data-reveal>
          <Image
            src="/images/hero.webp"
            alt="A clinician speaking with a patient in a warm, naturally lit consultation room"
            fill
            priority
            sizes="(max-width: 900px) 90vw, 34vw"
            className="hero__img"
          />
          <figcaption>Every conversation, unhurried.</figcaption>
        </figure>
      </div>

      <div className="hero__bottom">
        <p className="hero__support">Personalized healthcare, experienced specialists, and a patient-first approach designed to make every step of your healthcare journey easier.</p>
        <div className="hero__actions">
          <a className="btn btn--dark" href="#booking">Book an Appointment <ArrowUpRight size={14} /></a>
          <a className="btn btn--line" href="#specialties">Explore Our Specialties</a>
        </div>
        <dl className="hero__facts">
          <div><dt>Founded</dt><dd>2019 · Demo</dd></div>
          <div><dt>Approach</dt><dd>Patient-first</dd></div>
          <div><dt>Location</dt><dd>New York (fictional)</dd></div>
          <div><dt>Booking</dt><dd><span className="pulse" aria-hidden="true" />Demo flow available</dd></div>
        </dl>
      </div>
    </section>
  );
}
