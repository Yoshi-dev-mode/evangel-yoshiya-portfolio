import { Hero } from "@/components/hero";
import { ScrollTransitions } from "@/components/scroll-transitions";
import { Navigation } from "@/components/navigation";
import { ProjectExplorer } from "@/components/project-explorer";
import { LearningExplorer } from "@/components/learning-explorer";
import { ContactActions } from "@/components/contact-actions";
import { CertificationExplorer } from "@/components/certification-explorer";
import { Icon } from "@/components/icon";
import { certifications, profile } from "@/data/portfolio";
import "./portfolio.css";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <ScrollTransitions />
        <Hero />
        <section
          id="about"
          className="folio-section folio-about"
          aria-labelledby="about-title"
        >
          <div className="wrap">
            <div className="about-editorial">
              <h2 id="about-title">
                A curious mind.
                <br />
                <span>A practical approach.</span>
              </h2>
              <div className="about-story">
                <p className="about-lead">
                  Hi, I’m Evangel.
                  <br />
                  You can call me Yoshi.
                </p>
                <p>
                  I’m a developing technologist learning to turn ideas into
                  useful, thoughtful software. I build projects, practice the
                  fundamentals, and document what I learn along the way.
                </p>
                <p>
                  My interests stretch from full-stack development and AI
                  engineering to networking, cybersecurity, and computer
                  engineering. There’s always something new to understand.
                </p>
                <a
                  className="folio-link"
                  href={`${profile.github}/Yoshi-dev-mode`}
                >
                  Follow my learning on GitHub <Icon name="arrow" />
                </a>
              </div>
            </div>
            <div className="about-path" aria-label="Ways to explore my work">
              <a href="#projects">
                <span>Build</span>
                <p>Interfaces, server logic, and databases.</p>
                <Icon name="arrow" />
              </a>
              <a href="#learning">
                <span>Understand</span>
                <p>Keep practicing the fundamentals.</p>
                <Icon name="arrow" />
              </a>
              <a href={`${profile.github}/Yoshi-dev-mode`}>
                <span>Document</span>
                <p>Share the learning along the way.</p>
                <Icon name="arrow" />
              </a>
            </div>
          </div>
        </section>
        <section
          id="projects"
          className="folio-section folio-work"
          aria-labelledby="projects-title"
        >
          <div className="wrap">
            <div className="folio-heading">
              <h2 id="projects-title">
                The work,
                <br />
                <span>closer up.</span>
              </h2>
              <p>
                From full-stack applications to security investigations. Select
                a project to see what’s inside.
              </p>
            </div>
            <ProjectExplorer />
          </div>
        </section>
        <section
          id="learning"
          className="folio-section folio-learning"
          aria-labelledby="learning-title"
        >
          <div className="wrap folio-split">
            <div className="learning-intro">
              <h2 id="learning-title">
                Always a student
                <br />
                <span>of the next thing.</span>
              </h2>
              <p>
                Areas I’m exploring and developing through continued study and
                practice. These are learning interests, not claims of expertise.
              </p>
              <a
                className="folio-link"
                href={`${profile.github}?tab=repositories`}
              >
                See my practice in public <Icon name="arrow" />
              </a>
            </div>
            <LearningExplorer />
          </div>
        </section>
        <section
          id="certifications"
          className="folio-section folio-credentials"
          aria-labelledby="certifications-title"
        >
          <div className="wrap">
            <div className="folio-heading">
              <h2 id="certifications-title">Certifications</h2>
              <p>
                {certifications.length} credential entries with their original
                names, issuer labels, and credential links.
              </p>
            </div>
            <CertificationExplorer />
          </div>
        </section>
        <section
          id="contact"
          className="folio-section folio-contact"
          aria-labelledby="contact-title"
        >
          <div className="wrap">
            <div className="contact-editorial">
              <h2 id="contact-title">
                Let’s build
                <br />a connection.
              </h2>
              <div>
                <p>
                  Follow what I’m building, take a closer look at my code, or
                  start a conversation on LinkedIn.
                </p>
                <ContactActions />
              </div>
            </div>
            <div className="contact-signature" aria-hidden="true">
              Evangel Yoshiya<span>Aranas.</span>
            </div>
            <footer className="folio-footer">
              <span>
                © {new Date().getFullYear()} {profile.name}
              </span>
              <a className="folio-link" href="#home">
                Back to top <Icon name="arrow" />
              </a>
              <span>Learning in public. Building with intention.</span>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}
