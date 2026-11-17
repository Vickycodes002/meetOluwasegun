"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/content";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Motion", href: "/#motion" },
  { label: "About", href: "/#about" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        <Link
          href="/"
          className="display group text-4xl"
          onClick={() => setOpen(false)}
          aria-label={`${site.name}, home`}
        >
          {site.shortName}
          <span
            aria-hidden
            className="ml-0.5 inline-block h-2.5 w-2.5 rounded-full bg-accent ring-[1.5px] ring-ink transition-transform duration-300 group-hover:-translate-y-2"
          />
        </Link>

        <ul className="hidden items-center gap-8 text-sm font-medium md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="relative py-1 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-ink after:transition-transform hover:after:scale-x-100"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/#book"
              className="inline-block rounded-full border-[1.5px] border-ink bg-accent px-4 py-2 text-ink transition-transform hover:-translate-y-0.5 hover:-rotate-2"
            >
              Book a call
            </Link>
          </li>
        </ul>

        <button
          type="button"
          className="-mr-2 p-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-6">
            <span
              className={`absolute left-0 h-0.5 w-6 bg-ink transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 h-0.5 w-6 bg-ink transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`}
            />
          </span>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-accent md:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-5 py-4 sm:px-8">
            {[
              ...links,
              { label: "Book a call", href: "/#book" },
              { label: "Contact", href: "/#contact" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="display block py-2 text-6xl"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
