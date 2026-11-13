"use client";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import "./project-books.css";
import { profile, projects, type Project, type ProjectGroup } from "@/data/portfolio";
import { Icon } from "./icon";

const categories: (ProjectGroup | "All work")[] = [
  "All work",
  "Web development",
  "Security",
];
const BOOK_MOTION_MS = 1600;
const BOOK_RETURN_MS = 1600;

function CoverDesign({ project }: { project: Project }) {
  return <span className="cover-design">
    <span className="book-edition">PROJECT / {project.number}</span>
    <strong>{project.title}</strong>
    <span className="book-cover-art">
      {project.image ? <Image src={project.image.src} alt="" width={480} height={300} sizes="(max-width:900px) 90vw, 550px" /> : <span className="book-print">{project.group === "Security" ? "{ / }" : "</>"}<small>{project.technologies.slice(0, 2).join(" / ")}</small></span>}
    </span>
    <span className="book-cover-foot">{project.group}<span>Yoshi Aranas</span></span>
  </span>;
}

export function ProjectExplorer() {
  const [category, setCategory] = useState<ProjectGroup | "All work">(
    "All work",
  );
  const [selected, setSelected] = useState(0);
  const [opened, setOpened] = useState(false);
  const [closing, setClosing] = useState(false);
  const [contentReady, setContentReady] = useState(false);
  const [compact, setCompact] = useState(false);
  const [page, setPage] = useState(0);
  const [returning, setReturning] = useState(false);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  function returnToShelf() {
    const reader = dialog.current;
    const cover = reader?.querySelector<HTMLElement>(".reader-cover-front");
    const target = tabs.current[selected]?.querySelector(".book-cover");
    if (!reader || !cover || !target) { setOpened(false); return; }
    const from = cover.getBoundingClientRect();
    const to = target.getBoundingClientRect();
    for (const [name, value] of Object.entries({
      "--travel-from-x": `${from.left}px`, "--travel-from-y": `${from.top}px`,
      "--travel-from-w": `${from.width}px`, "--travel-from-h": `${from.height}px`,
      "--travel-to-x": `${to.left}px`, "--travel-to-y": `${to.top}px`,
      "--travel-to-w": `${to.width}px`, "--travel-to-h": `${to.height}px`,
      "--travel-from-scale": String(Math.min(from.width / 220, from.height / 310)),
      "--travel-to-scale": String(Math.min(to.width / 220, to.height / 310)),
    })) reader.style.setProperty(name, value);
    setReturning(true);
  }
  useEffect(() => {
    const media = window.matchMedia("(max-width: 900px)");
    const sync = () => setCompact(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  function openBook() {
    setClosing(false);
    setReturning(false);
    setPage(0);
    setContentReady(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setOpened(true);
  }
  function closeBook() {
    if (closing) return;
    setContentReady(false);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOpened(false);
      return;
    }
    if (dialog.current) dialog.current.scrollTop = 0;
    setClosing(true);
  }
  useEffect(() => {
    if (!opened) return;
    // Backup only: normal dismissal follows the CSS animationend event.
    const timer = window.setTimeout(() => {
      if (closing) setOpened(false);
      else setContentReady(true);
    }, BOOK_MOTION_MS + (closing ? BOOK_RETURN_MS : 0) + 250);
    return () => window.clearTimeout(timer);
  }, [opened, closing]);
  useEffect(() => {
    if (!opened) return;
    const reader = dialog.current;
    if (!reader) return;
    reader.showModal();
    const sizeCover = () => {
      const singlePage = window.matchMedia("(max-width: 900px)").matches;
      reader.style.setProperty("--design-scale", String(Math.min(reader.offsetWidth * (singlePage ? 1 : .5) / 220, reader.offsetHeight / 310)));
    };
    sizeCover();
    const resize = new ResizeObserver(sizeCover);
    resize.observe(reader);
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbar > 0) document.body.style.paddingRight = `${parseFloat(getComputedStyle(document.body).paddingRight) + scrollbar}px`;
    document.body.style.overflow = "hidden";
    return () => {
      resize.disconnect();
      reader.close();
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
    };
  }, [opened]);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const shelf = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const rail = shelf.current;
    const book = tabs.current[selected];
    if (!rail || !book) return;
    rail.scrollTo({ left: book.offsetLeft - rail.offsetLeft - (rail.clientWidth - book.offsetWidth) / 2,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }, [selected, category]);
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
    <div className="work-explorer book-explorer" data-reader-open={opened}>
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
          className="book-shelf"
          ref={shelf}
          role="toolbar"
          aria-label="Select a project"
          aria-orientation="horizontal"
        >
          {visible.map(({ project, index }, position) => (
            <button
              key={project.repository}
              ref={(el) => {
                tabs.current[index] = el;
              }}
              type="button"
              className="project-book"
              style={{ "--book-ink": ["#203e60", "#345c76", "#dee7ef", "#182c45", "#8ba9bf", "#446682", "#c5d4e0"][index], "--book-type": [2, 4, 6].includes(index) ? "#182c45" : "#f5f8fb" } as CSSProperties}
              aria-label={`${selected === index ? "Open" : "Select"} ${project.title}`}
              id={`work-tab-${index}`}
              aria-pressed={selected === index}
              aria-haspopup="dialog"
              aria-controls="project-book-reader"
              tabIndex={selected === index ? 0 : -1}
              onClick={() => selected === index ? openBook() : setSelected(index)}
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
              <span className="book-object" aria-hidden="true">
                <span className="book-spine"><span>{project.number}</span><strong>{project.title}</strong><span>YA</span></span>
                <span className="book-cover">
                  <CoverDesign project={project} />
                </span>
              </span>
            </button>
          ))}
        </div>
        <div className="book-shelf-footer">
          <p>Select a spine. Click its cover to open.</p>
          <div className="book-controls">
            <button type="button" aria-label="Previous project" onClick={() => setSelected(visible[(visible.findIndex(item => item.index === selected) - 1 + visible.length) % visible.length].index)}>←</button>
            <span>{String(visible.findIndex(item => item.index === selected) + 1).padStart(2, "0")} / {String(visible.length).padStart(2, "0")}</span>
            <button type="button" aria-label="Next project" onClick={() => setSelected(visible[(visible.findIndex(item => item.index === selected) + 1) % visible.length].index)}>→</button>
          </div>
          <a href={`${profile.github}?tab=repositories`}>All repositories <Icon name="arrow" /></a>
        </div>
        <dialog ref={dialog} id="project-book-reader" className="book-dialog" style={{ "--book-motion-duration": `${BOOK_MOTION_MS}ms`, "--book-return-duration": `${BOOK_RETURN_MS}ms` } as CSSProperties} data-closing={closing} data-returning={returning} data-page={page} data-content-ready={contentReady} aria-label={`${projects[selected].title} project book`} onAnimationEnd={(event) => {
          if (event.animationName === "reader-travel" && returning) { setOpened(false); return; }
          if (event.target !== event.currentTarget) return;
          if (event.animationName === "reader-spread-close") returnToShelf();
          else if (event.animationName === "reader-spread-open" && !closing) setContentReady(true);
        }} onCancel={(event) => { event.preventDefault(); closeBook(); }} onClose={() => { if (!dialog.current?.open) setOpened(false); }} onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeBook();
        }}>
        {returning && <div className="reader-travel-book" aria-hidden="true" style={{ background: ["#203e60", "#345c76", "#dee7ef", "#182c45", "#8ba9bf", "#446682", "#c5d4e0"][selected], color: [2,4,6].includes(selected) ? "#182c45" : "#f5f8fb" }}><CoverDesign project={projects[selected]} /></div>}
        <div className="reader-paper reader-paper-right" aria-hidden="true" />
        <div className="reader-paper reader-paper-left" aria-hidden="true" />
        {opened && <div className="reader-cover" aria-hidden="true" style={{ "--reader-cover-color": ["#203e60", "#345c76", "#dee7ef", "#182c45", "#8ba9bf", "#446682", "#c5d4e0"][selected], "--reader-cover-type": [2,4,6].includes(selected) ? "#182c45" : "#f5f8fb" } as CSSProperties}>
          <div className="reader-cover-front"><CoverDesign project={projects[selected]} /></div>
          <div className="reader-cover-lining" />
        </div>}
        <div className="book-reader-bar"><span>PROJECT / {projects[selected].number}</span><button type="button" autoFocus onClick={closeBook} aria-label="Close project book">Close book <span aria-hidden="true">×</span></button></div>
        <nav className="reader-page-nav" aria-label="Book pages"><button type="button" aria-pressed={page === 0} onClick={() => setPage(0)}>1 · Overview</button><span>Swipe to turn the page</span><button type="button" aria-pressed={page === 1} onClick={() => setPage(1)}>2 · Details</button></nav>
        <div className="work-panels" onTouchStart={(event) => {
          const first = event.touches[0];
          touch.current = { x: first.clientX, y: first.clientY };
        }} onTouchEnd={(event) => {
          const start = touch.current;
          touch.current = null;
          if (!compact || !start || !contentReady) return;
          const end = event.changedTouches[0];
          const dx = end.clientX - start.x, dy = end.clientY - start.y;
          if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) setPage(current => 1 - current);
        }}>
          {projects.map((project, index) => (
            <article
              key={project.repository}
              id={`work-panel-${index}`}
              aria-labelledby={`book-title-${index}`}
              hidden={selected !== index}
              tabIndex={0}
            >
              {opened && selected === index && (
                <div
                  className="work-panel-content"
                  key={`${category}-${selected}`}
                >
                  <div className="work-visual" inert={compact && page !== 0}>
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
                  <div className="work-description" inert={compact && page !== 1}>
                    <div className="work-title-row">
                      <h3 id={`book-title-${index}`}>{project.title}</h3>
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
        </dialog>
      </div>
      <span className="sr-only" aria-live="polite">
        Selected project: {projects[selected].title}
      </span>
    </div>
  );
}
