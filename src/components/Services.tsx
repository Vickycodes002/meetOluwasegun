import { services } from "@/lib/content";
import { Heading } from "./Heading";
import { Reveal } from "./Reveal";
import { CutEdge } from "./Shapes";

const looks = [
  { card: "bg-accent text-ink", rest: "-rotate-3", from: -14 },
  { card: "bg-paper text-ink", rest: "rotate-2", from: 12 },
  { card: "bg-pink text-ink", rest: "-rotate-1", from: -10 },
  { card: "bg-tangerine text-ink", rest: "rotate-3", from: 14 },
  { card: "bg-plum text-paper", rest: "-rotate-2", from: -12 },
];

export function Services() {
  return (
    <section id="services" className="bg-violet text-paper">
      <CutEdge from="paper" to="violet" />
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <p className="label text-paper/70">Services</p>
        <Heading text="What you get." className="mt-3 text-[clamp(3.4rem,9vw,8rem)]" />

        <ul className="mt-16 flex flex-wrap justify-center gap-x-6 gap-y-10">
          {services.map((s, i) => {
            const look = looks[i % looks.length];
            return (
              <li key={s.title} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
                <Reveal variant="pop" fromRot={look.from} delay={i * 90}>
                  <div
                    className={`cut-card flex min-h-72 flex-col px-9 pb-12 pt-12 transition-transform duration-300 ease-out hover:-translate-y-2 hover:rotate-0 ${look.card} ${look.rest}`}
                  >
                    <h3 className="display text-5xl">{s.title}</h3>
                    <p className="mt-4 leading-relaxed opacity-85">{s.body}</p>
                    <p className="display mt-auto self-end pt-6 text-3xl opacity-60">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
