"use client";

import { contact } from "@/lib/content";
import { Separator } from "@/components/ui/separator";
import { CTAButtons } from "@/components/shared/CTAButtons";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--lobola-muted-text)]">
            {contact.label}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[var(--lobola-graphite)] sm:text-4xl">
            {contact.heading}
          </h2>
          <Separator className="my-6 w-20 bg-[var(--lobola-gold)]/60" />

          <div className="rounded-md border border-border bg-white p-5 sm:p-6">
            <div className="space-y-1 text-sm text-[var(--lobola-warm-gray)]">
              <p>{contact.siteLine}</p>
              <p>{contact.emailLine}</p>
            </div>
            <div className="mt-6">
              <CTAButtons primaryLabel={contact.footerCtaButton} align="left" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

