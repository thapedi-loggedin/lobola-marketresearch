"use client";

import { languages, languagesSection } from "@/lib/content";
import { Separator } from "@/components/ui/separator";

export function Languages() {
  return (
    <section id="languages" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--lobola-muted-text)]">
            {languagesSection.label}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[var(--lobola-graphite)] sm:text-4xl">
            {languagesSection.heading}
          </h2>
          <Separator className="my-6 w-20 bg-[var(--lobola-gold)]/60" />
          <p className="text-sm leading-6 text-[var(--lobola-warm-gray)]">
            {languagesSection.body}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {languages.map((lang) => (
              <li
                key={lang}
                className="rounded-md border border-border bg-white px-3 py-2 text-sm text-[var(--lobola-text)] break-words"
              >
                {lang}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

