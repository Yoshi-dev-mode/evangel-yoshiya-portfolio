"use client";

import { useState } from "react";
import { certifications, profile } from "@/data/portfolio";
import { Icon } from "./icon";

const featuredNames = [
  "IBM Full Stack Software Developer",
  "Assets, Threats, and Vulnerabilities",
  "Connect and Protect: Networks and Network Security",
  "Advanced RAG with Vector Databases and Retrievers",
  "Full Stack Application Development Capstone Project",
  "Introduction to Data Science",
];
const featured = featuredNames.map((name) =>
  certifications.find((cert) => cert.name === name)!,
);
const issuers = [...new Set(certifications.map((cert) => cert.issuer))].sort();

export function CertificationExplorer() {
  const [query, setQuery] = useState("");
  const [issuer, setIssuer] = useState("All issuers");
  const [expanded, setExpanded] = useState(false);
  const filtering = query.trim().length > 0 || issuer !== "All issuers";
  const results = certifications.filter(
    (cert) =>
      (issuer === "All issuers" || cert.issuer === issuer) &&
      `${cert.name} ${cert.issuer}`
        .toLocaleLowerCase()
        .includes(query.trim().toLocaleLowerCase()),
  );
  const displayed = filtering || expanded ? results : featured;

  return (
    <div className="cert-explorer">
      <div className="cert-controls">
        <div>
          <label htmlFor="cert-search">Search certifications</label>
          <input
            id="cert-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title or issuer"
          />
        </div>
        <div>
          <label htmlFor="cert-issuer">Issuing organization</label>
          <select
            id="cert-issuer"
            value={issuer}
            onChange={(event) => setIssuer(event.target.value)}
          >
            <option>All issuers</option>
            {issuers.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>
      <p className="cert-result-count" role="status">
        {filtering
          ? `${results.length} of ${certifications.length} entries match`
          : expanded
            ? `All ${certifications.length} entries`
            : `Selected credentials · ${certifications.length} entries in the full list`}
      </p>
      <ul className="cert-list">
        {displayed.map((cert) => (
          <li key={cert.url}>
            <div className="cert-meta">
              <span>{cert.issuer}</span>
              <span>{cert.issued || "Issue date not listed"}</span>
            </div>
            <h3>
              <a
                href={cert.url}
                aria-label={`View credential: ${cert.name}, ${cert.issuer}`}
              >
                {cert.name}
                <Icon name="arrow" />
              </a>
            </h3>
            {cert.credentialId && (
              <p className="cert-id">Credential ID: {cert.credentialId}</p>
            )}
          </li>
        ))}
      </ul>
      {displayed.length === 0 && (
        <div className="cert-empty">
          <p>No certifications match your search.</p>
          <button
            className="folio-button"
            type="button"
            onClick={() => {
              setQuery("");
              setIssuer("All issuers");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
      <div className="cert-actions">
        {!filtering && (
          <button
            className="folio-button"
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded
              ? "Show selected credentials"
              : `Show all ${certifications.length} entries`}
            <Icon name="plus" />
          </button>
        )}
        {filtering && (
          <button
            type="button"
            className="folio-link cert-clear"
            onClick={() => {
              setQuery("");
              setIssuer("All issuers");
            }}
          >
            Clear filters
          </button>
        )}
        <a
          className="folio-link"
          href={`${profile.linkedin}details/certifications/`}
        >
          View on LinkedIn
          <Icon name="arrow" />
        </a>
      </div>
      <p className="cert-source">
        Course certificates, badges, and professional credentials are listed
        separately, with their original names, issuer labels, and source links.
      </p>
    </div>
  );
}
