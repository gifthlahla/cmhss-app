# SKILL.md — zim-currency-converter

> **Read this before any task.** This file defines the permanent context, design system, and behavioral constraints for all AI agents working on this project.

---

## 1. Project Identity

- **Project name:** zim-currency-converter
- **Type:** Single-page web application (SPA), no frameworks, no build tools
- **Stack:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **API:** ExchangeRate-API (free tier, key exposed in frontend — rate-limited, not secret)
- **Hosting:** GitHub Pages
- **Live URL:** https://gifthlahla.github.io/zim-currency-converter

**Core purpose:** A minimalist, real-time currency converter tailored for Zimbabwe and the SADC region. Converts between 16 SADC currencies and 7 major trading currencies (23 total). Features a strict 60-30-10 color system, light/dark theming, and full accessibility.

---

## 2. Central Rule (Never Violate)

This project uses a **strict single-step development workflow**.

1. You may complete **only one task** from `SCOPE.md` per response.
2. You must **not** anticipate future tasks, refactor unrelated code, or "improve" anything outside the explicitly assigned task.
3. Your output must be **only the code/file requested** — no summaries, no walkthroughs, no extra commentary unless the user explicitly asks.
4. After output, state: `TASK [Task ID] COMPLETE — awaiting VERIFIED.`
5. Do **not** accept a new task until the user replies `VERIFIED`.

---

## 3. Absolute Development Constraints

1. **Zero dependencies** — no npm packages, no CSS frameworks, no JS libraries (not even jQuery). Pure vanilla code only.
2. **Accessibility-first** — semantic HTML (`<form>`, `<label>`, `<button>`, `<header>`, `<main>`, `<footer>`), keyboard navigation, ARIA attributes (`aria-live`, `aria-label`, `aria-busy`, `role="alert"`), screen-reader friendly.
3. **Progressive enhancement** — the form should be usable even if CSS fails to load, and meaningful even if JavaScript is disabled (static information).
4. **60-30-10 color rule strictly enforced** — all colors must be referenced via CSS custom properties defined in `:root` and `[data-theme="dark"]`. Never hardcode a color value in a component rule.
5. **Design token system** — all spacing, font sizes, border radii, shadows, and transitions must use the predefined CSS variables. No magic numbers.
6. **Mobile-first responsive design** — test down to 320px width. Minimum touch target size 44×44px for all interactive elements.
7. **`prefers-reduced-motion` media query** — all animations must be wrapped or disabled when the user prefers reduced motion.
8. **Browser targets:** latest stable versions of Chrome, Firefox, Safari, Edge.
9. **Currency formatting locale-aware**: use `Intl.NumberFormat` where appropriate. ZWL never shows decimal places. USD, EUR, GBP, ZAR, BWP, etc. show 2 decimals. JPY, KRW show 0 decimals.

---

## 4. Design Token Reference (Complete)

These tokens are the **only** allowed values for visual styling. Never deviate.

### 4.1 Color Tokens — Light Theme (`:root`)

| Category | Variable | Value | Role |
|---|---|---|---|
| **Dominant (60%)** | `--color-surface` | `#F8F9FA` | Page background |
| | `--color-surface-elevated` | `#FFFFFF` | Card / input backgrounds |
| | `--color-surface-subdued` | `#E9ECEF` | Result panel background |
| **Secondary (30%)** | `--color-text-primary` | `#212529` | Headings, result |
| | `--color-text-secondary` | `#6C757D` | Labels, meta text |
| | `--color-border` | `#DEE2E6` | Input borders, dividers |
| | `--color-border-focus` | `#ADB5BD` | Focus ring color |
| **Accent (10%)** | `--color-accent` | `#0D6EFD` | Button bg, links, focus ring |
| | `--color-accent-hover` | `#0B5ED7` | Button hover |
| | `--color-accent-text` | `#FFFFFF` | Text on accent backgrounds |
| **Semantic** | `--color-success` | `#198754` | Success states |
| | `--color-error` | `#DC3545` | Error states, error panel |
| | `--color-warning` | `#FFC107` | Warning states (rarely used) |

### 4.2 Color Tokens — Dark Theme (`[data-theme="dark"]`)

