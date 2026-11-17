"use client";

import { useEffect, useState } from "react";

/**
 * Renders the current year after mount. The server render uses a fixed
 * fallback so the page stays fully static (no time reads while prerendering).
 */
export function Year({ fallback = 2026 }: { fallback?: number }) {
  const [year, setYear] = useState(fallback);

  useEffect(() => {
    // Defer so the first client render matches the server render exactly.
    const id = requestAnimationFrame(() => setYear(new Date().getFullYear()));
    return () => cancelAnimationFrame(id);
  }, []);

  return <>{year}</>;
}
