import type { CSSProperties } from "react";

type Token = "paper" | "card" | "ink" | "accent" | "plum" | "violet" | "tangerine" | "pink";

/** Comic-style starburst. Takes its colour from `currentColor`. */
export function Burst({
  points = 14,
  inner = 0.8,
  className = "",
}: {
  points?: number;
  /** Inner radius as a share of the outer radius. Lower is spikier. */
  inner?: number;
  className?: string;
}) {
  const pts: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? 50 : 50 * inner;
    const a = (Math.PI * i) / points;
    pts.push(`${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`);
  }
  return (
    <svg aria-hidden viewBox="0 0 100 100" className={className}>
      <polygon points={pts.join(" ")} fill="currentColor" />
    </svg>
  );
}

/** Jagged, hand-cut edge between two colour bands. */
export function CutEdge({ from, to, flip = false }: { from: Token; to: Token; flip?: boolean }) {
  return (
    <div aria-hidden className="cut-edge" data-flip={flip} style={{ background: `var(--${from})` }}>
      <div style={{ background: `var(--${to})` }} />
    </div>
  );
}

const strip: { shape: "dot" | "half" | "burst" | "square" | "pill"; color: Token }[] = [
  { shape: "dot", color: "accent" },
  { shape: "half", color: "pink" },
  { shape: "burst", color: "tangerine" },
  { shape: "square", color: "violet" },
  { shape: "pill", color: "paper" },
  { shape: "dot", color: "tangerine" },
  { shape: "half", color: "accent" },
  { shape: "burst", color: "pink" },
  { shape: "square", color: "paper" },
  { shape: "pill", color: "violet" },
];

function StripShape({ shape, color }: (typeof strip)[number]) {
  const style = { background: `var(--${color})`, color: `var(--${color})` } as CSSProperties;
  const size = "h-14 sm:h-20";
  if (shape === "burst") {
    return <Burst points={10} inner={0.62} className={`${size} aspect-square shrink-0`} />;
  }
  if (shape === "half") {
    return <span className={`${size} aspect-[1/2] shrink-0 rounded-r-full`} style={style} />;
  }
  if (shape === "pill") {
    return <span className={`${size} aspect-[2/1] shrink-0 rounded-full`} style={style} />;
  }
  if (shape === "square") {
    return <span className={`${size} aspect-square shrink-0 cut-card`} style={style} />;
  }
  return <span className={`${size} aspect-square shrink-0 rounded-full`} style={style} />;
}

/** Endless strip of shapes in the palette. */
export function PatternStrip({ direction = "left" }: { direction?: "left" | "right" }) {
  const half = [...strip, ...strip, ...strip];
  return (
    <div aria-hidden className="marquee bg-ink py-5" data-mask="false">
      <div
        className="marquee-track items-center"
        data-direction={direction}
        style={{ "--marquee-duration": "70s", "--marquee-gap": "1.75rem" } as CSSProperties}
      >
        {[...half, ...half].map((s, i) => (
          <span key={i} className="flex" style={{ color: `var(--${s.color})` }}>
            <StripShape {...s} />
          </span>
        ))}
      </div>
    </div>
  );
}
