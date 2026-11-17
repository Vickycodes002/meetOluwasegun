import { Fragment, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { booking, type CaseStudy, type Project } from "@/lib/content";
import { Heading } from "./Heading";
import { Reveal } from "./Reveal";
import { ScrollVar } from "./ScrollVar";
import { ScrubText } from "./ScrubText";
import { Burst } from "./Shapes";
import { Swatch } from "./Swatch";

const cuts = ["cut-v1", "cut-v2"];

/** Line drawings of the ideas a logo was built from. */
function MarkIcon({ name }: { name: "plane" | "arrow" }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="mx-auto h-40 w-40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {name === "plane" ? (
        <>
          <path d="M3 11.2 21 3.5l-6.3 17-3.4-7.1L3 11.2Z" />
          <path d="M11.3 13.4 21 3.5" />
        </>
      ) : (
        <>
          <path d="M5.5 18.5 18.5 5.5" />
          <path d="M8.5 5.5h10v10" />
        </>
      )}
    </svg>
  );
}

/** Section label with a running number, e.g. "01 / The brief". */
function Label({
  n,
  children,
  className = "",
}: {
  n: number;
  children: string;
  className?: string;
}) {
  return (
    <p className={`label ${className}`}>
      {String(n).padStart(2, "0")} / {children}
    </p>
  );
}

/** Image that wipes in, then drifts slightly slower than the page as you scroll. */
function Shot({
  src,
  alt,
  sizes,
  i,
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  i: number;
  priority?: boolean;
}) {
  return (
    <Reveal variant="wipe">
      {/* Extra wrapper: the wipe clips this div, the cut shape clips the one inside */}
      <div>
        <ScrollVar
          className={`relative aspect-[4/3] overflow-hidden bg-line ${cuts[i % cuts.length]}`}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover"
            style={{ scale: 1.12, translate: "0 calc((var(--p) - 0.5) * -9%)" }}
          />
        </ScrollVar>
      </div>
    </Reveal>
  );
}

/**
 * Full case study layout. The hero and a few accents take the client's own
 * colours from `study.theme`, so every case study feels like its brand
 * while the page structure stays the same.
 */
