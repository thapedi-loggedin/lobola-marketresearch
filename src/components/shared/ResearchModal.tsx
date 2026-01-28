"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  step1Intro,
  step2Purpose,
  step3Timing,
  step4Challenge,
  step5Engagement,
  step6Pricing,
  step7LeadCapture,
  successMessage,
  languages,
  submitResearch,
  type ResearchSubmission,
  type PurposeOption,
  type TimingOption,
  type ChallengeOption,
  type EngagementOption,
  type PricingOption,
  type Language,
} from "@/lib/researchQuestions";
import type { NeedCategory } from "@/lib/content";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizePhone(phone: string) {
  return phone.replace(/[^\d+]/g, "").trim();
}

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preselectNeeds?: NeedCategory[];
  notesSeed?: string;
  source: "scroll60" | "cta";
};

export function ResearchModal({
  open,
  onOpenChange,
  preselectNeeds = [],
  notesSeed = "",
  source,
}: Props) {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [purpose, setPurpose] = React.useState<Set<PurposeOption>>(new Set());
  const [timing, setTiming] = React.useState<TimingOption | "">("");
  const [challenge, setChallenge] = React.useState<ChallengeOption | "">("");
  const [engagement, setEngagement] = React.useState<EngagementOption | "">("");
  const [pricing, setPricing] = React.useState<PricingOption | "">("");
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [preferredLanguage, setPreferredLanguage] = React.useState<Language | "">("");
  const [consent, setConsent] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [showConfirmClose, setShowConfirmClose] = React.useState(false);
  const closeTimerRef = React.useRef<number | null>(null);

  const hasStartedSurvey = React.useMemo(() => {
    return (
      currentStep > 1 ||
      purpose.size > 0 ||
      timing !== "" ||
      challenge !== "" ||
      engagement !== "" ||
      pricing !== "" ||
      fullName.trim() !== "" ||
      email.trim() !== "" ||
      phone.trim() !== ""
    );
  }, [
    currentStep,
    purpose.size,
    timing,
    challenge,
    engagement,
    pricing,
    fullName,
    email,
    phone,
  ]);

  const resetForm = React.useCallback(() => {
    setCurrentStep(1);
    setPurpose(new Set());
    setTiming("");
    setChallenge("");
    setEngagement("");
    setPricing("");
    setFullName("");
    setEmail("");
    setPhone("");
    setPreferredLanguage("");
    setConsent(false);
    setErrors({});
    setSubmitting(false);
    setSuccess(false);
    setShowConfirmClose(false);
  }, []);

  React.useEffect(() => {
    if (!open) {
      resetForm();
      return;
    }
    // Apply preselection on open
    if (preselectNeeds.length > 0) {
      const preselected = new Set<PurposeOption>();
      preselectNeeds.forEach((need) => {
        if (need === "Marriage services") preselected.add("Getting married");
        if (need === "Prenuptial agreement") preselected.add("Prenuptial agreement");
        if (need === "Divorce / separation") preselected.add("Divorce / separation");
        if (need === "Wills / trust / estate planning")
          preselected.add("Will / estate planning");
        if (need === "Business / family structures")
          preselected.add("Business & family structuring");
      });
      if (preselected.size > 0) setPurpose(preselected);
    }
  }, [open, preselectNeeds, resetForm]);

  React.useEffect(() => {
    return () => {
      if (closeTimerRef.current != null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const validateStep = React.useCallback(
    (step: number): boolean => {
      const nextErrors: Record<string, string> = {};

      if (step === 2) {
        if (purpose.size === 0) {
          nextErrors.purpose = "Select at least one option.";
        }
      } else if (step === 3) {
        if (!timing) {
          nextErrors.timing = "Please select an option.";
        }
      } else if (step === 4) {
        if (!challenge) {
          nextErrors.challenge = "Please select an option.";
        }
      } else if (step === 5) {
        if (!engagement) {
          nextErrors.engagement = "Please select an option.";
        }
      } else if (step === 6) {
        if (!pricing) {
          nextErrors.pricing = "Please select an option.";
        }
      } else if (step === 7) {
        const phoneNormalized = normalizePhone(phone);
        if (!fullName.trim()) nextErrors.fullName = "Full name is required.";
        if (!email.trim()) nextErrors.email = "Email is required.";
        else if (!isValidEmail(email.trim()))
          nextErrors.email = "Enter a valid email address.";
        if (!phoneNormalized) nextErrors.phone = "Phone number is required.";
        else if (phoneNormalized.replace(/\D/g, "").length < 9)
          nextErrors.phone = "Enter a valid phone number.";
        if (!preferredLanguage)
          nextErrors.preferredLanguage = "Preferred language is required.";
        if (!consent) nextErrors.consent = "Consent is required.";
      }

      setErrors(nextErrors);
      return Object.keys(nextErrors).length === 0;
    },
    [purpose.size, timing, challenge, engagement, pricing, fullName, email, phone, preferredLanguage, consent],
  );

  const handleNext = React.useCallback(() => {
    if (!validateStep(currentStep)) return;
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
      setErrors({});
    }
  }, [currentStep, validateStep]);

  const handleBack = React.useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  }, [currentStep]);

  const handleClose = React.useCallback(
    (confirmed: boolean) => {
      if (!confirmed && hasStartedSurvey) {
        setShowConfirmClose(true);
        return;
      }
      if (closeTimerRef.current != null) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      onOpenChange(false);
      resetForm();
    },
    [hasStartedSurvey, onOpenChange, resetForm],
  );

  const handleSubmit = async () => {
    if (!validateStep(7)) return;
    if (submitting) return;

    setSubmitting(true);
    const payload: ResearchSubmission = {
      purpose: Array.from(purpose),
      timing,
      challenge,
      engagement,
      pricing,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: normalizePhone(phone),
      preferredLanguage,
      consent: true,
      submittedAt: new Date().toISOString(),
      source,
    };

    try {
      await submitResearch(payload);
      setSuccess(true);
      setErrors({});
      closeTimerRef.current = window.setTimeout(() => {
        onOpenChange(false);
        resetForm();
      }, 2000);
    } finally {
      setSubmitting(false);
    }
  };

  const togglePurpose = (option: PurposeOption) => {
    setPurpose((prev) => {
      const next = new Set(prev);
      if (next.has(option)) {
        next.delete(option);
      } else {
        next.add(option);
      }
      return next;
    });
    if (errors.purpose) {
      setErrors((prev) => {
        const { purpose: _purpose, ...rest } = prev;
        return rest;
      });
    }
  };

  const progressValue = (currentStep / 7) * 100;

  return (
    <>
      <Dialog
        open={open && !showConfirmClose}
        onOpenChange={(next) => handleClose(false)}
      >
        <DialogContent className="max-w-xl bg-white p-4 sm:p-6">
          {success ? (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-xl text-[var(--lobola-graphite)] sm:text-2xl">
                  {successMessage.title}
                </DialogTitle>
              </DialogHeader>
            </>
          ) : (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="font-serif text-lg text-[var(--lobola-graphite)] sm:text-xl">
                    Step {currentStep} of 7
                  </DialogTitle>
                </div>
                <Progress value={progressValue} className="mt-2 h-2" />
              </DialogHeader>

              <div className="space-y-4 sm:space-y-5">
                {/* Step 1: Intro */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-serif text-xl text-[var(--lobola-graphite)]">
                        {step1Intro.heading}
                      </h3>
                      <p className="mt-2 text-sm text-[var(--lobola-muted-text)]">
                        {step1Intro.subtext}
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 2: Purpose */}
                {currentStep === 2 && (
                  <fieldset className="space-y-2">
                    <legend className="text-sm font-medium text-[var(--lobola-text)]">
                      {step2Purpose.question}
                    </legend>
                    <div className="grid gap-2">
                      {step2Purpose.options.map((option) => (
                        <label
                          key={option}
                          className="flex items-start gap-3 rounded-md border border-border bg-white px-3 py-3 text-sm leading-5 min-h-[44px]"
                        >
                          <Checkbox
                            checked={purpose.has(option)}
                            onCheckedChange={() => togglePurpose(option)}
                            aria-label={option}
                            className="mt-0.5"
                          />
                          <span className="text-[var(--lobola-text)] break-words">
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                    {errors.purpose && (
                      <p className="text-sm text-destructive">{errors.purpose}</p>
                    )}
                  </fieldset>
                )}

                {/* Step 3: Timing */}
                {currentStep === 3 && (
                  <div className="grid gap-2">
                    <Label>{step3Timing.question}</Label>
                    <Select value={timing} onValueChange={(v) => setTiming(v as TimingOption)}>
                      <SelectTrigger
                        className="bg-white min-h-[44px]"
                        aria-invalid={Boolean(errors.timing)}
                      >
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {step3Timing.options.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.timing && (
                      <p className="text-sm text-destructive">{errors.timing}</p>
                    )}
                  </div>
                )}

                {/* Step 4: Challenge */}
                {currentStep === 4 && (
                  <div className="grid gap-2">
                    <Label>{step4Challenge.question}</Label>
                    <Select
                      value={challenge}
                      onValueChange={(v) => setChallenge(v as ChallengeOption)}
                    >
                      <SelectTrigger
                        className="bg-white min-h-[44px]"
                        aria-invalid={Boolean(errors.challenge)}
                      >
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {step4Challenge.options.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.challenge && (
                      <p className="text-sm text-destructive">{errors.challenge}</p>
                    )}
                  </div>
                )}

                {/* Step 5: Engagement */}
                {currentStep === 5 && (
                  <div className="grid gap-2">
                    <Label>{step5Engagement.question}</Label>
                    <Select
                      value={engagement}
                      onValueChange={(v) => setEngagement(v as EngagementOption)}
                    >
                      <SelectTrigger
                        className="bg-white min-h-[44px]"
                        aria-invalid={Boolean(errors.engagement)}
                      >
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {step5Engagement.options.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.engagement && (
                      <p className="text-sm text-destructive">{errors.engagement}</p>
                    )}
                  </div>
                )}

                {/* Step 6: Pricing */}
                {currentStep === 6 && (
                  <div className="grid gap-2">
                    <Label>{step6Pricing.question}</Label>
                    <Select
                      value={pricing}
                      onValueChange={(v) => setPricing(v as PricingOption)}
                    >
                      <SelectTrigger
                        className="bg-white min-h-[44px]"
                        aria-invalid={Boolean(errors.pricing)}
                      >
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {step6Pricing.options.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.pricing && (
                      <p className="text-sm text-destructive">{errors.pricing}</p>
                    )}
                  </div>
                )}

                {/* Step 7: Lead Capture */}
                {currentStep === 7 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-serif text-xl text-[var(--lobola-graphite)]">
                        {step7LeadCapture.heading}
                      </h3>
                      <p className="mt-2 whitespace-pre-line text-sm text-[var(--lobola-muted-text)]">
                        {step7LeadCapture.subtext}
                      </p>
                    </div>

                    <Separator />

                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-2">
                      <div className="grid gap-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          aria-invalid={Boolean(errors.fullName)}
                          className="min-h-[44px]"
                        />
                        {errors.fullName && (
                          <p className="text-sm text-destructive">{errors.fullName}</p>
                        )}
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          aria-invalid={Boolean(errors.email)}
                          className="min-h-[44px]"
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-2">
                      <div className="grid gap-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          aria-invalid={Boolean(errors.phone)}
                          inputMode="tel"
                          className="min-h-[44px]"
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive">{errors.phone}</p>
                        )}
                      </div>
                      <div className="grid gap-2">
                        <Label>Preferred Language</Label>
                        <Select
                          value={preferredLanguage}
                          onValueChange={(v) => setPreferredLanguage(v as Language)}
                        >
                          <SelectTrigger
                            className="bg-white min-h-[44px]"
                            aria-invalid={Boolean(errors.preferredLanguage)}
                          >
                            <SelectValue placeholder="Select a language" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[280px]">
                            {languages.map((lang) => (
                              <SelectItem key={lang} value={lang}>
                                {lang}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.preferredLanguage && (
                          <p className="text-sm text-destructive">
                            {errors.preferredLanguage}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-start gap-3 text-sm min-h-[44px] py-1">
                        <Checkbox
                          checked={consent}
                          onCheckedChange={(v) => setConsent(v === true)}
                          aria-invalid={Boolean(errors.consent)}
                          className="mt-0.5"
                        />
                        <span className="text-[var(--lobola-text)] break-words">
                          {step7LeadCapture.consentLabel}
                        </span>
                      </label>
                      {errors.consent && (
                        <p className="text-sm text-destructive">{errors.consent}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex flex-col-reverse items-stretch gap-3 pt-1 sm:flex-row sm:items-center sm:justify-end">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      className="border-[var(--lobola-graphite)] text-[var(--lobola-graphite)] min-h-[44px] w-full sm:w-auto"
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                  )}
                  {currentStep < 7 ? (
                    <Button
                      type="button"
                      className="bg-[var(--lobola-graphite)] text-[var(--lobola-bone)] hover:bg-[#3a3a3a] min-h-[44px] w-full sm:w-auto"
                      onClick={handleNext}
                    >
                      {currentStep === 1 ? step1Intro.continueButton : "Next"}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      className="bg-[var(--lobola-graphite)] text-[var(--lobola-bone)] hover:bg-[#3a3a3a] min-h-[44px] w-full sm:w-auto"
                      onClick={handleSubmit}
                      disabled={submitting}
                    >
                      {step7LeadCapture.submitButton}
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmClose} onOpenChange={setShowConfirmClose}>
        <DialogContent className="max-w-md bg-white p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="font-serif text-lg text-[var(--lobola-graphite)]">
              Leave this survey?
            </DialogTitle>
            <DialogDescription className="text-sm text-[var(--lobola-muted-text)]">
              You've started filling out the survey. Are you sure you want to leave?
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              className="border-[var(--lobola-graphite)] text-[var(--lobola-graphite)] min-h-[44px] w-full sm:w-auto"
              onClick={() => setShowConfirmClose(false)}
            >
              No, continue
            </Button>
            <Button
              type="button"
              className="bg-[var(--lobola-graphite)] text-[var(--lobola-bone)] hover:bg-[#3a3a3a] min-h-[44px] w-full sm:w-auto"
              onClick={() => handleClose(true)}
            >
              Yes, leave
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
