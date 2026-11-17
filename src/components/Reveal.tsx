"use client";

import type { CSSProperties, ReactNode } from "react";
import { useInView } from "./useInView";

/**
 * Animates its children in once they scroll into view.
 * - "up" (default): fade and lift
 * - "pop": lands like a paper card slapped on a table (set `fromRot` for the start angle)
 * - "wipe": uncovers from the bottom, good for images
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "up",
  fromRot,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: "up" | "pop" | "wipe";
  fromRot?: number;
}) {
  const { ref, visible } = useInView<HTMLDivElement>();

  const style = {
    transitionDelay: `${delay}ms`,
    ...(fromRot !== undefined ? { "--from-rot": `${fromRot}deg` } : {}),
  } as CSSProperties;

  return (
    <div
      ref={ref}
      data-visible={visible}
      data-variant={variant === "up" ? undefined : variant}
      className={`reveal ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
