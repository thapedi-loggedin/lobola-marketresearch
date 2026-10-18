# Lobola Design System Brief

## Purpose

This brief defines the UI system for `lobola-v1` based on the current implementation in the repo. It is intended to keep future product, marketing, and content work visually consistent while preserving the brand qualities already present in the site: dignity, trust, legal clarity, cultural respect, and accessibility.

## Brand Positioning

`lobola.co.za` presents itself as a South African legal-tech platform for marriage, family, and legacy services. The interface should feel:

- Trustworthy, not corporate-cold
- Warm, not casual
- Premium, not luxury-for-luxury's-sake
- Modern, but grounded in legal credibility
- Culturally respectful and nationally inclusive

In practical UI terms, that means restrained layouts, calm spacing, elegant typography, strong legibility, and sparing use of emphasis.

## Design Principles

1. Clarity before decoration
   Every screen should make the next step obvious. Content hierarchy should always beat visual novelty.

2. Dignity over hype
   Use confident, calm presentation. Avoid aggressive marketing patterns, loud gradients, and over-animated interactions.

3. Human guidance over legal intimidation
   Complex services should feel guided and approachable through sectioning, checklists, progressive disclosure, and strong CTA placement.

4. Premium through restraint
   The product should look elevated through typography, spacing, contrast, and consistency rather than ornamental effects.

5. Accessible by default
   Touch targets, contrast, focus states, readable body copy, and clear form feedback are foundational, not optional.

## Current Visual Foundation

### Color

The repo already establishes a strong light-only brand palette:

- Graphite: `#2b2b2b`
- Warm gray: `#6b6b6b`
- Bone: `#f5f3ef`
- Gold: `#c2a86d`
- Primary text: `#1f1f1f`
- Muted text: `#7a7a7a`

These colors support the right emotional tone. The system should continue using:

- `bone` as the primary page canvas
- `white` as the elevated surface color
- `graphite` for primary actions and headings
- `gold` as a restrained accent for separators, icons, and focus-adjacent emphasis
- `warm gray` and `muted text` for supportive copy

### Typography

The current type pairing is strong and should remain the core system:

- Serif display: `Playfair Display`
- Sans UI/body: `Inter`

Recommended usage:

- Serif for page titles, section headings, and brand-signature moments
- Sans for navigation, body copy, lists, form labels, helper text, and UI controls

Tone guidance:

- Serif creates ceremony and trust
- Sans keeps the product contemporary and usable

### Shape

The current radius is conservative and appropriate:

- Base radius: `0.375rem`

This should remain the default for inputs, cards, buttons, and list items. Rounded shapes should feel refined, not soft or playful.

### Motion

The existing product is motion-light. That is the right baseline.

Motion should be:

- Short
- Functional
- Subtle
- Reduced when the user prefers reduced motion

Preferred uses:

- Dialog open/close
- Accordion expand/collapse
- Carousel transitions
- Hover and focus feedback

Avoid decorative animation that weakens trust.

## Layout System

### Containers

The repo consistently uses:

- Page container: `max-w-6xl`
- Content container: `max-w-4xl`
- Hero content: `max-w-3xl`

These should become standard layout widths:

- `container-page`: 6xl for full sections
- `container-content`: 4xl for reading-width sections
- `container-narrow`: 3xl for hero and dense messaging

### Spacing Rhythm

Current sections use a stable vertical rhythm:

- Horizontal padding: `px-4`, `sm:px-6`
- Section padding: `py-14` to `py-18`
- Hero padding: `py-16` to `py-20`

Recommended spacing rules:

- Major sections: 56 to 72px vertical padding
- Section heading block: label, heading, separator, then body
- Cards: 20 to 24px internal padding
- CTA groups: 12px minimum gap

### Grid Patterns

The existing patterns are repeatable and should be formalized:

- 2-column grid for checklist/value content
- 3-column layout for service browsing on large screens
- Single-column stack on mobile
- Flexible wrap layout for language chips/tags

## Content Hierarchy

The site already uses a dependable section structure. This should be treated as the default section template:

1. Eyebrow label
2. Serif heading
3. Gold separator
4. Supporting paragraph
5. Structured content block
6. CTA or next-step affordance

Eyebrow labels should remain:

- Uppercase
- Small
- Wide-tracked
- Muted in color

Headings should remain:

- Serif
- Tight tracking
- High contrast
- Brief and declarative

