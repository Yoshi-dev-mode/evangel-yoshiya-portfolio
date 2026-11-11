import { profile } from "@/data/portfolio";

const links = [
  ["About", "about"],
  ["Projects", "projects"],
  ["Learning", "learning"],
];

export function Navigation() {
  return (
    <header className="header">
      <div className="wrap nav-inner">
        <a className="brand" href="#home" aria-label={`${profile.name}, home`}>
          <span className="brand-mark" aria-hidden="true">
            y.
          </span>
          <span>
            Yoshi Aranas<span className="brand-sub">DEVELOPER IN PROGRESS</span>
          </span>
        </a>
        <nav aria-label="Main navigation" className="desktop-nav">
          {links.map(([label, id]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
          <a href="#certifications">Certifications</a>
        </nav>
        <a className="button button-small" href="#contact">
          Let’s connect <span aria-hidden="true">↗</span>
        </a>
        <details className="mobile-menu">
          <summary>
            Menu <span aria-hidden="true">＋</span>
          </summary>
          <nav aria-label="Mobile navigation">
            {[
              ...links,
              ["Certifications", "certifications"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <a key={id} href={`#${id}`}>
                {label}
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
