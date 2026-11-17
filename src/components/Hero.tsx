import type { CSSProperties } from "react";
import Link from "next/link";
import { band, hero, marquee, site } from "@/lib/content";
import { ImageMarquee } from "./Marquee";
import { ParallaxStage } from "./ParallaxStage";
import { Burst, CutEdge } from "./Shapes";

const pill =
  "inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-paper/30 px-5 py-3 text-sm font-medium text-paper transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-ink";

const icon = {
  "aria-hidden": true,
  viewBox: "0 0 24 24",
  className: "h-[18px] w-[18px]",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function MailIcon() {
  return (
    <svg {...icon}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7.5 8 6 8-6" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg {...icon}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg {...icon}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Lime band of scrolling words that sits under the hero. */
function WordBand() {
  const half = [...band, ...band, ...band];
  return (
    <div aria-hidden className="marquee border-y-[1.5px] border-ink bg-accent py-3 sm:py-4" data-mask="false">
      <div
        className="marquee-track items-center"
        style={{ "--marquee-duration": "45s", "--marquee-gap": "1.5rem" } as CSSProperties}
      >
        {[...half, ...half].map((w, i) => (
          <span key={i} className="flex items-center gap-6">
            <span className="display whitespace-nowrap text-5xl sm:text-7xl">{w}</span>
            <Burst points={8} inner={0.5} className="h-7 w-7 text-ink sm:h-10 sm:w-10" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  // Index of each line's first word, so the stagger runs across the whole headline.
  const starts = hero.lines.map((_, i) =>
    hero.lines.slice(0, i).reduce((n, l) => n + l.text.split(" ").length, 0),
  );
  const label = hero.lines.map((l) => l.text).join(" ") + ".";

  return (
    <>
      <ParallaxStage className="relative overflow-hidden bg-plum text-paper">
        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-16">
          <p
            className="hero-sticker balloon inline-block -rotate-3 bg-accent px-4 py-2 text-sm font-semibold text-ink sm:text-base"
            style={{ "--delay": "0.1s", "--depth": 8 } as CSSProperties}
          >
            {hero.hello}
          </p>

          <h1
            aria-label={label}
            className="display display-tight mt-7 text-[clamp(3.4rem,13.2vw,13rem)]"
          >
            {hero.lines.map((line, li) => {
              const words = line.text.split(" ");
              const last = li === hero.lines.length - 1;
              return (
                <span
                  key={line.text}
                  aria-hidden
                  className={`hero-line block ${line.lime ? "text-accent" : ""}`}
                >
                  {words.map((w, i) => (
                    <span key={i}>
                      <span className="rise" style={{ "--i": starts[li] + i } as CSSProperties}>
                        <span>{w}</span>
                      </span>
                      {i < words.length - 1 ? " " : ""}
                    </span>
                  ))}
                  {last && <span className="dot hero-dot" />}
                  {last && (
                    <span
                      className="hero-sticker balloon ml-[0.3em] hidden -rotate-3 bg-pink px-4 py-2 align-middle font-sans text-lg font-semibold normal-case leading-normal tracking-normal text-ink md:inline-block"
                      style={{ "--delay": "2.3s", "--depth": -14 } as CSSProperties}
                    >
                      {hero.aside}
                    </span>
                  )}
                </span>
              );
            })}
          </h1>

          <div className="mt-10 grid gap-8 sm:mt-14 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-16">
            <p className="max-w-2xl text-lg leading-relaxed text-paper/80 sm:text-xl">{hero.intro}</p>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <a href={`mailto:${site.email}`} className={pill}>
                <MailIcon />
                {site.email}
              </a>
              <a href={site.resumeUrl} target="_blank" rel="noopener noreferrer" className={pill}>
                My Resume
                <ArrowUpRightIcon />
              </a>
              <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className={pill}>
                <InstagramIcon />
                {site.instagramHandle}
              </a>
            </div>
          </div>

          {/* Stickers. They drift with the pointer at different depths. */}
          <p
            aria-hidden
            className="hero-sticker cut-card absolute right-[4%] top-[7%] hidden rotate-6 bg-violet px-7 py-5 text-base font-semibold text-paper md:block lg:text-lg"
            style={{ "--delay": "1.5s", "--depth": 26 } as CSSProperties}
          >
            {hero.tag}
          </p>
          <Link
            href="/#contact"
            data-cursor="It's free"
            className="hero-sticker group absolute right-[4%] top-[3%] grid h-24 w-24 place-items-center text-tangerine sm:h-32 sm:w-32 md:right-[3%] md:top-[47%] md:h-36 md:w-36 lg:h-44 lg:w-44"
            style={{ "--delay": "1.9s", "--depth": 40 } as CSSProperties}
          >
            <Burst className="spin-slow absolute inset-0 h-full w-full" />
            <span className="display relative rotate-[-8deg] text-center text-xl text-ink transition-transform group-hover:scale-110 sm:text-3xl lg:text-4xl">
              {hero.burst}
            </span>
          </Link>
        </div>
        <CutEdge from="plum" to="paper" />
      </ParallaxStage>

      {/* Two rows moving in opposite directions, four images each */}
      <div className="space-y-4 pb-14 pt-8 sm:pb-20 sm:pt-12" aria-label="Selected work preview">
        <ImageMarquee items={marquee.rowOne} direction="left" duration={50} />
        <ImageMarquee items={marquee.rowTwo} direction="right" duration={56} />
      </div>

      <WordBand />
    </>
  );
}
