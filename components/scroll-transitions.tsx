"use client";

import { useEffect } from "react";

/** Animate sections on arrival without hiding content before JavaScript loads. */
export function ScrollTransitions() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sections = document.querySelectorAll<HTMLElement>(
      ".folio-section > .wrap",
    );
    let observer: IntersectionObserver | undefined;

    function syncPreference() {
      observer?.disconnect();
      sections.forEach((section) =>
        section.classList.remove("is-scroll-entering"),
      );
      if (preference.matches || !("IntersectionObserver" in window)) return;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-scroll-entering");
            observer?.unobserve(entry.target);
          });
        },
        { threshold: 0, rootMargin: "0px 0px -48px 0px" },
      );
      sections.forEach((section) => observer?.observe(section));
    }

    syncPreference();
    preference.addEventListener("change", syncPreference);
    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", syncPreference);
      sections.forEach((section) =>
        section.classList.remove("is-scroll-entering"),
      );
    };
  }, []);

  return null;
}
