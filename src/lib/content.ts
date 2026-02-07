export type NavItem = {
  id:
    | "home"
    | "how-it-works"
    | "services"
    | "bundles"
    | "languages"
    | "why-us"
    | "legal"
    | "about"
    | "contact";
  label: string;
};

export const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "how-it-works", label: "How it Works" },
  { id: "services", label: "Services" },
  { id: "bundles", label: "Bundles" },
  { id: "languages", label: "Languages" },
  { id: "why-us", label: "Why Us" },
  { id: "legal", label: "Legal" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const site = {
  name: "lobola.co.za",
  url: "https://www.lobola.co.za",
};

export const hero = {
  label: "South African marriage & family legal-tech",
  headline: "Marriage. Family. Legacy.",
  subheadline: "Legal clarity in your language.",
  body:
    "www.lobola.co.za is South Africa’s trusted digital platform for marriage-related legal, customary, and family services. We help you prepare, protect, and plan before, during, and after marriage — all online, in all 11 official South African languages.",
  bullets: [
    "Customary & Civil Marriage Services",
    "Prenuptial Agreements & Contracts",
    "Wills, Trusts & Estate Planning",
    "Divorce & High Court Customary Divorce Support",
    "Fast & affordable (fixed pricing coming soon)",
  ],
  ctaPrimary: "Get Started",
  ctaSecondary: "Get Married the Right Way",
};

export const howItWorks = {
  label: "How it works",
  heading: "A clear path — from choice to compliant documents.",
  steps: [
    "Select your language",
    "Choose your service",
    "Complete secure online forms",
    "Attorney review & compliance",
    "Pay online",
    "Receive your documents digitally",
  ],
  closingLine: "Simple. Secure. Legally compliant.",
};

export type NeedCategory =
  | "Marriage services"
  | "Prenuptial agreement"
  | "Divorce / separation"
  | "Wills / trust / estate planning"
  | "Business / family structures";

export const researchNeeds: NeedCategory[] = [
  "Marriage services",
  "Prenuptial agreement",
  "Divorce / separation",
  "Wills / trust / estate planning",
  "Business / family structures",
];

export const researchTimelines = [
  "ASAP",
  "Within 1 month",
  "1–3 months",
  "3+ months",
] as const;

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

export type Service = {
  key:
    | "marriage_services"
    | "prenuptial_agreements"
    | "divorce_separation"
    | "estate_planning"
    | "business_family_structures"
    | "lobola_letters_contracts";
  iconLabel: string;
  title: string;
  intro: string;
  bullets: string[];
  preselectNeed: NeedCategory;
};

export const services: Service[] = [
  {
    key: "marriage_services",
    iconLabel: "💍",
    title: "Marriage Services",
    intro:
      "Guidance and documentation support for customary, civil, and religious marriage compliance.",
    bullets: [
      "Customary marriage guidance & registration",
      "Civil marriage legal guidance",
      "Religious marriage compliance support",
      "Lobola process information & documentation",
    ],
    preselectNeed: "Marriage services",
  },
  {
    key: "prenuptial_agreements",
    iconLabel: "📝",
    title: "Prenuptial Agreements",
    intro: "Attorney-reviewed ANC options, tailored to your circumstances.",
    bullets: [
      "ANC with Accrual",
      "ANC without Accrual",
      "Customary marriage property agreements",
      "Attorney-reviewed & court-ready",
    ],
    preselectNeed: "Prenuptial agreement",
  },
  {
    key: "divorce_separation",
    iconLabel: "⚖",
    title: "Divorce & Separation",
    intro:
      "Clear guidance and support for separation, divorce, and customary divorce pathways.",
    bullets: [
      "Divorce process guidance",
      "Customary marriage divorce (High Court supported)",
      "Asset division & spousal maintenance guidance",
      "Child custody & parental rights information",
    ],
    preselectNeed: "Divorce / separation",
  },
  {
    key: "estate_planning",
    iconLabel: "🏛",
    title: "Estate Planning & Family Wealth",
    intro:
      "Protect your family with structured estate planning and wealth continuity support.",
    bullets: [
      "Wills (simple & complex)",
      "Trust setup & registration",
      "Estate planning for married & unmarried couples",
      "Executor & trustee support services",
    ],
    preselectNeed: "Wills / trust / estate planning",
  },
  {
    key: "business_family_structures",
    iconLabel: "🏢",
    title: "Business & Family Structures",
    intro:
      "Practical structures for families building businesses and managing intergenerational wealth.",
    bullets: [
      "Company registration",
      "Family business structuring",
      "Trust to business integration",
    ],
    preselectNeed: "Business / family structures",
  },
  {
    key: "lobola_letters_contracts",
    iconLabel: "📜",
    title: "Lobola letters and contracts",
    intro:
      "Professional documentation for lobola negotiations and agreements.",
    bullets: [
      "Lobola negotiation letters",
      "Lobola agreement contracts",
      "Attorney-reviewed documentation",
    ],
    preselectNeed: "Marriage services",
  },
];

export const servicesSection = {
  label: "Services",
  heading:
    "Choose a service category — we’ll guide you through the legal steps.",
  cardCta: "Request info",
  stripLabel: "Not sure what you need?",
  stripButton: "Take the 30-second survey",
};

export const bundlesSection = {
  label: "Service bundles",
  heading: "Simple bundles for common family needs.",
  cardCta: "I’m interested",
};

export type Bundle = {
  key: "marriage_starter" | "family_wealth" | "separation_divorce";
  iconLabel: string;
  name: string;
  forWho: string;
  bullets: string[];
};

export const bundles: Bundle[] = [
  {
    key: "marriage_starter",
    iconLabel: "🟢",
    name: "Marriage Starter Pack",
    forWho: "For couples getting married",
    bullets: [
      "Marriage legal checklist",
      "Prenuptial agreement",
      "Lobola & customary marriage guide",
      "Marriage registration guidance",
    ],
  },
  {
    key: "family_wealth",
    iconLabel: "🔵",
    name: "Family Wealth Pack",
    forWho: "For married couples & families",
    bullets: [
      "Will (individual or joint)",
      "Trust setup",
      "Estate planning session",
      "Beneficiary planning",
    ],
  },
  {
    key: "separation_divorce",
    iconLabel: "🔴",
    name: "Separation & Divorce Pack",
    forWho: "For couples separating",
    bullets: [
      "Divorce or customary divorce guidance",
      "Legal document preparation",
      "High Court process support",
    ],
  },
];

export const languagesSection = {
  label: "Languages",
  heading: "Legal guidance in all 11 official South African languages.",
  body:
    "We provide guidance and documents in all 11 official South African languages. Certified translations are provided for understanding and accessibility.",
};

export const whyChooseUs = {
  label: "Why choose us",
  heading: "Built with dignity — for South African families.",
  bullets: [
    "Built for South African families",
    "Culturally respectful & legally compliant",
    "Affordable: fixed pricing (coming soon)",
    "Attorney-reviewed documents",
    "Digital-first convenience",
  ],
};

export const legal = {
  label: "Legal & compliance",
  heading: "Grounded in South African law — and clear about our role.",
  acts: [
    "Marriage Act",
    "Recognition of Customary Marriages Act",
    "Divorce Act",
    "Trust Property Control Act",
    "Administration of Estates Act",
  ],
  disclaimerTitle: "Important disclaimer",
  disclaimerBody:
    "We are not a law firm. Legal practitioners review all legal documents.",
};

export const about = {
  label: "About",
  heading: "A modern platform for marriage, family, and legacy.",
  body:
    "www.lobola.co.za was created to protect families, marriages, and legacies by making legal and customary processes simple, transparent, and accessible to all South Africans.",
  partnershipText: "lobola.co.za is in partnership with RJS Inc Attorneys.",
  partnerLogo: "/rjs-inc-law-icon.svg",
};

export const contact = {
  label: "Contact",
  heading: "Reach the team",
  siteLine: "🌐 www.lobola.co.za",
  emailLine: "📧 info@lobola.co.za",
  footerCtaHeadline: "Go to www.lobola.co.za before you get married.",
  footerCtaButton: "Take the 30-second survey",
};

export const sectionCtas = {
  notSureLabel: "Not sure what you need?",
  notSureButton: "Take the 30-second survey",
};

export const researchModal = {
  title: "Market research survey",
  description:
    "Help us build a trustworthy national platform. Share your details and we’ll contact you to understand what you need.",
  consentLabel: "I agree to be contacted about my request.",
  sendLabel: "Send",
  successTitle: "Thank you — we’ve received your details.",
  successBody: "We’ll reach out soon. This window will close automatically.",
};

