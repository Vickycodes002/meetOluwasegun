import { booking } from "@/lib/content";
import { Heading } from "./Heading";
import { Reveal } from "./Reveal";
import { Burst, CutEdge } from "./Shapes";

/** Lime band inviting visitors to book a call. Opens Calendly in a new tab. */
export function BookCall() {
  return (
    <section id="book" className="relative overflow-hidden bg-accent text-ink">
      <CutEdge from="paper" to="accent" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        {/* Decoration, tucked into the right side on larger screens */}
        <Burst
          points={12}
          inner={0.72}
          className="spin-slow absolute -right-10 bottom-10 hidden h-56 w-56 text-violet md:block lg:right-8 lg:bottom-14 lg:h-72 lg:w-72"
        />
        <span
          aria-hidden
          className="absolute right-8 top-24 hidden h-20 w-20 rounded-full bg-pink xl:block"
        />

        <p className="label relative">Book a call</p>
        <Heading
          text={booking.heading}
          className="relative mt-3 max-w-5xl text-[clamp(3.4rem,10vw,9.5rem)]"
          dot="var(--tangerine)"
        />

        <Reveal className="relative">
          <p className="mt-8 max-w-xl text-lg leading-relaxed sm:text-xl">{booking.body}</p>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-8">
            <a
              href={booking.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Opens Calendly ↗"
              className="group inline-flex items-center gap-4 rounded-full bg-ink py-3 pl-7 pr-3 text-lg font-medium text-paper transition-transform duration-300 hover:-translate-y-1 hover:-rotate-1 sm:text-xl"
            >
              {booking.button}
              <span
                aria-hidden
                className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-xl text-ink transition-transform duration-300 group-hover:rotate-45"
              >
                ↗
              </span>
            </a>
            <p className="balloon rotate-2 bg-paper px-4 py-2 text-sm font-semibold">
              {booking.aside}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
