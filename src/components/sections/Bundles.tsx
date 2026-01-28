"use client";

import { bundles, bundlesSection } from "@/lib/content";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useResearchModal } from "@/components/shared/ResearchModalProvider";
import { Check } from "lucide-react";

export function Bundles() {
  const { openModal } = useResearchModal();

  return (
    <section id="bundles" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--lobola-muted-text)]">
            {bundlesSection.label}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[var(--lobola-graphite)] sm:text-4xl">
            {bundlesSection.heading}
          </h2>
          <Separator className="my-6 w-20 bg-[var(--lobola-gold)]/60" />
        </div>

        <div className="mx-auto mt-8 max-w-4xl">
          <Accordion type="single" collapsible className="w-full">
            {bundles.map((b) => (
              <AccordionItem key={b.key} value={b.key} className="border-border">
                <AccordionTrigger className="text-left">
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="font-serif text-lg text-[var(--lobola-graphite)] break-words">
                      {b.iconLabel} {b.name}
                    </span>
                    <span className="mt-1 text-sm text-[var(--lobola-muted-text)] break-words">
                      {b.forWho}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <ul className="space-y-2 text-sm text-[var(--lobola-text)]">
                      {b.bullets.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <Check className="mt-0.5 size-4 shrink-0 text-[var(--lobola-gold)]" />
                          <span className="break-words">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex justify-end">
                      <Button
                        className="min-h-[44px] bg-[var(--lobola-graphite)] text-[var(--lobola-bone)] hover:bg-[#3a3a3a]"
                        onClick={() =>
                          openModal({
                            reason: "cta",
                            notesSeed: `Interested in bundle: ${b.name}`,
                          })
                        }
                      >
                        {bundlesSection.cardCta}
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

