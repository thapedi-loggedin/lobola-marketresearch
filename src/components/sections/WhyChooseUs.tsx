"use client";

import { whyChooseUs } from "@/lib/content";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";

export function WhyChooseUs() {
  return (
    <section id="why-us" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--lobola-muted-text)]">
            {whyChooseUs.label}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[var(--lobola-graphite)] sm:text-4xl">
            {whyChooseUs.heading}
          </h2>
          <Separator className="my-6 w-20 bg-[var(--lobola-gold)]/60" />

          <ul className="grid gap-3 sm:grid-cols-2">
            {whyChooseUs.bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-2 rounded-md border border-border bg-white px-4 py-4 text-sm text-[var(--lobola-text)]"
              >
                <Check className="mt-0.5 size-4 shrink-0 text-[var(--lobola-gold)]" />
                <span className="break-words">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

