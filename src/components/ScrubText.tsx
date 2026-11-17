"use client";

import { useEffect, useRef } from "react";

/**
 * A big statement that lights up word by word as you scroll through it,
 * and dims again if you scroll back. Fully lit for reduced motion.
 */
export function ScrubText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-w]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      spans.forEach((s) => (s.style.opacity = "1"));
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Starts when the top reaches 85% of the screen, finishes when the bottom reaches 55%.
      const start = vh * 0.85;
      const end = vh * 0.55 - r.height;
      const p = Math.min(1, Math.max(0, (start - r.top) / (start - end)));
      const lit = p * (spans.length + 1);
      spans.forEach((s, i) => {
        s.style.opacity = String(Math.min(1, Math.max(0.16, lit - i)));
      });
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
    <p ref={ref} aria-label={text} className={`display ${className}`}>
      {words.map((w, i) => (
        <span key={i} aria-hidden data-w style={{ opacity: 0.16 }} className="transition-opacity duration-200">
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
