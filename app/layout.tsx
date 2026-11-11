import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Evangel Yoshiya Aranas — Developer & lifelong learner",
  description:
    "Learning in public and building useful things. Explore Evangel Yoshiya Aranas’s projects in full-stack development and cybersecurity, and ongoing technology interests.",
  other: { "page-type": "service", "site-kind": "tech" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-type="service">
      <body>{children}</body>
    </html>
  );
}
