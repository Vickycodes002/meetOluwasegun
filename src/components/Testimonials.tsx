import { testimonials } from "@/lib/content";
import { Heading } from "./Heading";
import { CardMarquee } from "./Marquee";
import { CutEdge } from "./Shapes";

const balloons = ["bg-paper", "bg-accent", "bg-paper", "bg-pink"];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Each quote sits in a speech balloon, with the speaker underneath the tail. */
function Card({ index }: { index: number }) {
  const t = testimonials[index];
  return (
    <figure className="flex w-[min(86vw,27rem)] shrink-0 flex-col">
      <div className={`balloon flex-1 p-7 text-ink sm:p-8 ${balloons[index % balloons.length]}`}>
        <p className="label inline-block rounded-full bg-ink px-3 py-1 text-paper">
          {String(index + 1).padStart(2, "0")} / {t.project}
        </p>
        <blockquote className="mt-5 text-lg font-medium leading-snug sm:text-xl">
          &ldquo;{t.quote}&rdquo;
        </blockquote>
      </div>
      <figcaption className="mt-6 flex items-center gap-3 pl-3">
        <span
          aria-hidden
          className="display flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-xl text-accent"
        >
          {initials(t.name)}
        </span>
        <span className="text-sm text-ink">
          <span className="block font-semibold">{t.name}</span>
          <span className="block opacity-75">{t.title}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const indexes = testimonials.map((_, i) => i);

  return (
    <section aria-labelledby="proof-heading" className="overflow-hidden bg-tangerine text-ink">
      <CutEdge from="paper" to="tangerine" flip />
      <div className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="label">Kind words</p>
          <Heading
            id="proof-heading"
            text="Don't take my word for it."
            className="mt-3 max-w-5xl text-[clamp(3.4rem,9vw,8rem)]"
            dot="var(--paper)"
          />
        </div>

        <div className="mt-14">
          <CardMarquee direction="right" duration={110}>
            {[
              ...indexes.map((i) => <Card key={`a-${i}`} index={i} />),
              // Second copy keeps the strip wider than any screen. Hidden from screen readers.
              ...indexes.map((i) => (
                <div key={`b-${i}`} aria-hidden className="flex">
                  <Card index={i} />
                </div>
              )),
            ]}
          </CardMarquee>
        </div>
      </div>
      <CutEdge from="tangerine" to="paper" />
    </section>
  );
}
