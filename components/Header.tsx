"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { site } from "@/lib/content";

const ids = ["about", "specialties", "doctors", "services", "contact"];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter((n): n is HTMLElement => Boolean(n));
    const hero = document.getElementById("home");
    if (!sections.length || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-30% 0px -60% 0px" },
    );
    if (hero) observer.observe(hero);
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setTimeout(() => toggleRef.current?.focus(), 10);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => menuRef.current?.querySelector("a")?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && menuRef.current) {
        const items = Array.from(menuRef.current.querySelectorAll<HTMLElement>("a[href],button")).filter((n) => n.offsetParent !== null);
        if (!items.length) return;
        if (e.shiftKey && document.activeElement === items[0]) { e.preventDefault(); items[items.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === items[items.length - 1]) { e.preventDefault(); items[0].focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => { cancelAnimationFrame(frame); document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open, close]);

  return (
    <>
      <header className="header">
        <div className="header__bar">
          <a className="header__brand" href="#home" aria-label="VITALIS, back to top" onClick={close}>VITALIS<span>®</span></a>
          <p className="header__desc">Medical Center</p>
          <p className="header__place">New York · Est. 2019 (demo)</p>
          <nav className="header__nav" aria-label="Primary">
            {site.nav.map((link) => {
              const id = link.href.replace("#", "");
              return <a key={link.href} href={link.href} className={active === id ? "is-active" : ""} aria-current={active === id ? "page" : undefined}>{link.label}</a>;
            })}
          </nav>
          <a className="btn btn--dark btn--small header__cta" href="#booking">Book an Appointment <ArrowUpRight size={13} /></a>
          <button ref={toggleRef} type="button" className="header__toggle" aria-expanded={open} aria-controls="vitalis-menu" onClick={() => (open ? close() : setOpen(true))}>
            {open ? <X size={20} /> : <Menu size={20} />}<span>{open ? "Close" : "Menu"}</span>
          </button>
        </div>
      </header>

      {open ? (
        <div className="menu" id="vitalis-menu" ref={menuRef} role="dialog" aria-modal="true" aria-label="Site menu">
          <nav aria-label="Mobile primary">
            {site.nav.map((link, i) => <a key={link.href} href={link.href} onClick={close}><span>0{i + 1}</span>{link.label}</a>)}
          </nav>
          <div className="menu__foot">
            <a className="btn btn--dark" href="#booking" onClick={close}>Book an Appointment <ArrowUpRight size={14} /></a>
            <p>{site.address.line1}, {site.address.line2}<br /><a href={site.phoneHref}>{site.phone}</a> · <a href={`mailto:${site.email}`}>{site.email}</a></p>
          </div>
        </div>
      ) : null}
    </>
  );
}
