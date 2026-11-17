"use client";

import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked. The mailto link next to this button still works.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-full border border-paper/30 px-5 py-2.5 text-sm transition-colors hover:border-paper"
      aria-live="polite"
    >
      {copied ? "Copied ✓" : "Copy email"}
    </button>
  );
}
