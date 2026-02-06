"use client";

import { CTAButtons } from "@/components/shared/CTAButtons";
import { contact, site } from "@/lib/content";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t border-border bg-[var(--lobola-bone)]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div className="space-y-2">
            <p className="font-serif text-lg text-[var(--lobola-graphite)]">
              {site.name}
            </p>
            <p className="text-sm text-[var(--lobola-muted-text)]">
              {contact.siteLine}
            </p>
            <p className="text-sm text-[var(--lobola-muted-text)]">
              {contact.emailLine}
            </p>
          </div>

          <div className="space-y-4 md:text-right">
            <p className="font-serif text-xl text-[var(--lobola-graphite)]">
              {contact.footerCtaHeadline}
            </p>
            <CTAButtons primaryLabel={contact.footerCtaButton} source="footer" />
          </div>
        </div>

        <Separator className="my-8" />

        <p className="text-xs text-[var(--lobola-muted-text)]">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

