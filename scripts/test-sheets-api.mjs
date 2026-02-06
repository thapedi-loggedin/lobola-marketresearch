const payload = {
  purpose: ["Lobola / customary process"],
  timing: "Within 1 month",
  challenge: "I don't understand the legal process",
  engagement: "Fully online",
  pricing: "R500-R5 000",
  fullName: "Test User",
  email: "test@example.com",
  phone: "+27001234567",
  preferredLanguage: "English (legally prevailing)",
  consent: true,
  submittedAt: new Date().toISOString(),
  source: "cta",
};

const res = await fetch("http://localhost:3000/api/submit-research-sheets", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

const text = await res.text();
console.log("Status:", res.status);
console.log("Response:", text);

if (!res.ok) {
  process.exit(1);
}
