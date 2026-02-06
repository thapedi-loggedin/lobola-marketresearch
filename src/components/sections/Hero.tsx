"use client";

import { hero } from "@/lib/content";
import { CTAButtons } from "@/components/shared/CTAButtons";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";

export function Hero() {
  return (
    <section id="home" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--lobola-muted-text)]">
            {hero.label}
          </p>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight text-[var(--lobola-graphite)] sm:text-5xl">
            {hero.headline}
          </h1>
          <p className="mt-3 text-lg text-[var(--lobola-warm-gray)] sm:text-xl">
            {hero.subheadline}
          </p>

          <Separator className="mx-auto my-7 w-28 bg-[var(--lobola-gold)]/70" />

          <p className="mx-auto max-w-2xl text-base leading-7 text-[var(--lobola-text)] break-words">
            {hero.body}
          </p>

          <ul className="mx-auto mt-8 grid max-w-2xl gap-3 text-left text-sm text-[var(--lobola-text)] sm:grid-cols-2">
            {hero.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-[var(--lobola-gold)]" />
                <span className="break-words">{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <CTAButtons
              primaryLabel={hero.ctaPrimary}
              secondaryLabel={hero.ctaSecondary}
              secondaryHref="#services"
              align="center"
              source="hero"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

