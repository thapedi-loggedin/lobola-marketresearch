"use client";

import * as React from "react";
import type { NeedCategory } from "@/lib/content";
import { ResearchModal } from "@/components/shared/ResearchModal";

type OpenReason = "cta" | "scroll60";

type OpenArgs = {
  preselectNeeds?: NeedCategory[];
  notesSeed?: string;
  reason?: OpenReason;
};

type ResearchModalContextValue = {
  openModal: (args?: OpenArgs) => void;
};

const ResearchModalContext = React.createContext<ResearchModalContextValue | null>(
  null,
);

const AUTO_DISMISSED_KEY = "lobola_research_modal_dismissed";
const SUBMITTED_KEY = "lobola_research_modal_submitted";

export function ResearchModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const [preselectNeeds, setPreselectNeeds] = React.useState<NeedCategory[]>([]);
  const [notesSeed, setNotesSeed] = React.useState<string>("");
  const [source, setSource] = React.useState<OpenReason>("cta");
  const autoOpenedOnceRef = React.useRef(false);

  const openModal = React.useCallback((args?: OpenArgs) => {
    const reason = args?.reason ?? "cta";
    setSource(reason);
    setPreselectNeeds(args?.preselectNeeds ?? []);
    setNotesSeed(args?.notesSeed ?? "");
    setOpen(true);
  }, []);

  const onOpenChange = React.useCallback((nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      // Only affects the auto-open behavior, not CTA opens.
      try {
        sessionStorage.setItem(AUTO_DISMISSED_KEY, "true");
      } catch {
        // ignore
      }
    }
  }, []);

  React.useEffect(() => {
    const isDismissedForSession = () => {
      try {
        return sessionStorage.getItem(AUTO_DISMISSED_KEY) === "true";
      } catch {
        return false;
      }
    };

    const hasSubmittedPreviously = () => {
      try {
        return localStorage.getItem(SUBMITTED_KEY) === "true";
      } catch {
        return false;
      }
    };

    const onScroll = () => {
      if (autoOpenedOnceRef.current) return;
      if (open) return;
      if (isDismissedForSession()) return;
      if (hasSubmittedPreviously()) return;

      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const progress = window.scrollY / maxScroll;

      if (progress >= 0.6) {
        autoOpenedOnceRef.current = true;
        openModal({ reason: "scroll60" });
      }
    };

    let rafId: number | null = null;
    const onScrollThrottled = () => {
      if (rafId != null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        onScroll();
      });
    };

    window.addEventListener("scroll", onScrollThrottled, { passive: true });
    // Run once in case user loads mid-page.
    onScroll();

    return () => {
      if (rafId != null) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScrollThrottled);
    };
  }, [open, openModal]);

  const value = React.useMemo<ResearchModalContextValue>(
    () => ({ openModal }),
    [openModal],
  );

  return (
    <ResearchModalContext.Provider value={value}>
      {children}
      <ResearchModal
        open={open}
        onOpenChange={onOpenChange}
        preselectNeeds={preselectNeeds}
        notesSeed={notesSeed}
        source={source}
      />
    </ResearchModalContext.Provider>
  );
}

export function useResearchModal() {
  const ctx = React.useContext(ResearchModalContext);
  if (!ctx) {
    throw new Error("useResearchModal must be used within ResearchModalProvider");
  }
  return ctx;
}

