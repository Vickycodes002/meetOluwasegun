import { booking, site } from "@/lib/content";
import { CopyEmail } from "./CopyEmail";
import { Heading } from "./Heading";
import { PatternStrip } from "./Shapes";
import { Year } from "./Year";

export function Footer() {
  return (
    <footer id="contact" className="bg-plum text-paper">
      <PatternStrip />
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-20 sm:px-8 sm:pt-28">
        <p className="balloon inline-block -rotate-2 bg-accent px-4 py-2 text-sm font-semibold text-ink">
          Got a brand that can&apos;t decide?
        </p>
        <Heading
          text="Let's make up its mind."
          className="display-tight mt-8 text-[clamp(3.6rem,13vw,13rem)] text-accent"
          dot="var(--tangerine)"
        />

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${site.email}`}
            data-cursor="Write to me"
            className="break-all text-2xl font-medium underline decoration-accent decoration-2 underline-offset-8 transition-colors hover:text-accent sm:text-4xl"
          >
            {site.email}
          </a>
          <CopyEmail email={site.email} />
          <a
            href={booking.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5 hover:rotate-2"
          >
            Or book a call ↗
          </a>
        </div>

        <div className="mt-24 flex flex-col gap-8 border-t border-paper/15 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper/70 transition-colors hover:text-accent"
                >
                  {s.label} ↗
                </a>
              </li>
            ))}
            <li>
              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper/70 transition-colors hover:text-accent"
              >
                Resume ↗
              </a>
            </li>
          </ul>
          <p className="text-paper/50">
            © <Year /> {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
