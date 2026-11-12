import type { Metadata } from "next";
import Link from "next/link";
import { PortfolioFilm } from "@/components/portfolio-film";
import "./concept.css";

export const metadata: Metadata = {
  title: "Portfolio in motion — Concept preview",
  robots: { index: false, follow: false },
};

export default function ConceptPage() {
  return (
    <main className="concept-page">
      <header className="concept-header">
        <Link href="/">Back to portfolio</Link>
        <span>Animation study / 01</span>
        <span>Preview only</span>
      </header>
      <div className="concept-intro">
        <h1>A portfolio, unfolding.</h1>
        <p>A ten-second studio study. One screen becomes the whole story.</p>
      </div>
      <PortfolioFilm />
      <footer className="concept-footer">
        <p>Browser-rendered 3D concept. No generation credits used.</p>
        <p>Your portrait hero and homepage are unchanged.</p>
      </footer>
    </main>
  );
}
