"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { articles, faqs } from "@/lib/content";

const bodies = [
  "A general overview of everyday routines — regular movement, balanced meals, adequate rest and not smoking — that are commonly discussed as part of heart health. This is not personalised advice; speak with a qualified clinician about your own circumstances.",
  "Checkups are often a chance to talk about how you feel, review general wellbeing and ask questions before something becomes urgent. This preview is general information only and does not recommend any specific test or treatment.",
  "Sleep affects how we feel, focus and recover. This article discusses general sleep habits and why a consistent routine can matter. It is informational and does not diagnose or treat any condition.",
];

export default function Insights() {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const article = active !== null ? articles[active] : null;

  const close = () => { setActive(null); if (dialogRef.current?.open) dialogRef.current.close(); };

  return (
    <section className="section insights" aria-labelledby="insights-title">
      <div className="sechead" data-reveal>
        <p className="tag"><span>(09)</span> Healthcare insights</p>
        <h2 className="section-title" id="insights-title">Ideas worth<br /><em>reading slowly.</em></h2>
        <p className="sechead__note">General informational previews, written for this portfolio concept. No personalised medical advice.</p>
      </div>

      <div className="insights__grid">
        {articles.map((item, i) => (
          <article key={item.title} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
            <div className="insights__image"><Image src={item.image} alt={item.title} fill sizes="(max-width: 800px) 92vw, 30vw" /></div>
            <p className="tag"><span>{item.category}</span> {item.time}</p>
            <h3>{item.title}</h3>
            <p className="insights__intro">{item.intro}</p>
            <button className="text-link" type="button" onClick={() => { setActive(i); requestAnimationFrame(() => dialogRef.current?.showModal()); }}>Read overview <span aria-hidden="true">↗</span></button>
          </article>
        ))}
      </div>

      <div className="faq" data-reveal>
        <div>
          <p className="tag"><span>(10)</span> Questions</p>
          <h2 className="section-title">Good to <em>know.</em></h2>
          <p className="faq__note">Answers relate to this demonstration website, not to a real medical facility.</p>
        </div>
        <div className="faq__list">
          {faqs.map((item) => (
            <details key={item.q}>
              <summary>{item.q}<span aria-hidden="true" /></summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>

      <dialog ref={dialogRef} className="article-dialog" onCancel={(e) => { e.preventDefault(); close(); }} onClick={(e) => { if (e.target === dialogRef.current) close(); }} aria-label={article ? article.title : "Article overview"}>
        {article ? (
          <div className="article-dialog__inner">
            <button type="button" className="dialog-close" onClick={close} aria-label="Close article"><X size={20} /></button>
            <p className="tag"><span>{article.category}</span> {article.time} · Demo article</p>
            <h2>{article.title}</h2>
            <div className="article-dialog__image"><Image src={article.image} alt={article.title} fill sizes="80vw" /></div>
            <p>{article.intro}</p>
            <p>{bodies[active ?? 0]}</p>
            <p className="demo-strip"><span>DEMO</span> General informational content only — not medical advice.</p>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
