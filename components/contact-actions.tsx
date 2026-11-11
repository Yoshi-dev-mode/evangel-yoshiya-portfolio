"use client";
import { useState } from "react";
import { profile } from "@/data/portfolio";
import { Icon } from "./icon";
export function ContactActions() {
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.github);
      setCopied(true);
      setMessage("GitHub profile link copied.");
    } catch {
      setCopied(false);
      setMessage(
        "Couldn’t copy automatically. Use the GitHub link to open my profile.",
      );
    }
  }
  return (
    <>
      <div className="folio-contact-actions">
        <a className="folio-button" href={profile.linkedin}>
          Connect on LinkedIn <Icon name="arrow" />
        </a>
        <a className="folio-link" href={profile.github}>
          Visit GitHub <Icon name="arrow" />
        </a>
        <button type="button" className="copy-profile" onClick={copy}>
          <Icon name={copied ? "check" : "copy"} />
          {copied ? "Copy link again" : "Copy GitHub link"}
        </button>
      </div>
      <p className="copy-status" role="status">
        {message}
      </p>
    </>
  );
}
