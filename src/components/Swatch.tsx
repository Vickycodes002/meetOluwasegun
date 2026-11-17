"use client";

import { useState } from "react";

/** Picks black or white text, whichever reads better on the given colour. */
function inkOn(hex: string) {
  const n = parseInt(hex.replace("#", ""), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return r * 0.299 + g * 0.587 + b * 0.114 > 150 ? "#141414" : "#f7f4ee";
}

/** A colour from the brand palette. Click to copy its hex code. */
export function Swatch({ name, hex, role }: { name: string; hex: string; role: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be blocked. The hex is printed on the swatch anyway.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      data-cursor={copied ? "Copied" : "Copy hex"}
      aria-label={`${name}, ${hex}. Copy hex code.`}
      style={{ background: hex, color: inkOn(hex) }}
      className="cut-b group flex h-full min-h-56 w-full flex-col justify-between p-7 text-left transition-transform duration-300 ease-out hover:-translate-y-2 hover:-rotate-1 sm:min-h-72"
    >
      <span className="label opacity-80">{role}</span>
      <span>
        <span className="display block text-4xl sm:text-5xl">{name}</span>
        <span className="label mt-2 block" aria-live="polite">
          {copied ? "Copied ✓" : hex}
        </span>
      </span>
    </button>
  );
}
