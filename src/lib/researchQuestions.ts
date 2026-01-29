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
  source: "scroll60" | "cta";
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
    "Getting married",
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

// Submit function
export async function submitResearch(
  data: ResearchSubmission,
): Promise<void> {
  const storageKey = "lobola_research_submissions";
  const submittedKey = "lobola_research_modal_submitted";

  try {
    // Append to submissions array
    const existingRaw = localStorage.getItem(storageKey);
    const existing = existingRaw ? (JSON.parse(existingRaw) as unknown[]) : [];
    const next = Array.isArray(existing) ? [...existing, data] : [data];
    localStorage.setItem(storageKey, JSON.stringify(next));

    // Set submitted flag
    localStorage.setItem(submittedKey, "true");

    // Console log for debugging
    // eslint-disable-next-line no-console
    console.log("[lobola] ResearchSubmission", data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[lobola] Failed to store research submission", error);
  }
}
