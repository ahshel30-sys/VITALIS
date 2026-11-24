import Image from "next/image";
import { facilities, patientServices } from "@/lib/content";

export default function PatientServices() {
  return (
    <section className="section services" id="services" aria-labelledby="services-title">
      <div className="sechead" data-reveal>
        <p className="tag"><span>(06)</span> Patient services</p>
        <h2 className="section-title" id="services-title">Support for<br /><em>every step.</em></h2>
        <p className="sechead__note">A calm, practical layer of services around your visit — described as demonstration information, not an operational promise.</p>
      </div>

      <ol className="services__index">
        {patientServices.map((item, i) => (
          <li key={item.no} data-reveal style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
            <span className="services__no">{item.no}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </li>
        ))}
      </ol>

      <div className="facilities" data-reveal>
        <p className="tag"><span>(+)</span> Healthcare facilities</p>
        <h3 className="facilities__title">Spaces designed<br />to put you at ease.</h3>
        <div className="facilities__grid">
          {facilities.map((item, i) => (
            <figure key={item.title}>
              <div className="facilities__image"><Image src={item.image} alt={item.title} fill sizes="(max-width: 760px) 92vw, 30vw" /></div>
              <figcaption><span>{String(i + 1).padStart(2, "0")}</span><strong>{item.title}</strong><span>{item.text}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
      <p className="demo-strip" data-reveal><span>DEMO</span> Facilities and services are fictional portfolio content.</p>
    </section>
  );
}
