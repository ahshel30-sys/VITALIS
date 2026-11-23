"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { specialties, type Specialty } from "@/lib/content";

const filters = [
  { id: "all", label: "All specialties" },
  { id: "body", label: "Heart & body", ids: ["cardiology", "orthopedics", "neurology"] },
  { id: "everyday", label: "Everyday care", ids: ["internal", "dentistry", "ophthalmology"] },
  { id: "family", label: "Family & skin", ids: ["pediatrics", "dermatology"] },
] as const;

export default function Specialties() {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const [open, setOpen] = useState<string | null>(specialties[0].id);

  const items = useMemo(() => {
    const active = filters.find((f) => f.id === filter);
    if (!active || !("ids" in active)) return specialties;
    return specialties.filter((s) => (active.ids as readonly string[]).includes(s.id));
  }, [filter]);

  const choose = (specialty: Specialty) => {
    sessionStorage.setItem("vitalis:selectedSpecialty", specialty.id);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section specialties" id="specialties" aria-labelledby="specialties-title">
      <div className="sechead" data-reveal>
        <p className="tag"><span>(03)</span> Medical specialties</p>
        <h2 className="section-title" id="specialties-title">Care for every<br /><em>part of you.</em></h2>
        <p className="sechead__note">Eight fictional departments, each with a considered approach. Select a row for the short version.</p>
      </div>

      <div className="filters" role="group" aria-label="Filter specialties" data-reveal>
        {filters.map((item) => (
          <button key={item.id} type="button" className={`filter ${filter === item.id ? "is-active" : ""}`} aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>
            {item.label}
          </button>
        ))}
      </div>

      <div className="index" data-reveal>
        <div className="index__legend" aria-hidden="true">
          <span>No.</span><span>Department</span><span>Focus</span><span>Area</span><span />
        </div>
        <ul className="index__list">
          {items.map((item, i) => {
            const isOpen = open === item.id;
            const group = filters.find((f) => "ids" in f && (f.ids as readonly string[]).includes(item.id));
            return (
              <li className="row" data-open={isOpen} key={item.id}>
                <button
                  type="button"
                  className="row__head"
                  aria-expanded={isOpen}
                  aria-controls={`panel-${item.id}`}
                  onClick={() => setOpen(isOpen ? null : item.id)}
                >
                  <span className="row__no">{String(i + 1).padStart(2, "0")}</span>
                  <span className="row__name">{item.name}</span>
                  <span className="row__desc">{item.description.slice(0, 78)}…</span>
                  <span className="row__area">{group ? group.label : "Specialty"}</span>
                  <span className="row__toggle" aria-hidden="true" />
                </button>
                <div className="row__panel" id={`panel-${item.id}`} role="region" aria-label={`${item.name} details`} aria-hidden={!isOpen}>
                  <div className="row__panel-inner">
                    <div className="case">
                      <div className="case__poster">
                        <Image src={item.image} alt={`A visual representation of ${item.name}`} width={360} height={480} sizes="(max-width: 820px) 60vw, 22vw" />
                      </div>
                      <div className="case__body">
                        <p className="case__summary">{item.description}</p>
                        <ul className="case__scope">{item.focus.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                        <button type="button" className="text-link" onClick={() => choose(item)}>Discover More <span aria-hidden="true">↗</span></button>
                      </div>
                      <div className="case__aside">
                        <p className="tag"><span>↳</span> Demo department</p>
                        <p>This department and its description are fictional demonstration content.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <p className="demo-strip" data-reveal><span>DEMO</span> All specialties are fictional and for portfolio demonstration only.</p>
    </section>
  );
}
