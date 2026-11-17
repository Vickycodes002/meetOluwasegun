import Image from "next/image";
import { about } from "@/lib/content";
import { Heading } from "./Heading";
import { Reveal } from "./Reveal";

const tilt = ["-rotate-3", "rotate-2", "rotate-3", "-rotate-2"];
const cuts = ["cut-a", "cut-b", "cut-c", "cut-d"];
const backs = ["bg-accent", "bg-pink", "bg-violet", "bg-tangerine"];

export function About() {
  return (
    <section id="about">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="label text-muted">About</p>
          <Heading text={about.heading} className="mt-3 text-[clamp(3.4rem,8vw,7rem)]" />
          <Reveal>
            <div className="mt-8 max-w-lg space-y-5 text-lg leading-relaxed text-muted">
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>

        <ul className="grid grid-cols-2 gap-5 sm:gap-7">
          {about.photos.map((ph, i) => (
            <li key={ph.src} className={i % 2 === 1 ? "mt-10" : ""}>
              <Reveal variant="pop" fromRot={i % 2 === 0 ? -12 : 12} delay={i * 90}>
                <div
                  className={`group relative aspect-[4/5] transition-transform duration-500 hover:rotate-0 ${tilt[i % tilt.length]}`}
                >
                  <span
                    aria-hidden
                    className={`absolute inset-0 translate-x-2 translate-y-2 transition-transform duration-500 group-hover:translate-x-3 group-hover:translate-y-3 ${backs[i % backs.length]} ${cuts[(i + 2) % cuts.length]}`}
                  />
                  <div className={`relative h-full w-full overflow-hidden bg-line ${cuts[i % cuts.length]}`}>
                    <Image
                      src={ph.src}
                      alt={ph.alt}
                      fill
                      sizes="(min-width: 1024px) 300px, 45vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
