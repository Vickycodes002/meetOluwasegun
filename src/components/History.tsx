import Link from "next/link";
import { history, site } from "@/lib/content";
import { Heading } from "./Heading";
import { Reveal } from "./Reveal";

export function History() {
  return (
    <section id="experience" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="label text-muted">Experience</p>
          <Heading text="Where I've been." className="mt-3 text-[clamp(3.4rem,9vw,8rem)]" dot="var(--tangerine)" />
        </div>
        <a
          href={site.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-3 rounded-full border-[1.5px] border-ink bg-accent px-5 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5 hover:rotate-2"
        >
          View resume ↗
        </a>
      </div>

      <ul className="border-t-[1.5px] border-ink">
        {history.map((h) => (
          <li
            key={`${h.role}-${h.period}`}
            className="group relative border-b-[1.5px] border-ink"
          >
            {/* Lime sheet that slides up behind the row on hover */}
            <span
              aria-hidden
              className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-y-100"
            />
            <Reveal className="relative grid gap-3 px-2 py-8 sm:px-4 md:grid-cols-[1.2fr_2fr_7rem] md:items-center md:gap-10">
              <p className="label md:order-3 md:text-right">{h.period}</p>
              <h3 className="display text-4xl sm:text-5xl md:order-1">
                {h.role}
                {h.org && <span className="text-muted"> at {h.org}</span>}
              </h3>
              <p className="max-w-xl leading-relaxed text-muted group-hover:text-ink md:order-2">{h.body}</p>
            </Reveal>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-sm text-muted">
        Want the long version?{" "}
        <Link href="/#contact" className="underline underline-offset-4 hover:text-ink">
          Ask me
        </Link>
        .
      </p>
    </section>
  );
}
