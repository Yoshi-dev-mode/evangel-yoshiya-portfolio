import certificationRecords from "./certifications.json";

export const profile = {
  name: "Evangel Yoshiya Aranas",
  github: "https://github.com/Yoshi-dev-mode",
  linkedin: "https://www.linkedin.com/in/evangel-yoshiya-aranas-88b352414/",
  portrait: "/images/portrait-cutout.png",
  portraitAlt:
    "Portrait of Evangel Yoshiya Aranas wearing a blue-gray collared shirt",
};

// Project sources reviewed on 2026-11-11 and 2026-11-12; see project-sources.md.
// Keep the original repository names, source URLs, and project limitations together.
export type ProjectGroup = "Web development" | "Security";
export type Project = {
  title: string;
  repository: string;
  category: string;
  group: ProjectGroup;
  description: string;
  technologies: string[];
  note: string;
  number: string;
  workflow: string[];
  sourcePath?: string;
  image?: { src: string; alt: string; width: number; height: number };
};

export const projects: Project[] = [
  {
    title: "Yoshiya Storefront",
    repository: "e-commerce-website-project",
    category: "Full-stack development",
    group: "Web development",
    workflow: ["Menu & bag", "Order validation", "PostgreSQL transaction"],
    image: {
      src: "/images/projects/storefront.webp",
      alt: "Yoshiya Storefront homepage showing its restaurant menu and ordering interface",
      width: 1440,
      height: 900,
    },
    description:
      "A restaurant storefront with a searchable menu, a persistent shopping bag, and transactional order submission. Includes a credential-free demo checkout.",
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    note: "Demo checkout available in the repository",
    number: "01",
  },
  {
    title: "Kabisera Ledger",
    repository: "kabisera-ledger",
    group: "Web development",
    workflow: ["Record transaction", "Review its effect", "Reconcile balances"],
    category: "Full-stack development",
    description:
      "A ledger for small service businesses to record transactions, track customer credit, and reconcile daily balances. A prototype in progress.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    note: "Prototype in progress · manual recordkeeping",
    number: "02",
  },
  {
    title: "MediVault",
    repository: "MediVault-Group-1",
    group: "Web development",
    workflow: ["User authentication", "Patient records", "MySQL database"],
    category: "Web application · group project",
    description:
      "A medical records management project with user authentication, session management, and patient record operations, documented for Ubuntu deployment.",
    technologies: ["Flask", "MySQL", "Nginx", "Ubuntu"],
    note: "Group project · see repository for implementation",
    number: "03",
  },
  {
    title: "Network Incident Investigation",
    repository: "network-incident-investigation",
    group: "Security",
    workflow: [
      "Packet & log evidence",
      "Protocol analysis",
      "Qualified findings",
    ],
    category: "Cybersecurity learning",
    description:
      "Three training investigations using packet and log evidence to examine DNS failures, a suspected TCP SYN flood, and DNS/HTTP activity. Findings include evidence limitations.",
    technologies: ["tcpdump", "DNS", "TCP", "HTTP"],
    note: "Training scenarios · evidence-based reporting",
    number: "04",
  },
  {
    title: "LEBC Music Ministry Registration",
    repository: "LEBC-Application-Form",
    category: "Website development",
    group: "Web development",
    description:
      "A responsive registration website with separate application paths for music training and ministry participation. Submissions are collected through Google Forms.",
    technologies: ["HTML", "CSS", "JavaScript", "Google Forms"],
    note: "Static website · Google Forms handles submissions",
    number: "05",
    workflow: [
      "Choose application path",
      "Open application form",
      "Submit through Google Forms",
    ],
  },
  {
    title: "LEBC Data Management System",
    repository: "LEBC-data-management-system",
    category: "Website development",
    group: "Web development",
    description:
      "A church-member directory with name search, membership filters, and a dashboard summarizing member statistics. Features are documented in the public client source.",
    technologies: ["Next.js", "React", "TypeScript", "Recharts"],
    note: "Directory and dashboard confirmed from client source",
    number: "06",
    workflow: ["Member directory", "Search & filter", "Summary dashboard"],
    sourcePath: "client/app/people/page.tsx",
  },
  {
    title: "Botium Toys Security Assessment",
    repository: "botium-toys-security-assessment",
    category: "Cybersecurity learning",
    group: "Security",
    description:
      "A document-based educational case study reviewing reported security controls, risks, and compliance-related gaps, with prioritized remediation recommendations. It is not a live technical audit.",
    technologies: ["Risk assessment", "PCI DSS", "GDPR", "SOC criteria"],
    note: "Educational case study · document-based review",
    number: "07",
    workflow: [
      "Review source materials",
      "Identify control gaps",
      "Prioritize remediation",
    ],
  },
];

export const learning = [
  {
    title: "Full-stack development",
    text: "Connecting interfaces, server logic, and databases through practical projects.",
  },
  {
    title: "AI engineering",
    text: "Exploring how AI can become part of useful applications.",
  },
  {
    title: "Networking",
    text: "Learning how systems communicate and how to investigate network behavior.",
  },
  {
    title: "Cybersecurity",
    text: "Practicing security fundamentals and careful, evidence-based investigation.",
  },
  {
    title: "Computer engineering",
    text: "Continuing to explore the relationship between hardware and software.",
  },
];

export type Certification = {
  name: string;
  issuer: string;
  url: string;
  issued?: string;
  credentialId?: string;
};
// Initial list read from LinkedIn on 2026-11-11; new Google credential supplied by the user on 2026-11-12.
// These are profile-listed credentials; individual issuer pages were not independently audited.
export const certifications: Certification[] = certificationRecords;
