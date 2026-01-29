"use client";

import * as React from "react";
import { howItWorks, languages, services } from "@/lib/content";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { LoginModal } from "@/components/shared/LoginModal";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";

export function HowItWorks() {
  const [mounted, setMounted] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState<string>("");
  const [selectedServices, setSelectedServices] = React.useState<Set<string>>(
    new Set()
  );
  const [servicesDropdownOpen, setServicesDropdownOpen] =
    React.useState(false);
  const [loginModalOpen, setLoginModalOpen] = React.useState(false);
  const servicesDropdownRef = React.useRef<HTMLDivElement>(null);

  // Ensure component only renders Select after client-side hydration
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleService = (serviceKey: string) => {
    setSelectedServices((prev) => {
      const next = new Set(prev);
      if (next.has(serviceKey)) {
        next.delete(serviceKey);
      } else {
        next.add(serviceKey);
      }
      return next;
    });
  };

  const handleStep3Click = () => {
    setLoginModalOpen(true);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target as Node)
      ) {
        setServicesDropdownOpen(false);
      }
    };

    if (servicesDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [servicesDropdownOpen]);

  const getSelectedServicesText = () => {
    if (selectedServices.size === 0) {
      return "Select services";
    }
    if (selectedServices.size === 1) {
      const service = services.find((s) => selectedServices.has(s.key));
      return service?.title || "1 selected";
    }
    return `${selectedServices.size} services selected`;
  };

  return (
    <>
      <section id="how-it-works" className="scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--lobola-muted-text)]">
              {howItWorks.label}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[var(--lobola-graphite)] sm:text-4xl">
              {howItWorks.heading}
            </h2>
            <Separator className="my-6 w-20 bg-[var(--lobola-gold)]/60" />

            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {howItWorks.steps.map((step, idx) => {
                // Step 1: Language selection
                if (idx === 0) {
                  return (
                    <li
                      key={step}
                      className="rounded-md border border-border bg-white px-4 py-4"
                    >
                      <p className="text-xs font-medium uppercase tracking-wide text-[var(--lobola-muted-text)]">
                        Step {idx + 1}
                      </p>
                      <p className="mt-2 mb-3 text-sm font-medium text-[var(--lobola-text)] break-words">
                        {step}
                      </p>
                      {mounted ? (
                        <Select
                          value={selectedLanguage}
                          onValueChange={setSelectedLanguage}
                        >
                          <SelectTrigger className="w-full bg-white min-h-[44px]">
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
                      ) : (
                        <div className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm min-h-[44px] flex items-center text-[var(--lobola-muted-text)]">
                          Select a language
                        </div>
                      )}
                    </li>
                  );
                }

                // Step 2: Service selection (multi-select dropdown)
                if (idx === 1) {
                  return (
                    <li
                      key={step}
                      className="rounded-md border border-border bg-white px-4 py-4"
                      ref={servicesDropdownRef}
                    >
                      <p className="text-xs font-medium uppercase tracking-wide text-[var(--lobola-muted-text)]">
                        Step {idx + 1}
                      </p>
                      <p className="mt-2 mb-3 text-sm font-medium text-[var(--lobola-text)] break-words">
                        {step}
                      </p>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                          className={cn(
                            "w-full flex items-center justify-between gap-2 rounded-md border border-input bg-white px-3 py-2 text-sm min-h-[44px]",
                            "hover:bg-[var(--lobola-bone)] transition-colors",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lobola-gold)] focus-visible:ring-offset-2",
                            servicesDropdownOpen && "ring-2 ring-[var(--lobola-gold)] ring-offset-2"
                          )}
                          aria-expanded={servicesDropdownOpen}
                          aria-haspopup="listbox"
                        >
                          <span
                            className={cn(
                              "flex-1 text-left break-words",
                              selectedServices.size === 0 &&
                                "text-[var(--lobola-muted-text)]"
                            )}
                          >
                            {getSelectedServicesText()}
                          </span>
                          <ChevronDownIcon
                            className={cn(
                              "size-4 shrink-0 text-[var(--lobola-muted-text)] transition-transform",
                              servicesDropdownOpen && "rotate-180"
                            )}
                          />
                        </button>

                        {servicesDropdownOpen && (
                          <div
                            className="absolute z-50 mt-1 w-full rounded-md border border-border bg-white shadow-lg max-h-[280px] overflow-y-auto"
                            role="listbox"
                          >
                            <div className="p-1">
                              {services.map((service) => (
                                <label
                                  key={service.key}
                                  className="flex items-start gap-3 rounded-sm px-2 py-2 text-sm leading-5 min-h-[44px] cursor-pointer hover:bg-[var(--lobola-bone)] transition-colors"
                                >
                                  <Checkbox
                                    checked={selectedServices.has(service.key)}
                                    onCheckedChange={() =>
                                      toggleService(service.key)
                                    }
                                    aria-label={service.title}
                                    className="mt-0.5"
                                  />
                                  <span className="text-[var(--lobola-text)] break-words flex-1">
                                    {service.title}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </li>
                  );
                }

                // Step 3: Login required
                if (idx === 2) {
                  return (
                    <li
                      key={step}
                      className={cn(
                        "rounded-md border border-border bg-white px-4 py-4",
                        "cursor-pointer transition-colors hover:bg-[var(--lobola-bone)]",
                        "focus-within:ring-2 focus-within:ring-[var(--lobola-gold)] focus-within:ring-offset-2"
                      )}
                      onClick={handleStep3Click}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleStep3Click();
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`${step} - Click to sign in`}
                    >
                      <p className="text-xs font-medium uppercase tracking-wide text-[var(--lobola-muted-text)]">
                        Step {idx + 1}
                      </p>
                      <p className="mt-2 text-sm font-medium text-[var(--lobola-text)] break-words">
                        {step}
                      </p>
                      <p className="mt-2 text-xs text-[var(--lobola-muted-text)]">
                        Sign in required →
                      </p>
                    </li>
                  );
                }

                // Other steps (non-interactive)
                return (
                  <li
                    key={step}
                    className="rounded-md border border-border bg-white px-4 py-4"
                  >
                    <p className="text-xs font-medium uppercase tracking-wide text-[var(--lobola-muted-text)]">
                      Step {idx + 1}
                    </p>
                    <p className="mt-2 text-sm font-medium text-[var(--lobola-text)] break-words">
                      {step}
                    </p>
                  </li>
                );
              })}
            </ol>

            <p className="mt-6 text-sm font-medium text-[var(--lobola-warm-gray)] break-words">
              {howItWorks.closingLine}
            </p>
          </div>
        </div>
      </section>

      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </>
  );
}

