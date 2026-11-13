"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PortfolioFilm } from "./portfolio-film";
import "./scroll-portfolio.css";

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const smooth = (value: number) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};

export function ScrollPortfolio({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [active, setActive] = useState(false);
  const [nearby, setNearby] = useState(false);
  const [ready, setReady] = useState(false);
  const failed = useRef(false);
  const sceneReady = useCallback(() => setReady(true), []);
  const sceneError = useCallback(() => {
    failed.current = true;
    setActive(false);
  }, []);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => {
      setActive(!preference.matches && !failed.current);
    };
    syncPreference();
    preference.addEventListener("change", syncPreference);
    return () => preference.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    if (!active || !window.location.hash) return;
    // Inserting the story changes section positions. Keep the requested anchor
    // in view without disabling the story for later scrolling back to the hero.
    const frame = requestAnimationFrame(() => {
      const destination = document.getElementById(window.location.hash.slice(1));
      destination?.scrollIntoView({ behavior: "instant", block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [active]);

  useEffect(() => {
    if (!active || !root.current || !track.current) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!root.current || !track.current) return;
      const travel = Math.max(
        1,
        track.current.offsetHeight - window.innerHeight,
      );
      const p = clamp(-root.current.getBoundingClientRect().top / travel);
      progress.current = p;
      const reveal = smooth((p - 0.86) / 0.12);
      const exit = smooth((p - 0.89) / 0.1);
      root.current.style.setProperty("--story-about-opacity", String(reveal));
      root.current.style.setProperty("--story-scene-opacity", String(1 - exit));
      root.current.style.setProperty(
        "--story-hint-opacity",
        String(1 - smooth((p - 0.72) / 0.12)),
      );
      root.current.dataset.phase =
        p < 0.7 ? "unfold" : p < 0.98 ? "zoom" : "about";
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) setNearby(true);
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(root.current);
    const resize = new ResizeObserver(schedule);
    resize.observe(track.current);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      observer.disconnect();
      resize.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [active]);

  return (
    <div
      ref={root}
      className="scroll-story"
      data-scroll-active={active}
      data-scene-ready={ready}
    >
      <div ref={track} className="scroll-story-track">
        <div className="scroll-story-sticky">
          <div className="scroll-story-scene">
            {active && nearby && (
              <PortfolioFilm
                scrollProgress={progress}
                onSceneReady={sceneReady}
                onSceneError={sceneError}
              />
            )}
          </div>
          <div className="scroll-story-guidance">
            <span>
              {ready ? "Scroll to unfold" : "Preparing the animation…"}
            </span>
            <a href="#about" onClick={(event) => {
              const destination = root.current?.querySelector<HTMLElement>("#about");
              if (!destination) return;
              event.preventDefault();
              window.scrollTo({ top: destination.getBoundingClientRect().top + window.scrollY, behavior: "instant" });
              window.history.replaceState(null, "", "#about");
            }}>Skip to About</a>
          </div>
        </div>
      </div>
      <div className="scroll-story-destination">{children}</div>
    </div>
  );
}
