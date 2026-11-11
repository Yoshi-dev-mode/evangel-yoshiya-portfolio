"use client";
import { useState } from "react";
import { learning, profile } from "@/data/portfolio";
import { Icon } from "./icon";
const connections = [
  {
    label: "See the storefront project",
    url: `${profile.github}/e-commerce-website-project`,
  },
  {
    label: "Follow my learning on GitHub",
    url: `${profile.github}/Yoshi-dev-mode`,
  },
  {
    label: "Read the network investigations",
    url: `${profile.github}/network-incident-investigation`,
  },
  {
    label: "Read the security assessment",
    url: `${profile.github}/botium-toys-security-assessment`,
  },
  {
    label: "Follow my learning on GitHub",
    url: `${profile.github}/Yoshi-dev-mode`,
  },
];
export function LearningExplorer() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="study-list">
      {learning.map((area, index) => (
        <div
          className={`study-item ${open === index ? "is-open" : ""}`}
          key={area.title}
        >
          <h3>
            <button
              type="button"
              aria-expanded={open === index}
              aria-controls={`study-panel-${index}`}
              id={`study-button-${index}`}
              onClick={() => setOpen(open === index ? null : index)}
            >
              {area.title}
              <Icon name="plus" />
            </button>
          </h3>
          <div
            id={`study-panel-${index}`}
            role="region"
            aria-labelledby={`study-button-${index}`}
            hidden={open !== index}
          >
            <div className="study-answer">
              <p>{area.text}</p>
              <a className="folio-link" href={connections[index].url}>
                {connections[index].label}
                <Icon name="arrow" />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
