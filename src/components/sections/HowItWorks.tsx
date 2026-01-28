"use client";

import { howItWorks } from "@/lib/content";
import { Separator } from "@/components/ui/separator";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--lobola-muted-text)]">
            {howItWorks.label}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[var(--lobola-graphite)] sm:text-4xl">
            {howItWorks.heading}
          </h2>
          <Separator className="my-6 w-20 bg-[var(--lobola-gold)]/60" />

          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {howItWorks.steps.map((step, idx) => (
              <li
                key={step}
                className="rounded-md border border-border bg-white px-4 py-4"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--lobola-muted-text)]">
                  Step {idx + 1}
                </p>
                <p className="mt-2 text-sm font-medium text-[var(--lobola-text)] break-words">
                  {step}
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-6 text-sm font-medium text-[var(--lobola-warm-gray)] break-words">
            {howItWorks.closingLine}
          </p>
        </div>
      </div>
    </section>
  );
}

