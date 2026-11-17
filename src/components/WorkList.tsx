import Image from "next/image";
import Link from "next/link";
import { isOnSite, projectHref, projects, type Project } from "@/lib/content";
import { Heading } from "./Heading";
import { Reveal } from "./Reveal";

const cuts = ["cut-a", "cut-b", "cut-c", "cut-d"];
const backs = ["bg-accent", "bg-violet", "bg-tangerine", "bg-pink"];
const tilts = ["group-hover:-rotate-1", "group-hover:rotate-1"];

function Card({ p, i }: { p: Project; i: number }) {
  const external = !isOnSite(p);
  const className = "group block";
  const cut = cuts[i % cuts.length];

  const inner = (
    <>
      <div className={`relative ${i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
        {/* Coloured sheet behind the image. It slides out further on hover. */}
        <div
          aria-hidden
          className={`absolute inset-0 translate-x-2 translate-y-2 rotate-1 transition-transform duration-500 ease-out group-hover:translate-x-4 group-hover:translate-y-4 group-hover:rotate-2 ${backs[i % backs.length]} ${cuts[(i + 1) % cuts.length]}`}
        />
        <Reveal variant="wipe" className="absolute inset-0">
          <div className="h-full w-full">
            <div
              className={`relative h-full w-full overflow-hidden bg-line transition-transform duration-500 ease-out ${tilts[i % tilts.length]} ${cut}`}
            >
              <Image
                src={p.cover}
                alt={`${p.title} cover`}
                fill
                sizes={
                  i === 0
                    ? "(min-width: 1280px) 1216px, 100vw"
                    : "(min-width: 768px) 600px, 100vw"
                }
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-7 flex items-start justify-between gap-6">
        <div>
          <p className="label inline-block rounded-full bg-ink px-3 py-1 text-paper">
            {String(i + 1).padStart(2, "0")} / {p.year}
          </p>
          <h3 className="display mt-3 text-5xl sm:text-6xl">{p.title}</h3>
          <p className="mt-2 max-w-md text-muted">{p.summary}</p>
        </div>
        <span
          aria-hidden
          className="mt-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-[1.5px] border-ink text-xl transition-all duration-300 group-hover:rotate-45 group-hover:bg-accent"
        >
          ↗
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {p.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-ink/25 px-3 py-1 text-xs font-medium"
          >
            {t}
          </span>
        ))}
      </div>
    </>
  );

  return external ? (
    <a
      href={projectHref(p)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      data-cursor="See it on Behance ↗"
      aria-label={`${p.title}, full case study on Behance (opens in a new tab)`}
    >
      {inner}
    </a>
  ) : (
    <Link
      href={projectHref(p)}
      className={className}
      data-cursor="Read the case study"
    >
      {inner}
    </Link>
  );
}

export function WorkList() {
  return (
    <section
      id="work"
      className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="label text-muted">Selected work</p>
          <Heading
            text="Proof I do more than talk."
            className="mt-3 max-w-4xl text-[clamp(3.4rem,9vw,8rem)]"
          />
        </div>
        <p
          className="balloon bg-accent px-4 py-2 text-sm font-semibold"
          data-tail="right"
        >
          {String(projects.length).padStart(2, "0")} projects, more on Behance
        </p>
      </div>

      <ul className="grid gap-x-10 gap-y-20 md:grid-cols-2">
        {projects.map((p, i) => (
          <li key={p.slug} className={i === 0 ? "md:col-span-2" : ""}>
            <Card p={p} i={i} />
          </li>
        ))}
      </ul>
    </section>
  );
}
