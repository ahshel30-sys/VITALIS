import Image from "next/image";

const pillars = [
  { title: "Patient-centered care", text: "We start with the person, not the appointment type. Time is set aside for questions, context and clear answers." },
  { title: "Experienced professionals", text: "A fictional team of specialists presented as portfolio content — approachable, careful and genuinely interested." },
  { title: "Modern facilities", text: "Quiet rooms, natural light and considered details that make a clinical visit feel less clinical." },
];

export default function Trust() {
  return (
    <section className="section statement" id="about" aria-labelledby="statement-title">
      <div className="sechead" data-reveal>
        <p className="tag"><span>(02)</span> About us</p>
        <h2 className="section-title" id="statement-title">Your health.<br /><em>Our priority.</em></h2>
        <p className="sechead__note">Healthcare should feel personal, accessible and reassuring. Our approach places patients at the center of every interaction.</p>
      </div>

      <div className="statement__body">
        <div className="statement__main">
          <p className="statement__text" data-reveal>Healthcare should feel <mark>personal</mark>, <mark>accessible</mark> and <mark>reassuring</mark>. We make the complicated parts clear — and leave room for the conversation that matters.</p>
          <figure className="statement__image" data-reveal>
            <Image src="/images/trust.webp" alt="A clinician speaking warmly with a patient" fill sizes="(max-width: 900px) 92vw, 38vw" />
            <figcaption>Care, explained in plain language.</figcaption>
          </figure>
        </div>
        <div className="statement__cols">
          {pillars.map((pillar, i) => (
            <article key={pillar.title} data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="statement__footer" data-reveal>
        <p className="tag"><span>(+)</span> Convenient scheduling</p>
        <p>Choose a department, pick a doctor and reserve a demo time in a few calm steps. No calls, no waiting on hold, no real medical data collected.</p>
        <a className="text-link" href="#booking">Start the demo booking flow <ArrowLink /></a>
      </div>
    </section>
  );
}

function ArrowLink() {
  return <span aria-hidden="true">↗</span>;
}
