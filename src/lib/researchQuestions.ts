import type { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "./supabase";

/** Build a user-facing message explaining why the database update failed. */
function databaseErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "message" in error) {
    const err = error as PostgrestError & { message?: string; code?: string; details?: string };
    const msg = typeof err.message === "string" ? err.message : "";
    const code = typeof err.code === "string" ? err.code : "";
    const details = typeof err.details === "string" ? err.details : "";
    if (msg) {
      const parts = ["We couldn't save your answers to the database."];
      parts.push(`Reason: ${msg}`);
      if (code) parts.push(`(Error code: ${code})`);
      if (details) parts.push(details);
      return parts.join(" ");
    }
  }
  if (error instanceof Error) return error.message;
  return "We couldn't save your answers to the database. Please check your connection and try again.";
}

export type ResearchSubmission = {
  purpose: string[];
  timing: string;
  challenge: string;
  engagement: string;
  pricing: string;
  fullName: string;
  email: string;
  phone: string;
  preferredLanguage: string;
  consent: boolean;
  submittedAt: string; // ISO
  source: string; // e.g. "scroll60", "how-it-works", "bundles", "services-carousel", "hero", "contact", "footer"
};

/** Payload for save-on-next (upsert by sessionId in Google Sheets). */
export type ResearchProgressPayload = {
  sessionId: string;
  submitted: boolean;
  purpose?: string[];
  timing?: string;
  challenge?: string;
  engagement?: string;
  pricing?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  preferredLanguage?: string;
  consent?: boolean;
  submittedAt?: string;
  source?: string;
};

// Step 1: Intro
export const step1Intro = {
  heading: "You've gotten this far — let us know more about what you need this service for.",
  subtext:
    "We're building this platform properly. Your input helps us prioritise the right services first.",
  continueButton: "Continue",
};

// Step 2: Purpose (multi-select)
export const step2Purpose = {
  question: "What are you here for?",
  options: [
    "Paid Lobola to someone you are no longer with",
    "Lobola / customary process",
    "Prenuptial agreement",
    "Divorce / separation",
    "Will / estate planning",
    "Trust / family wealth planning",
    "Business & family structuring",
  ] as const,
};

export type PurposeOption = (typeof step2Purpose.options)[number];

// Step 3: Timing (single select)
export const step3Timing = {
  question: "When do you realistically need help?",
  options: [
    "Immediately",
    "Within 1 month",
    "1–3 months",
    "3–6 months",
  ] as const,
};

export type TimingOption = (typeof step3Timing.options)[number];

// Step 4: Core pain (single select)
export const step4Challenge = {
  question: "What's the biggest challenge for you in this process?",
  options: [
    "I don't understand the legal process",
    "I don't know what documents I need",
    "I don't trust the system or lawyers",
    "It feels too complicated",
    "I can't afford traditional legal services",
  ] as const,
};

export type ChallengeOption = (typeof step4Challenge.options)[number];

// Step 5: Engagement preference (single select)
export const step5Engagement = {
  question: "How would you prefer to engage with this service?",
  options: [
    "Fully online",
    "Online + human support",
    "In-person support",
    "WhatsApp",
    "Phone calls",
    "Email",
  ] as const,
};

export type EngagementOption = (typeof step5Engagement.options)[number];

// Step 6: Pricing perception (single select)
export const step6Pricing = {
  question: "What feels reasonable for digital legal services like this?",
  options: [
    "Free information only",
    "R500-R5 000",
    "R5 000-R10 000",
    "R10 000+",
    "Depends on the service",
  ] as const,
};

export type PricingOption = (typeof step6Pricing.options)[number];

// Step 7: Lead capture
export const step7LeadCapture = {
  heading: "Be part of building this properly.",
  subtext:
    "We're building a platform that protects families, marriages, and legacies. Leave your details so we can:\n- Share updates as services launch\n- Invite you to early access\n- Offer priority onboarding\n- Involve you in shaping the platform\n- Connect you to the right services when they go live",
  consentLabel:
    "I agree to be contacted about these services and platform updates.",
  submitButton: "Join the platform early",
};

// Success message
export const successMessage = {
  title:
    "You're part of something meaningful. We'll be in touch as we roll this out properly.",
};

// Languages (from content.ts, but included here for reference)
export const languages = [
  "English (legally prevailing)",
  "isiZulu",
  "isiXhosa",
  "Afrikaans",
  "Sepedi",
  "Setswana",
  "Sesotho",
  "siSwati",
  "Tshivenda",
  "Xitsonga",
  "isiNdebele",
] as const;

export type Language = (typeof languages)[number];

/** Saves partial or final progress to Google Sheets (upsert by sessionId). Fire-and-forget. */
export function saveResearchProgress(
  sessionId: string,
  data: Partial<ResearchSubmission> & { source: string },
  submitted: boolean,
): void {
  const full: ResearchProgressPayload = {
    sessionId,
    submitted,
    purpose: data.purpose ?? [],
    timing: data.timing ?? "",
    challenge: data.challenge ?? "",
    engagement: data.engagement ?? "",
    pricing: data.pricing ?? "",
    fullName: data.fullName ?? "",
    email: data.email ?? "",
    phone: data.phone ?? "",
    preferredLanguage: data.preferredLanguage ?? "",
    consent: data.consent ?? false,
    submittedAt: data.submittedAt ?? new Date().toISOString(),
    source: data.source ?? "",
  };
  const base = typeof window !== "undefined" ? window.location.origin : "";
  fetch(`${base}/api/submit-research-sheets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(full),
  }).catch(() => {
    // fire-and-forget
  });
}

// Submit function: stores in Supabase when configured, else falls back to localStorage
export async function submitResearch(
  data: ResearchSubmission,
  options?: { sessionId?: string },
): Promise<void> {
  const storageKey = "lobola_research_submissions";
  const submittedKey = "lobola_research_modal_submitted";

  try {
    if (supabase) {
      const { error } = await supabase.from("research_submissions").insert({
        purpose: data.purpose,
        timing: data.timing,
        challenge: data.challenge,
        engagement: data.engagement,
        pricing: data.pricing,
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        preferred_language: data.preferredLanguage,
        consent: data.consent,
        submitted_at: data.submittedAt,
        source: data.source,
      });
      if (error) {
        const userMessage = databaseErrorMessage(error);
        throw new Error(userMessage);
      }
    }

    // Also send to Google Sheets (via our API route); include sessionId so same row is updated
    try {
      const base =
        typeof window !== "undefined" ? window.location.origin : "";
      const sheetsBody = {
        ...data,
        ...(options?.sessionId != null && { sessionId: options.sessionId, submitted: true }),
      };
      const res = await fetch(`${base}/api/submit-research-sheets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sheetsBody),
      });
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        // eslint-disable-next-line no-console
        console.warn("[lobola] Google Sheets submit failed", res.status, errBody);
      }
    } catch (sheetsErr) {
      // eslint-disable-next-line no-console
      console.warn("[lobola] Google Sheets request error", sheetsErr);
    }

    // Fallback / backup: also keep in localStorage when Supabase isn't configured
    const existingRaw = typeof localStorage !== "undefined" ? localStorage.getItem(storageKey) : null;
    const existing = existingRaw ? (JSON.parse(existingRaw) as unknown[]) : [];
    const next = Array.isArray(existing) ? [...existing, data] : [data];
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(storageKey, JSON.stringify(next));
      localStorage.setItem(submittedKey, "true");
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[lobola] Failed to store research submission", error);
    const userMessage = databaseErrorMessage(error);
    throw new Error(userMessage);
  }
}
