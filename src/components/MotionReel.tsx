import { motion, type MotionItem } from "@/lib/content";
import { AutoVideo } from "./AutoVideo";
import { Heading } from "./Heading";
import { Reveal } from "./Reveal";
import { Burst, CutEdge } from "./Shapes";

const cuts = ["cut-v1", "cut-v2"];
const chips = ["bg-accent text-ink", "bg-pink text-ink", "bg-tangerine text-ink", "bg-violet text-paper"];
const backs = ["bg-accent", "bg-pink", "bg-tangerine", "bg-violet"];

const aspect: Record<NonNullable<MotionItem["ratio"]>, string> = {
  "16/9": "aspect-[16/9]",
  "9/16": "aspect-[9/16]",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
};

/** One video with its coloured sheet behind and its caption underneath. */
function Piece({ m, i, className = "" }: { m: MotionItem; i: number; className?: string }) {
  return (
    <Reveal variant="pop" fromRot={i % 2 === 0 ? -4 : 4} className={className}>
      <div className={`relative ${aspect[m.ratio ?? "16/9"]}`}>
        <span
          aria-hidden
          className={`absolute inset-0 translate-x-2 translate-y-2 rotate-1 ${backs[i % backs.length]} ${cuts[(i + 1) % cuts.length]}`}
        />
        <AutoVideo
          src={m.src}
          poster={m.poster}
          title={m.title}
          className={`h-full w-full ${cuts[i % cuts.length]}`}
        />
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className={`label rounded-full px-3 py-1 ${chips[i % chips.length]}`}>{m.note}</p>
        <h3 className="display text-4xl sm:text-5xl">{m.title}</h3>
      </div>
    </Reveal>
  );
}

/**
 * Motion design showcase. Videos play when they scroll into view.
 * Upright (9:16) pieces stand in a narrow column on the left with the wide
 * ones stacked beside them. With no upright pieces, the first video runs
 * full width and the rest sit two to a row.
 */
export function MotionReel() {
  const items = motion.items.map((m, i) => ({ m, i }));
  const tall = items.filter(({ m }) => m.ratio === "9/16");
  const wide = items.filter(({ m }) => m.ratio !== "9/16");

  return (
    <section id="motion" className="bg-ink text-paper">
      <CutEdge from="violet" to="ink" flip />
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="label text-paper/60">Motion design</p>
            <Heading
              text={motion.heading}
              className="mt-3 text-[clamp(4rem,13vw,12rem)] text-accent"
              dot="var(--pink)"
            />
          </div>
          <div className="flex max-w-md items-start gap-4 pb-2">
            <Burst points={8} inner={0.5} className="spin-slow mt-1 h-8 w-8 shrink-0 text-tangerine" />
            <p className="text-lg leading-relaxed text-paper/75">{motion.intro}</p>
          </div>
        </div>

        {tall.length > 0 && wide.length > 0 ? (
          <div className="mt-14 grid gap-x-10 gap-y-14 lg:grid-cols-[5fr_8fr]">
            <div className="mx-auto w-full max-w-sm space-y-14 lg:max-w-none">
              {tall.map(({ m, i }) => (
                <Piece key={m.src} m={m} i={i} />
              ))}
            </div>
            <div className="space-y-14">
              {wide.map(({ m, i }) => (
                <Piece key={m.src} m={m} i={i} />
              ))}
            </div>
          </div>
        ) : (
          <ul className="mt-14 grid gap-x-10 gap-y-14 md:grid-cols-2">
            {items.map(({ m, i }, n) => (
              <li
                key={m.src}
                className={
                  m.ratio === "9/16"
                    ? "mx-auto w-full max-w-sm"
                    : n === 0
                      ? "md:col-span-2"
                      : ""
                }
              >
                <Piece m={m} i={i} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <CutEdge from="ink" to="paper" />
    </section>
  );
}
