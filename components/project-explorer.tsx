"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { profile, projects, type ProjectGroup } from "@/data/portfolio";
import { Icon } from "./icon";

const categories: (ProjectGroup | "All work")[] = [
  "All work",
  "Web development",
  "Security",
];

export function ProjectExplorer() {
  const [category, setCategory] = useState<ProjectGroup | "All work">(
    "All work",
  );
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const visible = projects
    .map((project, index) => ({ project, index }))
    .filter(
      ({ project }) => category === "All work" || project.group === category,
    );
  function filter(next: ProjectGroup | "All work") {
    setCategory(next);
    if (next !== "All work" && projects[selected].group !== next) {
      const firstMatch = projects.findIndex(
        (project) => project.group === next,
      );
      if (firstMatch >= 0) setSelected(firstMatch);
    }
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
                    {project.image ? (
                      <a
                        href={`${profile.github}/${project.repository}`}
                        aria-label={`View ${project.title} repository`}
                      >
                        <Image
                          src={project.image.src}
                          alt={project.image.alt}
                          width={project.image.width}
                          height={project.image.height}
                          sizes="(max-width: 760px) 90vw, 58vw"
                        />
                      </a>
                    ) : (
                      <div
                        className={`architecture ${project.group === "Security" ? "architecture-security" : ""}`}
                        aria-label={`${project.title} project workflow`}
                      >
                        <Icon name="code" />
                        <ol>
                          {project.workflow.map((step, stepIndex) => (
                            <li key={step}>
                              <span className="flow-node" aria-hidden="true">
                                {stepIndex + 1}
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                        <span className="diagram-label">
                          {project.group === "Security"
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
                        href={`${profile.github}/${project.repository}/blob/HEAD/${project.sourcePath || "README.md"}`}
                      >
                        {project.sourcePath ? "Source" : "README"}{" "}
                        <Icon name="arrow" />
                      </a>
                    </div>
                    <p>{project.description}</p>
                    <ul
                      className="work-technologies"
                      aria-label="Project tools and topics"
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
