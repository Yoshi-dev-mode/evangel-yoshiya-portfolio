"use client";

import Image from "next/image";
import { useState } from "react";
import { profile } from "@/data/portfolio";
import { PortraitGaze } from "./portrait-gaze";

function MarqueeRow({
  text,
  reverse = false,
}: {
  text: string;
  reverse?: boolean;
}) {
  return (
    <div className={`marquee ${reverse ? "marquee-dark" : "marquee-pale"}`}>
      {[0, 1].map((copy) => (
        <div className="marquee-copy" key={copy}>
          {[0, 1].map((item) => (
            <span key={item}>
              {text} <b>·</b>{" "}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  const [paused, setPaused] = useState(false);
  return (
    <section
      id="home"
      className={`hero ${paused ? "is-paused" : ""}`}
      aria-labelledby="hero-title"
    >
      <h1 id="hero-title" className="sr-only">
        Evangel Yoshiya Aranas — Developer portfolio
      </h1>
      <div className="marquees" aria-hidden="true">
        <MarqueeRow text="BUILD · LEARN · CREATE" />
        <MarqueeRow text="FULL STACK · AI · SECURITY" reverse />
      </div>
      <div className="portrait-frame">
        <Image
          src={profile.portrait}
          alt={profile.portraitAlt}
          fill
          sizes="(max-width: 760px) 110vw, (max-width: 944px) 72vw, 680px"
          preload
          className="portrait"
        />
        <PortraitGaze src={profile.portrait} paused={paused} />
      </div>
      <div className="hero-bottom wrap">
        <a className="scroll-link" href="#about">
          <span aria-hidden="true">↓</span> A little more about me
        </a>
        <button
          className="motion-button"
          onClick={() => setPaused(!paused)}
          aria-pressed={paused}
          aria-label={
            paused ? "Resume hero motion" : "Pause hero motion"
          }
        >
          <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>{" "}
          {paused ? "Resume motion" : "Pause motion"}
        </button>
        <span className="hero-label">
          Personal portfolio <span aria-hidden="true">/</span> Yoshi
        </span>
      </div>
    </section>
  );
}
