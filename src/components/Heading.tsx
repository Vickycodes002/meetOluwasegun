"use client";

import type { CSSProperties } from "react";
import { useInView } from "./useInView";

/**
 * Section headline. Each word rises out of its line when the heading
 * scrolls into view. If the text ends with a full stop, the full stop
 * becomes the dot and lands last.
 */
export function Heading({
  text,
  as: Tag = "h2",
  id,
  className = "",
  dot = "var(--accent)",
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
  /** Colour of the closing dot. */
  dot?: string;
}) {
  const { ref, visible } = useInView<HTMLHeadingElement>(0.3);
  const hasDot = text.endsWith(".");
  const words = (hasDot ? text.slice(0, -1) : text).split(" ");

  return (
    <Tag ref={ref} id={id} aria-label={text} data-visible={visible} className={`display ${className}`}>
      {words.map((w, i) => (
        <span key={i} aria-hidden>
          <span className="rise">
            <span style={{ transitionDelay: `${i * 70}ms` }}>{w}</span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
      {hasDot && (
        <span
          aria-hidden
          className="dot"
          style={{ "--dot": dot, transitionDelay: `${words.length * 70 + 150}ms` } as CSSProperties}
        />
      )}
    </Tag>
  );
}
