"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useResearchModal } from "@/components/shared/ResearchModalProvider";
import type { NeedCategory } from "@/lib/content";

type Props = {
  primaryLabel: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  preselectNeeds?: NeedCategory[];
  notesSeed?: string;
  align?: "center" | "left";
};

export function CTAButtons({
  primaryLabel,
  secondaryLabel,
  secondaryHref,
  preselectNeeds,
  notesSeed,
  align = "center",
}: Props) {
  const { openModal } = useResearchModal();

  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row",
        align === "center" ? "items-center justify-center" : "items-start",
      )}
    >
      <Button
        className="w-full min-h-[44px] bg-[var(--lobola-graphite)] text-[var(--lobola-bone)] hover:bg-[#3a3a3a] sm:w-auto"
        onClick={() => openModal({ preselectNeeds, notesSeed, reason: "cta" })}
      >
        {primaryLabel}
      </Button>

      {secondaryLabel && secondaryHref ? (
        <Button
          variant="outline"
          className="w-full min-h-[44px] border-[var(--lobola-graphite)] text-[var(--lobola-graphite)] sm:w-auto"
          asChild
        >
          <a href={secondaryHref}>{secondaryLabel}</a>
        </Button>
      ) : null}
    </div>
  );
}