Body copy should feel plainspoken and reassuring, especially for legal or procedural content.

## Component System

### Core Components Already Present

The current repo already contains the foundation of a usable design system:

- Buttons
- Inputs
- Textareas
- Labels
- Checkbox
- Select
- Dialog
- Accordion
- Separator
- Progress

### Reusable Product Patterns

The site also includes strong higher-level patterns worth formalizing:

- Sticky navigation
- Hero with credibility bullets
- Section heading block
- Feature/value checklist rows
- Service cards
- Accordion bundle cards
- CTA strip
- Contact form card
- Footer CTA block
- Modal-based lead capture flow

### Button Roles

The product currently uses two dominant button roles:

- Primary button: graphite background, bone text
- Secondary/outline button: bordered graphite text on light background

System guidance:

- Use primary buttons for commitment actions
- Use outline buttons for secondary navigation and lower-pressure actions
- Avoid introducing too many visual button variants

### Cards

Cards are a major surface pattern and should remain simple:

- White background
- Thin border
- Small radius
- Minimal shadow or no shadow
- Content-first hierarchy

Cards should communicate stability and structure, not novelty.

### Forms

The contact flow and research modal suggest the system should emphasize:

- Strong labels
- Minimum 44px touch targets
- Inline validation
- Plain-language placeholders
- Clear required field states
- Calm success and error feedback

### Icons

The repo uses `lucide-react` successfully. Continue with line icons for clarity and consistency.

Icon usage rules:

- Use icons to reinforce categories and actions
- Keep icon size modest
- Prefer gold for non-critical accent icons
- Avoid decorative icon clutter

## Voice And Microcopy

The UI voice should remain:

- Clear
- Respectful
- Reassuring
- Plainspoken
- Legally aware without sounding intimidating

Preferred copy patterns:

- "We’ll guide you through the legal steps."
- "Simple. Secure. Legally compliant."
- "Reach the team."

Avoid copy that feels:

- Salesy
- Trend-driven
- Clever for its own sake
- Overly technical

## Accessibility Standards

This design system should preserve and expand current good practices:

- Minimum 44x44 interactive targets
- Visible keyboard focus states
- Strong text contrast on all surfaces
- Clear form validation and status messaging
- Semantic headings and lists
- Mobile-first responsive behavior
- Reduced motion support

The system should aim for WCAG AA contrast at minimum.

## Visual Do's And Don'ts

Do:

- Use bone and white as the dominant canvas/surface pair
- Let typography create the premium feel
- Keep layouts spacious and structured
- Use gold sparingly for emphasis
- Prefer calm, direct compositions

Don't:

- Add loud gradients or saturated accent colors
- Introduce glassmorphism, neon, or overly soft shadows
- Over-round components
- Mix too many card styles
- Turn legal/service content into generic startup marketing UI

## Recommended Token Expansion

The current CSS variables are a good start. To mature the system, add semantic tokens for:

- `--color-success`
- `--color-warning`
- `--color-info`
- `--color-surface-elevated`
- `--color-surface-muted`
- `--color-text-subtle`
- `--space-section-sm`
- `--space-section-md`
- `--space-section-lg`
- `--shadow-card`
- `--shadow-dialog`

This will reduce one-off utility styling and make future scaling easier.

## Recommended Next System Components

To strengthen reuse across the repo, the next components to formalize should be:

1. `SectionHeader`
   Encapsulates eyebrow, heading, separator, and optional body copy.

2. `InfoCard`
   Shared card shell for services, legal notes, contact blocks, and simple content groups.

3. `Checklist`
   Shared bullet list with icon, spacing, and typography rules.

4. `CTASection`
   Shared strip/block for conversion moments.

5. `TagList` or `Chip`
   Shared pattern for languages, categories, and metadata labels.

6. `FormField`
   Shared wrapper for label, control, helper text, and error message.

## Current Gaps To Address

Based on the repo, the biggest design-system gaps are:

- Repeated section-heading markup across many sections
- Repeated card styling embedded directly in feature components
- Repeated button overrides on top of the shared button primitive
- No documented semantic spacing scale
- No documented state palette beyond destructive/error
- No formal guidance for blog pages versus landing-page sections

## North Star

The Lobola design system should feel like a digital civic service with premium editorial restraint: modern South African legal guidance presented with warmth, confidence, and cultural respect.

If a new screen or component feels louder, slicker, or more generic than the current best sections, it is probably moving away from the brand rather than toward it.
