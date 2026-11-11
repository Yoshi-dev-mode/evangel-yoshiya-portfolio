import { profile } from "@/data/portfolio";
import { Icon } from "./icon";
import "./navigation.css";

const links = [
  ["About", "about"],
  ["Projects", "projects"],
  ["Learning", "learning"],
  ["Certifications", "certifications"],
  ["Contact", "contact"],
];

export function Navigation() {
  return (
    <header className="header">
      <div className="wrap nav-inner">
        <a className="site-name" href="#home" aria-label={`${profile.name}, home`}>
          Yoshi Aranas
        </a>
        <nav aria-label="Main navigation" className="site-links">
          {links.map(([label, id]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
        <details className="site-menu">
          <summary>
            Menu <Icon name="plus" />
          </summary>
          <nav aria-label="Mobile navigation">
            {links.map(([label, id]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
