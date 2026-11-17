"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Exposes how far this element has travelled through the viewport as a CSS
 * variable, --p, from 0 (its top has just entered at the bottom of the screen)
 * to 1 (its bottom has just left at the top). Children use --p for parallax
 * and zoom, for example `scale: calc(1.2 - var(--p) * 0.2)`.
 * Stays at 0.5 for visitors who ask for reduced motion.
 */
export function ScrollVar({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < -100 || r.top > vh + 100) return;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      el.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ "--p": 0.5, ...style } as CSSProperties}>
      {children}
    </div>
  );
}
