"use client";

import { legal } from "@/lib/content";
import { Separator } from "@/components/ui/separator";

export function Legal() {
  return (
    <section id="legal" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--lobola-muted-text)]">
            {legal.label}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[var(--lobola-graphite)] sm:text-4xl">
            {legal.heading}
          </h2>
          <Separator className="my-6 w-20 bg-[var(--lobola-gold)]/60" />

          <ul className="grid gap-2">
            {legal.acts.map((a) => (
              <li
                key={a}
                className="rounded-md border border-border bg-white px-4 py-3 text-sm text-[var(--lobola-text)] break-words"
              >
                {a}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-md border border-border bg-white p-5">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--lobola-muted-text)]">
              {legal.disclaimerTitle}
            </p>
            <p className="mt-2 text-sm text-[var(--lobola-warm-gray)] break-words">
              {legal.disclaimerBody}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