export function CaseStudyView({
  project,
  study,
  index,
  next,
}: {
  project: Project;
  study: CaseStudy;
  /** Position of this project in the work list, starting at 1. */
  index: number;
  next?: Project;
}) {
  const { dark, main, pop } = study.theme;
  const theme = {
    "--c-dark": dark,
    "--c-main": main,
    "--c-pop": pop,
  } as CSSProperties;
  const cardLooks = [
    { bg: "var(--c-main)", fg: dark, rest: "-rotate-2", from: -12 },
    { bg: "var(--c-dark)", fg: "#f7f4ee", rest: "rotate-1", from: 10 },
    { bg: "var(--c-pop)", fg: dark, rest: "-rotate-1", from: -10 },
  ];

  // Group the gallery into rows: a full image alone, half images in pairs.
  const rows: CaseStudy["gallery"][] = [];
  for (const g of study.gallery) {
    const last = rows[rows.length - 1];
    if (
      g.layout === "half" &&
      last &&
      last.length === 1 &&
      last[0].layout === "half"
    )
      last.push(g);
    else rows.push([g]);
  }

  return (
    <article style={theme}>
      {/* ---------- Hero, in the client's colours ---------- */}
      <header
        className="relative overflow-hidden text-paper"
        style={{ background: "var(--c-dark)" }}
      >
        <div className="mx-auto max-w-7xl px-5 pb-10 pt-10 sm:px-8 sm:pt-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/#work"
              className="label inline-flex items-center gap-2 rounded-full border-[1.5px] border-paper/30 px-4 py-2 transition-colors hover:border-paper"
            >
              ← All work
            </Link>
            <p className="label" style={{ color: "var(--c-main)" }}>
              Case study {String(index).padStart(2, "0")} / {project.year}
            </p>
          </div>

          <div className="relative mt-8">
            <Heading
              as="h1"
              text={`${project.title}.`}
              className="display-tight text-[clamp(5rem,26vw,24rem)]"
              dot="var(--c-pop)"
            />
            <span
              className="absolute -top-4 right-0 hidden md:block"
              style={{ color: "var(--c-main)" }}
            >
              <Burst
                points={12}
                inner={0.72}
                className="spin-slow h-28 w-28 lg:h-40 lg:w-40"
              />
            </span>
          </div>

          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-paper/85 sm:text-2xl">
            {project.summary}
          </p>

          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-paper/20 pt-8 text-sm md:grid-cols-4">
            {[
              ["Year", project.year],
              ["Role", project.role],
              ["Sector", study.sector],
              ["Delivered", study.deliverables.join(", ")],
            ].map(([k, v], i) => (
              <Reveal key={k} delay={i * 80}>
                <dt className="label" style={{ color: "var(--c-main)" }}>
                  {k}
                </dt>
                <dd className="mt-2 leading-relaxed text-paper/85">{v}</dd>
              </Reveal>
            ))}
          </dl>
        </div>

        {/* Cover: starts zoomed in and settles as you scroll */}
        <div className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-24">
          <Reveal variant="wipe">
            <div>
              <ScrollVar className="cut-v1 relative aspect-[4/3] overflow-hidden md:aspect-[16/9]">
                <Image
                  src={project.cover}
                  alt={`${project.title} cover`}
                  fill
                  priority
                  sizes="(min-width: 1280px) 1216px, 100vw"
                  className="object-cover"
                  style={{ scale: "calc(1.28 - var(--p) * 0.28)" }}
                />
              </ScrollVar>
            </div>
          </Reveal>
        </div>
      </header>

      {/* ---------- 01 The brief ---------- */}
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div>
          <Label n={1} className="text-muted">
            Overview
          </Label>
          <Heading
            text="The brief."
            className="mt-3 text-[clamp(3rem,6vw,5.5rem)]"
            dot="var(--c-main)"
          />
        </div>
        <Reveal>
          <div className="max-w-2xl space-y-6 text-xl leading-relaxed sm:text-2xl">
            {study.brief.map((p, i) => (
              <p key={i} className={i > 0 ? "text-muted" : ""}>
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ---------- 02 The problem ---------- */}
      <section className="text-paper" style={{ background: "var(--c-dark)" }}>
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-36">
          <Label n={2} className="opacity-70">
            The problem
          </Label>
          <ScrubText
            text={study.statement}
            className="mt-6 max-w-6xl text-[clamp(3.2rem,9.5vw,9.5rem)]"
          />
          <div className="mt-14 grid gap-8 md:grid-cols-2 md:gap-14">
            {study.problem.map((p, i) => (
              <Reveal key={i} delay={i * 120}>
                <p className="text-lg leading-relaxed text-paper/80 sm:text-xl">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 03 The thinking ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <Label n={3} className="text-muted">
          Approach
        </Label>
        <Heading
          text="The approach."
          className="mt-3 text-[clamp(3.4rem,9vw,8rem)]"
          dot="var(--c-pop)"
        />
        <ol className="mt-14 grid gap-x-6 gap-y-10 md:grid-cols-3">
          {study.decisions.map((d, i) => {
            const look = cardLooks[i % cardLooks.length];
            return (
              <li key={d.title}>
                <Reveal variant="pop" fromRot={look.from} delay={i * 110}>
                  <div
                    className={`cut-card flex min-h-80 flex-col px-9 pb-12 pt-12 transition-transform duration-300 ease-out hover:-translate-y-2 hover:rotate-0 ${look.rest}`}
                    style={{ background: look.bg, color: look.fg }}
                  >
                    <p className="display text-3xl opacity-60">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="display mt-3 text-5xl">{d.title}</h3>
                    <p className="mt-4 leading-relaxed opacity-90">{d.body}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </section>

      {/* ---------- 04 The identity ---------- */}
      <section className="border-t-[1.5px] border-ink bg-card">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <Label n={4} className="text-muted">
            Identity system
          </Label>
          <Heading
            text="The identity."
            className="mt-3 text-[clamp(3.4rem,9vw,8rem)]"
            dot="var(--c-main)"
          />

          {/* The mark: where it comes from, shown as an equation */}
          <div className="mt-14">
            <p className="label text-muted">The mark</p>
            <Reveal>
              <p className="display mt-3 max-w-4xl text-[clamp(2.4rem,5vw,4.5rem)]">
                {study.mark.idea}
              </p>
            </Reveal>

            <div
              className="cut-v2 mt-10 px-6 py-12 text-paper sm:px-12 sm:py-16"
              style={{ background: "var(--c-dark)" }}
            >
              <ol className="grid items-start gap-y-6 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:gap-x-6">
                {study.mark.parts.map((part, i) => (
                  <Fragment key={part.name}>
                    <li>
                      <Reveal
                        variant="pop"
                        fromRot={i % 2 === 0 ? -8 : 8}
                        delay={i * 260}
                      >
                        <MarkIcon name={part.icon} />
                        <p className="display mt-6 text-center text-4xl">
                          {part.name}
                        </p>
                        <p className="mx-auto mt-3 max-w-xs text-center leading-relaxed text-paper/75">
                          {part.meaning}
                        </p>
                      </Reveal>
                    </li>
                    <li
                      aria-hidden
                      className="display self-start text-center text-6xl md:pt-16"
                      style={{ color: "var(--c-pop)" }}
                    >
                      <Reveal delay={i * 260 + 130}>
                        {i < study.mark.parts.length - 1 ? "+" : "="}
                      </Reveal>
                    </li>
                  </Fragment>
                ))}
                <li>
                  <Reveal
                    variant="pop"
                    fromRot={-10}
                    delay={study.mark.parts.length * 260}
                  >
                    <div className="mx-auto grid h-40 w-40 place-items-center">
                      {/* eslint-disable-next-line @next/next/no-img-element -- small local SVG, nothing to optimise */}
                      <img
                        src={study.mark.symbol.src}
                        alt={study.mark.symbol.alt}
                        className="h-36 w-auto"
                      />
                    </div>
                    <p
                      className="display mt-6 text-center text-4xl"
                      style={{ color: "var(--c-main)" }}
                    >
                      {project.title}
                    </p>
                    <p className="mx-auto mt-3 max-w-xs text-center leading-relaxed text-paper/75">
                      {study.mark.uses}
                    </p>
                  </Reveal>
                </li>
              </ol>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-center">
              <Reveal>
                <p className="label text-muted">What it means</p>
                <p className="mt-3 max-w-md text-lg leading-relaxed sm:text-xl">
                  {study.mark.result}
                </p>
              </Reveal>
              <Shot
                src={study.logo.src}
                alt={study.logo.alt}
                sizes="(min-width: 1024px) 800px, 100vw"
                i={0}
              />
            </div>
          </div>

          {/* Colour */}
          <p className="label mt-20 text-muted">Colour, click to copy</p>
          <ul className="mt-5 grid gap-5 sm:grid-cols-3">
            {study.colors.map((c, i) => (
              <li key={c.hex}>
                <Reveal
                  variant="pop"
                  fromRot={i % 2 === 0 ? -8 : 8}
                  delay={i * 100}
                  className="h-full"
                >
                  <Swatch {...c} />
                </Reveal>
              </li>
            ))}
          </ul>

          {/* Type */}
          <div className="mt-20 grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-center">
            <Reveal>
              <p className="label text-muted">Typeface</p>
              <p className="display mt-3 text-6xl sm:text-7xl">
                {study.typeface.name}
              </p>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
                {study.typeface.note}
              </p>
            </Reveal>
            <Shot
              src={study.typeface.image.src}
              alt={study.typeface.image.alt}
              sizes="(min-width: 1024px) 800px, 100vw"
              i={1}
            />
          </div>
        </div>
      </section>

      {/* ---------- 05 In the world ---------- */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <Label n={5} className="opacity-60">
            Applications
          </Label>
          <Heading
            text="In use."
            className="mt-3 text-[clamp(3.4rem,9vw,8rem)]"
            dot="var(--c-main)"
          />

          <div className="mt-14 space-y-6 sm:space-y-8">
            {rows.map((row, r) => (
              <div
                key={r}
                className={
                  row.length === 2 ? "grid gap-6 sm:gap-8 md:grid-cols-2" : ""
                }
              >
                {row.map((g, k) => (
                  <Shot
                    key={g.src}
                    src={g.src}
                    alt={g.alt}
                    i={r + k}
                    sizes={
                      row.length === 2
                        ? "(min-width: 768px) 600px, 100vw"
                        : "(min-width: 1280px) 1216px, 100vw"
                    }
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 06 What it adds up to ---------- */}
      <section style={{ background: "var(--c-main)", color: dark }}>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <Label n={6} className="opacity-80">
            Outcome
          </Label>
          <Reveal>
            <p className="display mt-5 max-w-6xl text-[clamp(2.8rem,7vw,6.5rem)]">
              {study.closing[0]}
            </p>
          </Reveal>
          <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr] lg:items-end">
            <Reveal delay={120}>
              <div className="max-w-2xl space-y-5 text-lg leading-relaxed sm:text-xl">
                {study.closing.slice(1).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>
            {project.behanceUrl && (
              <a
                href={project.behanceUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Opens Behance ↗"
                className="label inline-flex items-center gap-3 justify-self-start rounded-full border-[1.5px] px-5 py-3 transition-transform hover:-translate-y-0.5 hover:rotate-2 lg:justify-self-end"
                style={{ borderColor: dark }}
              >
                Full presentation on Behance ↗
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ---------- What next ---------- */}
      <nav aria-label="What next" className="bg-accent text-ink">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 sm:py-24 md:grid-cols-2 md:items-end">
          <div>
            <p className="label">Working on a brand?</p>
            <a
              href={booking.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Opens Calendly ↗"
              className="display group mt-3 inline-block text-[clamp(3.4rem,8vw,7rem)]"
            >
              Book a call
              <span
                aria-hidden
                className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2"
              >
                ↗
              </span>
            </a>
          </div>
          <div className="md:text-right">
            <p className="label">{next ? "Next project" : "Keep looking"}</p>
            <Link
              href={next ? `/work/${next.slug}` : "/#work"}
              className="display group mt-3 inline-block text-[clamp(3.4rem,8vw,7rem)]"
            >
              {next ? next.title : "All work"}
              <span
                aria-hidden
                className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-3"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </article>
  );
}
