"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { services, servicesSection } from "@/lib/content";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useResearchModal } from "@/components/shared/ResearchModalProvider";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  FileText,
  Scale,
  Landmark,
  Building2,
  Check,
  ScrollText,
} from "lucide-react";
import { cn } from "@/lib/utils";

const serviceIconByKey: Record<string, React.ReactNode> = {
  marriage_services: <ShieldCheck className="size-5 text-[var(--lobola-gold)]" />,
  prenuptial_agreements: <FileText className="size-5 text-[var(--lobola-gold)]" />,
  divorce_separation: <Scale className="size-5 text-[var(--lobola-gold)]" />,
  estate_planning: <Landmark className="size-5 text-[var(--lobola-gold)]" />,
  business_family_structures: (
    <Building2 className="size-5 text-[var(--lobola-gold)]" />
  ),
  lobola_letters_contracts: (
    <ScrollText className="size-5 text-[var(--lobola-gold)]" />
  ),
};

export function ServicesCarousel() {
  const { openModal } = useResearchModal();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="services" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--lobola-muted-text)]">
            {servicesSection.label}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[var(--lobola-graphite)] sm:text-4xl">
            {servicesSection.heading}
          </h2>
          <Separator className="my-6 w-20 bg-[var(--lobola-gold)]/60" />
        </div>

        <div className="relative mt-8">
          {/* Desktop arrows */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden items-center lg:flex">
            <Button
              type="button"
              variant="outline"
              className="pointer-events-auto ml-2 min-h-[44px] min-w-[44px]"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canScrollPrev}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="size-4" />
            </Button>
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden items-center lg:flex">
            <Button
              type="button"
              variant="outline"
              className="pointer-events-auto mr-2 min-h-[44px] min-w-[44px]"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canScrollNext}
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="size-4" />
            </Button>
          </div>

          <div
            className="overflow-hidden"
            ref={emblaRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Service categories"
          >
            <div className="-ml-4 flex touch-pan-y">
              {services.map((s) => (
                <div
                  key={s.key}
                  className={cn(
                    "pl-4",
                    "flex-[0_0_100%] md:flex-[0_0_78%] lg:flex-[0_0_33.333%]",
                  )}
                >
                  <div className="h-full rounded-md border border-border bg-white p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="grid size-9 place-items-center rounded-md border border-border bg-[var(--lobola-bone)]">
                          {serviceIconByKey[s.key] ?? (
                            <span className="text-sm">{s.iconLabel}</span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-serif text-xl text-[var(--lobola-graphite)] break-words">
                            {s.title}
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-[var(--lobola-warm-gray)] break-words">
                      {s.intro}
                    </p>

                    <ul className="mt-4 space-y-2 text-sm text-[var(--lobola-text)]">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <Check className="mt-0.5 size-4 shrink-0 text-[var(--lobola-gold)]" />
                          <span className="break-words">{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6">
                      <Button
                        className="w-full min-h-[44px] bg-[var(--lobola-graphite)] text-[var(--lobola-bone)] hover:bg-[#3a3a3a]"
                        onClick={() =>
                          openModal({
                            preselectNeeds: [s.preselectNeed],
                            reason: "cta",
                          })
                        }
                      >
                        {servicesSection.cardCta}
                        <ArrowRight className="ml-2 size-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="mt-5 flex items-center justify-center gap-2">
            {scrollSnaps.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={cn(
                  "h-3 w-3 rounded-full border border-[var(--lobola-graphite)] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center p-2",
                  idx === selectedIndex
                    ? "bg-[var(--lobola-graphite)]"
                    : "bg-transparent",
                )}
                onClick={() => emblaApi?.scrollTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              >
                <span className="sr-only">Go to slide {idx + 1}</span>
              </button>
            ))}
          </div>
        </div>

        {/* CTA strip below carousel */}
        <div className="mt-10 rounded-md border border-border bg-white px-4 py-4 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[var(--lobola-text)]">
              <span className="font-medium">{servicesSection.stripLabel}</span>
            </p>
            <Button
              className="min-h-[44px] bg-[var(--lobola-graphite)] text-[var(--lobola-bone)] hover:bg-[#3a3a3a]"
              onClick={() => openModal({ reason: "cta" })}
            >
              {servicesSection.stripButton}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