| Variable | Value |
|---|---|
| `--color-surface` | `#1A1D23` |
| `--color-surface-elevated` | `#252830` |
| `--color-surface-subdued` | `#1E2128` |
| `--color-text-primary` | `#E9ECEF` |
| `--color-text-secondary` | `#ADB5BD` |
| `--color-border` | `#3A3E47` |
| `--color-border-focus` | `#5A5F6B` |
| `--color-accent` | `#3B82F6` |
| `--color-accent-hover` | `#2563EB` |
| `--color-accent-text` | `#FFFFFF` |
| Semantic colors remain unchanged or slightly adjusted for contrast. | |

### 4.3 Spacing Scale (4px base)

| Variable | Value |
|---|---|
| `--space-xs` | `4px` |
| `--space-sm` | `8px` |
| `--space-md` | `16px` |
| `--space-lg` | `24px` |
| `--space-xl` | `32px` |
| `--space-2xl` | `48px` |
| `--space-3xl` | `64px` |

### 4.4 Typography Scale

| Variable | Value |
|---|---|
| `--font-family` | `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` |
| `--font-size-xs` | `0.75rem` (12px) |
| `--font-size-sm` | `0.875rem` (14px) |
| `--font-size-base` | `1rem` (16px) |
| `--font-size-lg` | `1.25rem` (20px) |
| `--font-size-xl` | `1.5rem` (24px) |
| `--font-size-2xl` | `2rem` (32px) |
| `--font-weight-normal` | `400` |
| `--font-weight-medium` | `500` |
| `--font-weight-bold` | `700` |
| `--line-height` | `1.6` |

### 4.5 Borders & Radius

| Variable | Value |
|---|---|
| `--radius-sm` | `6px` |
| `--radius-md` | `10px` |
| `--radius-lg` | `16px` |
| `--radius-full` | `9999px` |

### 4.6 Shadows

| Variable | Light Theme | Dark Theme |
|---|---|---|
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.08)` | `0 1px 3px rgba(0,0,0,0.3)` |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.1)` | `0 4px 12px rgba(0,0,0,0.4)` |
| `--shadow-lg` | `0 8px 30px rgba(0,0,0,0.12)` | `0 8px 30px rgba(0,0,0,0.5)` |

### 4.7 Transitions

| Variable | Value |
|---|---|
| `--transition-fast` | `150ms ease` |
| `--transition-base` | `250ms ease` |

---

## 5. Currency Data Rules

- The array `CURRENCIES` is defined in `script.js`, containing 16 SADC currencies + 7 major trading currencies, in that order (SADC first, led by ZWL).
- Each object: `{ code: "ISO4217", name: "Full Currency Name", flag: "Emoji" }`.
- Default selections on load: **From = ZWL, To = ZAR**.
- **ZWL formatting**: Never show decimal places; use `Intl.NumberFormat('en-ZW', { maximumFractionDigits: 0 })` or equivalent.
- **Other currencies**: Default to 2 decimal places unless the currency typically has 0 (e.g., JPY, KRW).

The exact list is documented in `SCOPE.md` (Phase 1.3). Do not add, remove, or reorder currencies unless a task explicitly instructs you to.

---

## 6. File Structure (Immutable)

```
zim-currency-converter/
├── index.html
├── style.css
├── script.js
├── assets/
│   └── favicon.svg
├── README.md
├── SCOPE.md
├── PROGRESS.md
└── SKILL.md (this file)
```

Do not create additional files or folders unless a task explicitly requires it.

---

## 7. Accepted Behavior

- ✅ Output only the requested code, cleanly formatted, with minimal but clear comments where logic is non-obvious.
- ✅ Use semantic HTML elements and ARIA attributes appropriately.
- ✅ Apply CSS via the existing design tokens — never redefine them.
- ✅ Keep JavaScript in strict mode (`"use strict"`), use `const`/`let`, handle errors gracefully.
- ✅ Close each completion with `TASK [Task ID] COMPLETE — awaiting VERIFIED.`

---

## 8. Prohibited Behavior

- ❌ Adding features or "improvements" outside the assigned task.
- ❌ Modifying files not mentioned in the task.
- ❌ Introducing inline styles, hardcoded colors, or magic numbers.
- ❌ Removing or renaming existing CSS custom properties.
- ❌ Using `!important` unless absolutely necessary for accessibility overrides (explain why).
- ❌ Generating any content after the completion statement until the user says `VERIFIED`.

---

*End of SKILL.md*
