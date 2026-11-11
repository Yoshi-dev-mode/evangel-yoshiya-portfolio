import certificationRecords from "./certifications.json";

export const profile = {
  name: "Evangel Yoshiya Aranas",
  github: "https://github.com/Yoshi-dev-mode",
  linkedin: "https://www.linkedin.com/in/evangel-yoshiya-aranas-88b352414/",
  portrait: "/images/portrait-cutout.png",
  portraitAlt:
    "Portrait of Evangel Yoshiya Aranas wearing a blue-gray collared shirt",
};

// Descriptions and technologies verified against public repository READMEs on 2026-11-11.
// Keep the original repository names, source URLs, and project limitations together.
export const projects = [
  {
    title: "Yoshiya Storefront",
    repository: "e-commerce-website-project",
    category: "Full-stack development",
    description:
      "A restaurant storefront with a searchable menu, a persistent shopping bag, and transactional order submission. Includes a credential-free demo checkout.",
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    note: "Demo checkout available in the repository",
    number: "01",
  },
  {
    title: "Kabisera Ledger",
    repository: "kabisera-ledger",
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
    category: "Cybersecurity learning",
    description:
      "Three training investigations using packet and log evidence to examine DNS failures, a suspected TCP SYN flood, and DNS/HTTP activity. Findings include evidence limitations.",
    technologies: ["tcpdump", "DNS", "TCP", "HTTP"],
    note: "Training scenarios · evidence-based reporting",
    number: "04",
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
// Read from the authenticated LinkedIn certification list on 2026-11-11.
// These are profile-listed credentials; individual issuer pages were not independently audited.
export const certifications: Certification[] = certificationRecords;
