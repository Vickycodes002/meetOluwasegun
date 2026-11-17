"use client";

import { useEffect, useRef } from "react";

/**
 * The dot follows the pointer around the site. Over a link it grows, and over
 * anything with a `data-cursor="Some label"` attribute it opens into a small
 * lime tag showing that label. Mouse only, and off for reduced motion.
 */
export function CursorDot() {
  const ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const label = labelRef.current;
    if (!el || !label) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;
    let started = false;

    const tick = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.2 ? requestAnimationFrame(tick) : 0;
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!started) {
        started = true;
        x = tx;
        y = ty;
        el.dataset.on = "true";
      }
      const target = e.target instanceof Element ? e.target : null;
      const text = target?.closest("[data-cursor]")?.getAttribute("data-cursor") ?? "";
      if (label.textContent !== text) label.textContent = text;
      el.dataset.label = text ? "true" : "false";
      el.dataset.link = target?.closest("a, button") ? "true" : "false";
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      el.dataset.on = "false";
      started = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="cursor-dot">
      <span ref={labelRef} />
    </div>
  );
}
