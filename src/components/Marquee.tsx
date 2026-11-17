import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

type ImageItem = { src: string; alt: string };

/**
 * Horizontal infinite scroller. `direction="left"` moves content left,
 * `direction="right"` moves it right. Pauses on hover, stops for reduced motion.
 * The content is rendered as two identical halves so the -50% translate
 * loops without a seam.
 */
function Track({
  direction,
  duration,
  gap,
  children,
}: {
  direction: "left" | "right";
  duration: number;
  gap: number;
  children: ReactNode;
}) {
  const style = {
    "--marquee-duration": `${duration}s`,
    "--marquee-gap": `${gap}px`,
  } as CSSProperties;

  return (
    <div className="marquee">
      <div className="marquee-track" data-direction={direction} style={style}>
        {children}
      </div>
    </div>
  );
}

/**
 * Pass a short list (for example four images). It is repeated `repeat` times
 * inside each half, so even a wide monitor never sees an empty gap, and the
 * four images appear to slide on forever.
 */
export function ImageMarquee({
  items,
  direction,
  duration = 50,
  repeat = 3,
}: {
  items: ImageItem[];
  direction: "left" | "right";
  duration?: number;
  repeat?: number;
}) {
  const half = Array.from({ length: repeat }, () => items).flat();
  const all = [...half, ...half];

  return (
    <Track direction={direction} duration={duration} gap={16}>
      {all.map((item, i) => {
        // Only the very first copy is announced to screen readers.
        const isClone = i >= items.length;
        return (
          <div
            key={`${item.src}-${i}`}
            aria-hidden={isClone || undefined}
            className="relative h-52 w-52 shrink-0 overflow-hidden bg-line sm:h-72 sm:w-72"
          >
            <Image
              src={item.src}
              alt={isClone ? "" : item.alt}
              fill
              sizes="(min-width: 640px) 288px, 208px"
              className="object-cover"
            />
          </div>
        );
      })}
    </Track>
  );
}

export function CardMarquee({
  children,
  direction = "left",
  duration = 70,
}: {
  /** One element per card; the component renders the set twice for the loop. */
  children: ReactNode[];
  direction?: "left" | "right";
  duration?: number;
}) {
  return (
    <Track direction={direction} duration={duration} gap={16}>
      {children}
      {children.map((child, i) => (
        <div key={`clone-${i}`} aria-hidden className="flex">
          {child}
        </div>
      ))}
    </Track>
  );
}