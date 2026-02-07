"use client";

import { about } from "@/lib/content";
import { Separator } from "@/components/ui/separator";

export function About() {
  return (
    <section id="about" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--lobola-muted-text)]">
            {about.label}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[var(--lobola-graphite)] sm:text-4xl">
            {about.heading}
          </h2>
          <Separator className="my-6 w-20 bg-[var(--lobola-gold)]/60" />

          <p className="text-sm leading-6 text-[var(--lobola-warm-gray)] break-words">
            {about.body}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <img
              src={about.partnerLogo}
              alt="RJS Inc Attorneys"
              className="h-12 w-auto"
            />
            <p className="text-sm text-[var(--lobola-warm-gray)]">
              {about.partnershipText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

