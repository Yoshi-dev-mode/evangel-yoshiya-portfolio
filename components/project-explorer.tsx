"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { profile, projects } from "@/data/portfolio";
import { Icon } from "./icon";

const categories = ["All work", "Web development", "Security"];
const flows = [
  ["Menu & bag", "Order validation", "PostgreSQL transaction"],
  ["Record transaction", "Review its effect", "Reconcile balances"],
  ["User authentication", "Patient records", "MySQL database"],
  ["Packet & log evidence", "Protocol analysis", "Qualified findings"],
];

export function ProjectExplorer() {
  const [category, setCategory] = useState("All work");
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const visible = projects
    .map((project, index) => ({ project, index }))
    .filter(
      ({ index }) =>
        category === "All work" ||
        (category === "Security" ? index === 3 : index !== 3),
    );
  function filter(next: string) {
    setCategory(next);
    if (next === "Security") setSelected(3);
    else if (next === "Web development" && selected === 3) setSelected(0);
  }
  return (
    <div className="work-explorer">
      <div className="work-toolbar">
        <div className="work-filters" role="group" aria-label="Filter projects">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => filter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <p role="status" className="work-count">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </p>
      </div>
      <div className="work-layout">
        <div
          className="work-selector"
          role="tablist"
          aria-label="Select a project"
          aria-orientation="vertical"
        >
          {visible.map(({ project, index }, position) => (
            <button
              key={project.repository}
              ref={(el) => {
                tabs.current[index] = el;
              }}
              type="button"
              id={`work-tab-${index}`}
              role="tab"
              aria-selected={selected === index}
              aria-controls={`work-panel-${index}`}
              tabIndex={selected === index ? 0 : -1}
              onClick={() => setSelected(index)}
              onKeyDown={(event) => {
                let next = position;
                if (["ArrowDown", "ArrowRight"].includes(event.key))
                  next = (position + 1) % visible.length;
                else if (["ArrowUp", "ArrowLeft"].includes(event.key))
                  next = (position - 1 + visible.length) % visible.length;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = visible.length - 1;
                else return;
                event.preventDefault();
                const index = visible[next].index;
                setSelected(index);
                tabs.current[index]?.focus();
              }}
            >
              <span>
                <strong>{project.title}</strong>
                <span>{project.category}</span>
              </span>
              <Icon name="chevron" />
            </button>
          ))}
          <a className="work-all" href={`${profile.github}?tab=repositories`}>
            All repositories <Icon name="arrow" />
          </a>
        </div>
        <div className="work-panels">
          {projects.map((project, index) => (
            <article
              key={project.repository}
              id={`work-panel-${index}`}
              role="tabpanel"
              aria-labelledby={`work-tab-${index}`}
              hidden={selected !== index}
              tabIndex={0}
            >
              {selected === index && (
                <div
                  className="work-panel-content"
                  key={`${category}-${selected}`}
                >
                  <div className="work-visual">
                    {index === 0 ? (
                      <a
                        href={`${profile.github}/${project.repository}`}
                        aria-label="View Yoshiya Storefront repository"
                      >
                        <Image
                          src="/images/projects/storefront.webp"
                          alt="Yoshiya Storefront homepage showing its restaurant menu and ordering interface"
                          width={1440}
                          height={900}
                          sizes="(max-width: 760px) 90vw, 58vw"
                        />
                      </a>
                    ) : (
                      <div
                        className={`architecture architecture-${index}`}
                        aria-label={`${project.title} project workflow`}
                      >
                        <Icon name="code" />
                        <ol>
                          {flows[index].map((step, stepIndex) => (
                            <li key={step}>
                              <span className="flow-node" aria-hidden="true">
                                {stepIndex + 1}
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                        <span className="diagram-label">
                          {index === 3
                            ? "Investigation workflow"
                            : "Project workflow"}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="work-description">
                    <div className="work-title-row">
                      <h3>{project.title}</h3>
                      <a
                        className="work-source"
                        href={`${profile.github}/${project.repository}/blob/HEAD/README.md`}
                      >
                        README <Icon name="arrow" />
                      </a>
                    </div>
                    <p>{project.description}</p>
                    <ul
                      className="work-technologies"
                      aria-label="Project technologies"
                    >
                      {project.technologies.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                    <div className="work-foot">
                      <p>{project.note}</p>
                      <a
                        className="folio-button"
                        href={`${profile.github}/${project.repository}`}
                      >
                        View repository <Icon name="arrow" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
      <p className="work-context">
        Selected work from my public GitHub. Project scope and technologies are
        linked to their source.
      </p>
      <span className="sr-only" aria-live="polite">
        Selected project: {projects[selected].title}
      </span>
    </div>
  );
}
