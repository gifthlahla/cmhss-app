# SCOPE.md — zim-currency-converter

> **Master task checklist.** Each checkbox = one atomic AI prompt.
> Mark `[x]` only after the task is tested and `VERIFIED` by a human.

---

## Phase 1: Project Foundation (Skeleton & Static UI)

### 1.1 — Initialize Repository & File Structure

**Objective:** Create the project skeleton with all required files.
**Principle:** Separation of concerns — structure, style, logic each in their own file.

**Deliverables:**

```
zim-currency-converter/
├── index.html        (valid HTML5 boilerplate, links to style.css + script.js)
├── style.css         (empty, charset utf-8)
├── script.js         (empty, strict mode, linked with defer)
├── assets/
│   └── favicon.svg   (simple currency exchange icon)
├── README.md         (project title + one-line description)
├── SCOPE.md          (this file)
├── PROGRESS.md       (empty tracking table)
└── SKILL.md          (pre-existing design constitution)
```

**Acceptance Criteria:**
- All files and folders exist with correct names.
- HTML links to CSS and JS resolve without 404 errors (verify in browser DevTools).
- Favicon loads in the browser tab.
- `PROGRESS.md` contains the empty table ready for logging.

- [x] 1.1 — Initialize Repository & File Structure

---

### 1.2 — HTML Semantic Shell

**Objective:** Build the complete, accessible HTML structure with all elements the app needs.
**Principle:** Semantic HTML — `<form>`, `<label>`, `<button>`, `<header>`, `<main>`, `<footer>`, ARIA attributes. Screen-reader friendly. No `<div>` soup.

**Deliverables:** Single `index.html` containing:
- `<header>` with app title "💱 Zim Currency Converter" and an empty theme toggle button placeholder.
- `<main>` containing a `<form>` with:
  - Amount input group: `<label>` + `<input type="number">`.
  - Currency row containing:
    - "From" group: `<label>` + `<select>`.
    - Swap button: `<button type="button">` with `⇄` icon, `aria-label="Swap currencies"`.
    - "To" group: `<label>` + `<select>`.
  - Convert button: `<button type="submit">`.
- `<section class="result-panel">` with `aria-live="polite"`, containing three empty elements for conversion text, rate text, and timestamp. Panel hidden by default (`hidden` attribute or CSS).
- `<footer>` with "Rates by ExchangeRate-API" attribution.

**Acceptance Criteria:**
- HTML validates at [W3C validator](https://validator.w3.org/) with 0 errors.
- Every form control has an associated `<label>`.
- Tab order is logical: Amount → From → Swap → To → Convert.
- Page renders without CSS (plain HTML is clear and usable).

- [x] 1.2 — HTML Semantic Shell

---

### 1.3 — Currency Dropdown Population

**Objective:** Populate both `<select>` dropdowns programmatically with the full SADC + major trading currencies list.
**Principle:** Data-driven — currencies defined once, rendered everywhere.

**Deliverables:**
- Define `CURRENCIES` array in `script.js` containing exactly these currencies, in this order:

```javascript
const CURRENCIES = [
  // === SADC Member States ===
  { code: "ZWL", name: "Zimbabwean Dollar",  flag: "🇿🇼" },
  { code: "ZAR", name: "South African Rand", flag: "🇿🇦" },
  { code: "BWP", name: "Botswana Pula",       flag: "🇧🇼" },
  { code: "ZMW", name: "Zambian Kwacha",      flag: "🇿🇲" },
  { code: "MWK", name: "Malawian Kwacha",     flag: "🇲🇼" },
  { code: "MZN", name: "Mozambican Metical",  flag: "🇲🇿" },
  { code: "AOA", name: "Angolan Kwanza",      flag: "🇦🇴" },
  { code: "NAD", name: "Namibian Dollar",     flag: "🇳🇦" },
  { code: "SZL", name: "Swazi Lilangeni",     flag: "🇸🇿" },
  { code: "LSL", name: "Lesotho Loti",        flag: "🇱🇸" },
  { code: "TZS", name: "Tanzanian Shilling",  flag: "🇹🇿" },
  { code: "MGA", name: "Malagasy Ariary",     flag: "🇲🇬" },
  { code: "MUR", name: "Mauritian Rupee",     flag: "🇲🇺" },
  { code: "SCR", name: "Seychellois Rupee",   flag: "🇸🇨" },
  { code: "KMF", name: "Comorian Franc",      flag: "🇰🇲" },
  { code: "CDF", name: "Congolese Franc",     flag: "🇨🇩" },
  // === Major Trading Currencies ===
  { code: "USD", name: "US Dollar",           flag: "🇺🇸" },
  { code: "EUR", name: "Euro",                flag: "🇪🇺" },
  { code: "GBP", name: "British Pound",       flag: "🇬🇧" },
  { code: "CNY", name: "Chinese Yuan",        flag: "🇨🇳" },
  { code: "INR", name: "Indian Rupee",        flag: "🇮🇳" },
  { code: "JPY", name: "Japanese Yen",        flag: "🇯🇵" },
  { code: "AED", name: "UAE Dirham",          flag: "🇦🇪" }
];
```

- Write a function that iterates `CURRENCIES` and creates `<option>` elements for both dropdowns.
- Default selections: From = ZWL, To = ZAR.
- Each option's text includes the flag emoji: `🇿🇼 ZWL – Zimbabwean Dollar`.

**Acceptance Criteria:**
- Both dropdowns show all 23 currencies with flags.
- Defaults are ZWL (From) and ZAR (To).
- Adding a new currency to the array populates both dropdowns without any other code change.

- [x] 1.3 — Currency Dropdown Population

---

## Phase 2: Design System & Light Theme

### 2.1 — CSS Custom Properties (Design Tokens)

**Objective:** Define the complete design token system in `:root`.
**Principle:** 60-30-10 color rule encoded as tokens. No color, spacing, or font size may be hardcoded in component styles.

**Deliverables:** In `style.css`, define all tokens exactly as listed in `SKILL.md` Section 4:
- Color tokens (60% dominant, 30% secondary, 10% accent, semantic).
- Spacing scale (4px base: xs to 3xl).
- Typography scale (font family Inter, sizes xs to 2xl, weights, line-height).
- Border radii (sm, md, lg, full).
- Shadows (sm, md, lg — light theme values only for now).
- Transitions (fast 150ms, base 250ms).

**Acceptance Criteria:**
- All variables are in `:root {}`.
- No hardcoded color or spacing values exist anywhere else in the stylesheet.
- Variables follow the naming convention `--category-modifier`.

- [x] 2.1 — CSS Custom Properties (Design Tokens)

---

### 2.2 — CSS Reset & Base Styles

**Objective:** Apply a consistent, accessible baseline across all elements.
**Principle:** Normalize browser defaults; fonts and spacing inherit cleanly.

**Deliverables:**
- `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`
- `html` gets `-webkit-font-smoothing`, `-moz-osx-font-smoothing`, `scroll-behavior: smooth`.
- `body` gets `font-family`, `font-size-base`, `line-height`, `color`, `background-color` — all from design tokens.
- Form elements (`input`, `select`, `button`) inherit `font-family` and `font-size`.
- Images and media are block-level by default.
- Remove list styles from any `<ul>` (none planned, but safe).

**Acceptance Criteria:**
- Page renders identically in Chrome, Firefox, Safari (consistent baseline).
- All text uses Inter font (or system fallback).
- No unexpected browser-default margins or padding.

- [x] 2.2 — CSS Reset & Base Styles

---

### 2.3 — Layout: Card Container

**Objective:** Center the app as a card on the page with proper constraints.
**Principle:** Container constrains content. Card elevates the interactive surface. Whitespace is intentional.

**Deliverables:**
- `body`: `min-height: 100vh`, centered content using `display: flex; justify-content: center; align-items: center;`, background using `--color-surface`.
- App container (`<main>` or a wrapper `<div>`): `max-width: 480px; width: 90%;` centered.
- Card styling:
  - `background-color: var(--color-surface-elevated);`
  - `border-radius: var(--radius-lg);`
  - `box-shadow: var(--shadow-md);`
- Padding: `var(--space-xl)` on mobile, increasing to `var(--space-2xl)` at 480px+.
- Card has a smooth transition on `box-shadow` for theme changes.

**Acceptance Criteria:**
- Card is centered horizontally and vertically on all screen sizes.
- Card never exceeds 480px width.
- Background `--color-surface` color is visible around the card edges.
- Card shows rounded corners and subtle shadow.

- [x] 2.3 — Layout: Card Container

---

### 2.4 — Typography & Header Styling

**Objective:** Establish a clear visual hierarchy with the typography scale.
**Principle:** Every text element's size, weight, and color comes from design tokens.

**Deliverables:**
- Header title (`h1`): `font-size: var(--font-size-xl); font-weight: var(--font-weight-bold); color: var(--color-text-primary);`
- All `<label>` elements: `font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--color-text-secondary); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: var(--space-xs); display: block;`
- Amount input text: `font-size: var(--font-size-lg); font-weight: var(--font-weight-medium); color: var(--color-text-primary);`
- `<select>` text: `font-size: var(--font-size-base);`
- Footer: `font-size: var(--font-size-xs); color: var(--color-text-secondary); text-align: center; margin-top: var(--space-lg);`

**Acceptance Criteria:**
- Visual hierarchy is instantly clear: title is largest, labels are smallest but distinct, input text is comfortable to read.
- All font sizes reference the typography scale tokens.
- Line height keeps text from feeling cramped.

- [x] 2.4 — Typography & Header Styling

---

### 2.5 — Form Elements Styling

**Objective:** Style all inputs, selects, and buttons with a consistent, polished visual language.
**Principle:** Every interactive element must have a default, hover, focus, and active state. No mystery meat.

**Deliverables:**
- Input & Select: `width: 100%; padding: var(--space-sm) var(--space-md); border: 1.5px solid var(--color-border); border-radius: var(--radius-sm); background: var(--color-surface-elevated); font-size: var(--font-size-base); color: var(--color-text-primary);`
- Focus state: `border-color: var(--color-accent); box-shadow: 0 0 0 3px rgba(13,110,253,0.25); outline: none; transition: var(--transition-fast);`
- Convert button: `width: 100%; padding: var(--space-md); background: var(--color-accent); color: var(--color-accent-text); border: none; border-radius: var(--radius-sm); font-size: var(--font-size-base); font-weight: var(--font-weight-medium); cursor: pointer; transition: var(--transition-base);`
- Button hover: `background: var(--color-accent-hover); transform: translateY(-1px);`
- Button active: `transform: scale(0.98);`
- Swap button: `width: 40px; height: 40px; border-radius: var(--radius-full); border: 1px solid var(--color-border); background: var(--color-surface-elevated); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: var(--font-size-lg); transition: var(--transition-base);`
- Swap hover: `background: var(--color-surface-subdued);`. Swap active: icon rotates 180°.
- Currency row layout: `display: flex; align-items: center; gap: var(--space-sm);`. The swap button sits centered between the two dropdown groups. Each dropdown group is `flex: 1;`.

**Acceptance Criteria:**
- All form elements share consistent height, border-radius, and typography.
- Focus states are visible and clearly distinguishable.
- Button states provide clear feedback on hover and click.
- Swap button is visually centered between the two dropdowns.

- [x] 2.5 — Form Elements Styling

---

### 2.6 — Result Panel Styling

**Objective:** Style the conversion result area for clear information hierarchy and progressive disclosure.
**Principle:** Show results only when they exist. The conversion result is the hero.

**Deliverables:**
- Result panel (`<section>`): `background: var(--color-surface-subdued); border-radius: var(--radius-md); padding: var(--space-lg); margin-top: var(--space-lg);`
- Panel is hidden by default (`display: none;` or `opacity: 0;` — will be shown via JS later).
- Conversion text (`.conversion-text`): `font-size: var(--font-size-xl); font-weight: var(--font-weight-bold); color: var(--color-accent); margin-bottom: var(--space-xs);`
- Rate text (`.rate-text`): `font-size: var(--font-size-sm); color: var(--color-text-secondary);`
- Timestamp (`.timestamp`): `font-size: var(--font-size-xs); color: var(--color-text-secondary); font-style: italic; border-top: 1px solid var(--color-border); padding-top: var(--space-sm); margin-top: var(--space-sm);`
- Error state class: when panel has `.error`, background uses a tinted version of `--color-error` (10% opacity or similar), text uses `--color-error`.

**Acceptance Criteria:**
- Result panel is not visible on page load.
- Conversion result text is the most prominent element in the panel.
- Timestamp is clearly separated from the rate by a subtle divider.
- Error class visually differentiates from success.

- [x] 2.6 — Result Panel Styling

---

### 2.7 — Responsive Adjustments

**Objective:** Ensure the app adapts gracefully to all screen sizes.
**Principle:** Mobile-first; everything functional down to 320px width.

**Deliverables:**
- At widths below 400px, the currency row stacks vertically: From dropdown → swap button (centered, rotated 90° to suggest vertical swap) → To dropdown.
- At 400px and above, the currency row is horizontal: From | Swap | To.
- Padding on the card reduces to `var(--space-md)` at very small screens (< 360px).
- All interactive elements maintain a minimum 44×44px touch target size.
- Font sizes may slightly reduce on very narrow screens using a media query or `clamp()` — but always reference the token scale.

**Acceptance Criteria:**
- No horizontal scrolling at any width ≥ 320px.
- Currency row layout correctly adapts at 400px breakpoint.
- All text remains readable; no element overflows the card.

- [x] 2.7 — Responsive Adjustments

---

## Phase 3: Dark Theme

### 3.1 — Dark Theme CSS Variables

**Objective:** Define the complete dark color palette using `[data-theme="dark"]`.
**Principle:** Dark theme maintains the exact 60-30-10 distribution. Contrast ratios must meet WCAG AA.

**Deliverables:**
- Add `[data-theme="dark"]` rule to `style.css`.
- Redefine all `--color-*` variables with the dark theme values from `SKILL.md` Section 4.2.
- Redefine `--shadow-*` variables with darker values.
- Ensure `--color-accent` is slightly brighter in dark mode for contrast.

**Acceptance Criteria:**
- Toggling `data-theme="dark"` on `<html>` manually in DevTools applies all colors correctly.
- Text maintains readability against backgrounds (check with a contrast checker tool).
- The 60-30-10 balance is visually preserved.

- [x] 3.1 — Dark Theme CSS Variables

---

### 3.2 — Theme Toggle Button

**Objective:** Implement the light/dark toggle button with icon and localStorage persistence.
**Principle:** Respect user preference, remember choice, transition smoothly.

**Deliverables:**
- Theme toggle button in `<header>`: same size as swap button (40×40px), shows ☀️ icon in light mode, 🌙 in dark mode.
- Click handler toggles `data-theme` attribute on `<html>` element.
- On page load: check `localStorage` for saved theme; if absent, check `window.matchMedia('prefers-color-scheme: dark')`; fall back to light.
- Save chosen theme to `localStorage` on each toggle.
- Add a small inline script in `<head>` that reads `localStorage` and sets `data-theme` before the page paints (prevents flash of wrong theme).

**Acceptance Criteria:**
- Clicking the toggle switches theme instantly.
- Icon updates to reflect the current theme.
- Refreshing preserves the chosen theme.
- A first-time visitor whose OS uses dark mode sees the dark theme automatically.
- No flash of the wrong theme on page load.

- [x] 3.2 — Theme Toggle Button

---

### 3.3 — Theme Transition Polish

**Objective:** Ensure smooth, natural transitions when switching themes.
**Principle:** Every themed element should transition background, color, border, and shadow. But not on initial page load.

**Deliverables:**
- Add CSS transitions to `body`, the card, inputs, selects, buttons, the result panel, and text elements for `background-color`, `color`, `border-color`, and `box-shadow` with `var(--transition-base)`.
- Prevent unwanted transitions on page load by adding a `data-theme-ready` attribute via JavaScript after the initial render, and scoping transitions to `[data-theme-ready] *`.

**Acceptance Criteria:**
- Toggling the theme produces smooth 250ms transitions on all elements.
- Reloading the page does not trigger visible transitions.
- No jarring color flashes.

- [x] 3.3 — Theme Transition Polish

---

## Phase 4: Core Functionality

### 4.1 — ExchangeRate-API Integration

**Objective:** Fetch live exchange rates and cache them appropriately.
**Principle:** Defensive programming; handle failures gracefully; respect rate limits.

**Deliverables:**
- Define `API_KEY` constant (placeholder `"YOUR_API_KEY"` — user replaces).
- Base URL: `https://v6.exchangerate-api.com/v6/`.
- Function `fetchRates(baseCurrency)`:
  - Checks if cached rates for `baseCurrency` exist and are less than 60 seconds old; if so, returns cached data.
  - Otherwise, fetches from the API endpoint.
  - Handles network errors (offline, timeout via `AbortController` with 10-second timeout).
  - Handles API error responses (non-200 status, missing `conversion_rates` key).
  - On success, caches the response with a timestamp.
  - Returns a structured object: `{ rates: {...}, lastUpdate: "ISO timestamp or API string", success: true/false, error: null/"message" }`

**Acceptance Criteria:**
- First call to `fetchRates('ZWL')` makes a network request.
- Second call within 60 seconds returns cached data without a network request.
- Unplugging the network shows a graceful error, not a console crash.
- API key is defined once and easily replaceable.

- [x] 4.1 — ExchangeRate-API Integration

---

### 4.2 — Conversion Logic

**Objective:** Take user input, fetch rates, calculate the converted amount, and display results.
**Principle:** Validate early, compute once, format for humans.

**Deliverables:**
- On form submit (or Convert button click):
  1. Prevent default form submission.
  2. Get amount value; validate it is a positive finite number, less than 1,000,000,000.
  3. Get selected base and target currency codes.
  4. If `base === target`, show 1:1 result instantly (no API call).
  5. Call `fetchRates(baseCurrency)`.
  6. If not successful, show error in result panel.
  7. Get the target rate from `rates[targetCurrency]`.
  8. Calculate: `convertedAmount = amount * rate`.
  9. Format the amount and converted amount according to the currency's decimal rules (ZWL = 0 decimals, most others = 2).
  10. Update the conversion text element: `"{formattedAmount} {base} = {formattedConverted} {target}"`.
  11. Update the rate text: `"1 {base} = {rate} {target}"` (rate shown with 4–6 significant digits).
  12. Update the timestamp from the API response, formatted for readability.
  13. Make the result panel visible with a fade-in.

**Acceptance Criteria:**
- Converting 100 ZWL to ZAR shows a correct live rate and properly formatted amounts.
- Same currency (ZWL → ZWL) shows 1:1 instantly.
- Empty or negative amount shows a validation message; no API call made.
- ZWL results display without decimal places.
- Thousand separators are correct for the locale.

- [x] 4.2 — Conversion Logic

---

### 4.3 — Swap Currencies Function

**Objective:** One-click reversal of base and target currencies.
**Principle:** Don't make the user re-enter data. Swap should be instant and satisfying.

**Deliverables:**
- Click handler on swap button:
  - Reads the currently selected values of both dropdowns.
  - Swaps them.
  - If a result is currently displayed, automatically triggers recalculation (calls the same convert function).
  - Rotates the swap icon 180° with a smooth CSS transition.

**Acceptance Criteria:**
- Clicking swap exchanges the two dropdown selections.
- Any displayed result updates to reflect the reversed pair.
- The icon rotates with a smooth, fast animation.
- Repeated clicks swap back and forth.

- [x] 4.3 — Swap Currencies Function

---

### 4.4 — Loading & Disabled States

**Objective:** Provide clear feedback while the API call is in progress.
**Principle:** Always acknowledge user action; never leave them wondering.

**Deliverables:**
- When conversion starts:
  - Button text changes to "Converting…".
  - Button receives `disabled` attribute and `aria-busy="true"`.
  - Button styling shows reduced opacity and a CSS-only spinner or pulsing animation.
- When conversion completes (success or error):
  - Button text returns to "Convert".
  - Button is re-enabled, `aria-busy` removed.
- If the response is very fast (< 300ms), don't flash the loading state — set a minimum display time.

**Acceptance Criteria:**
- Loading state is immediately visible when the API call starts.
- Button cannot be clicked again while loading.
- Loading state resolves cleanly when the response arrives.
- Fast API responses don't produce a jarring flash.

- [x] 4.4 — Loading & Disabled States

---

### 4.5 — Error Handling Complete

**Objective:** Handle every failure mode with clear, user-friendly messages.
**Principle:** Errors are an expected part of the experience; never show raw error codes.

**Deliverables:**
- Error messages for these scenarios:
  1. Network offline / timeout → "No internet connection. Check your network and try again."
  2. API error (5xx, 4xx) → "Exchange rate service is currently unavailable. Please try again shortly."
  3. Rate limit exceeded → "Too many requests. Please wait a moment before trying again."
  4. Invalid amount (non-numeric, negative, zero) → "Please enter a valid positive amount."
  5. Amount exceeds maximum (≥ 1,000,000,000) → "Amount is too large. Please enter a smaller amount."
  6. Empty amount field → "Please enter an amount to convert."
  7. Unsupported currency pair → "This currency pair is currently unavailable."
- Result panel gets an `.error` class when displaying errors: background tinted with `--color-error`, icon ⚠️, text in `--color-error`.
- Error panel auto-clears on the next successful conversion.

**Acceptance Criteria:**
- Each error scenario produces the correct, human-readable message.
- Error state is visually distinct from success.
- App recovers cleanly after an error.

- [x] 4.5 — Error Handling Complete

---

## Phase 5: Polish & Production Readiness

### 5.1 — Number Formatting by Currency

**Objective:** Apply Zimbabwe-relevant and locale-appropriate number formatting for all currencies.
**Principle:** Respect currency conventions; ZWL with no decimal places acknowledges local context.

**Deliverables:**
- ZWL: `Intl.NumberFormat('en-ZW', { style: 'decimal', maximumFractionDigits: 0, minimumFractionDigits: 0 })`
- USD, EUR, GBP, ZAR, BWP, and most others: 2 decimal places.
- JPY, KRW, TZS, MGA, KMF, CDF: 0 decimal places.
- Rate display: 4–6 significant digits depending on the rate magnitude.
- Thousand separators are locale-aware (follow `Intl.NumberFormat` defaults).

**Acceptance Criteria:**
- Each currency formats correctly according to its conventions.
- ZWL shows no decimal places in all contexts.
- Thousand separators appear correctly.

- [x] 5.1 — Number Formatting by Currency

---

### 5.2 — Keyboard Accessibility

**Objective:** Ensure full keyboard operability.
**Principle:** Every action achievable with a mouse must also work with a keyboard.

**Deliverables:**
- Tab order follows the visual reading order: Amount → From dropdown → Swap → To dropdown → Convert.
- Enter key submits the form from any field.
- Space or Enter activates the swap button and theme toggle.
- No focus trapping; focus is never lost after an action.
- Visible focus ring on all interactive elements (never `outline: none` without a replacement).

**Acceptance Criteria:**
- A full conversion can be completed using only the keyboard.
- Focus never disappears or becomes trapped.
- Focus indicators are visible in both light and dark themes.

- [ ] 5.2 — Keyboard Accessibility

---

### 5.3 — Screen Reader Accessibility

**Objective:** Ensure the app is fully usable with assistive technology.
**Principle:** Semantic HTML plus ARIA where necessary; status announcements are prompt and relevant.

**Deliverables:**
- Result panel has `aria-live="polite"` (already in HTML).
- Swap button has `aria-label="Swap currencies"`.
- Theme toggle has `aria-label="Toggle dark mode"` and `aria-pressed` reflecting the current state.
- Convert button gets `aria-busy="true"` during loading.
- Error messages get `role="alert"` for immediate announcement.
- Decorative icons (flags, arrows) have `aria-hidden="true"`.
- Conversion result announcement is meaningful and self-contained when read aloud.

**Acceptance Criteria:**
- Screen reader announces the conversion result after completion.
- Screen reader announces errors immediately.
- All controls have accessible names.

- [x] 5.3 — Screen Reader Accessibility

---

### 5.4 — Animations & Micro-interactions

**Objective:** Add subtle, purposeful motion that enhances UX without being distracting.
**Principle:** Everything ≤300ms. Respect `prefers-reduced-motion`.

**Deliverables:**
- Result panel reveal: `opacity 0→1` + `translateY(8px→0)` over 300ms, `ease-out`.
- Swap button icon rotation: 180° over 250ms, `ease-in-out`.
- Button press: `scale(0.98)` on `:active`.
- Theme toggle icon: slight rotation (e.g., 15°) on each toggle.
- All animations wrapped in:
  ```css
  @media (prefers-reduced-motion: no-preference) {
    /* animation rules */
  }
  ```

**Acceptance Criteria:**
- Animations complete in ≤300ms and feel smooth.
- With `prefers-reduced-motion: reduce`, only essential transitions remain.
- No animations cause layout shifts or jitter.

- [x] 5.4 — Animations & Micro-interactions

---

### 5.5 — Favicon & Meta Tags

**Objective:** Complete the "production" feel with proper metadata.
**Principle:** The browser tab and social preview represent the app's quality.

**Deliverables:**
- `favicon.svg`: a simple, clean currency exchange icon. Must be recognizable at 16×16px.
- `<meta name="description">`: short description of the app.
- Open Graph tags: `og:title`, `og:description`, `og:image`, `og:url`.
- `<meta name="theme-color">` — dynamic via JavaScript: `#0D6EFD` in light mode, `#1A1D23` in dark mode.
- Viewport meta tag ensures proper mobile rendering.

**Acceptance Criteria:**
- Favicon renders in the browser tab and bookmarks.
- Social preview looks professional.
- Browser chrome/status bar color matches the active theme.

- [x] 5.5 — Favicon & Meta Tags

---

### 5.6 — Cross-Browser Testing

**Objective:** Verify the app works correctly across all target browsers.
**Principle:** Ship with confidence; no browser-specific surprises.

**Test matrix:**

| Browser | Version | Platform |
|---|---|---|
| Chrome | Latest | Desktop + Android |
| Firefox | Latest | Desktop |
| Safari | Latest | Desktop + iOS |
| Edge | Latest | Desktop |
| Samsung Internet | Latest | Android (optional) |

**Checklist per browser:**
- Layout renders correctly.
- Theme toggle works.
- Conversion calculates correctly.
- Dropdowns open and function.
- Animations are smooth.
- No console errors.

**Acceptance Criteria:**
- All browsers in the matrix pass the checklist.
- Any browser-specific issues are documented and fixed.

- [x] 5.6 — Cross-Browser Testing

---

### 5.7 — Final Code Cleanup

**Objective:** Ensure the codebase is professional and interview-ready.
**Principle:** Clean code signals professionalism; the code is part of the portfolio.

**Deliverables:**
- Remove all `console.log` statements (keep only critical `console.error` for actual errors).
- Consistent formatting: 2-space indentation throughout all files.
- JavaScript uses `"use strict"` at the top.
- Meaningful comments explaining why, not what.
- All variables and function names are descriptive (no single-letter names except loop indices).
- No dead code, no commented-out blocks.
- `README.md` is complete and accurate.
- All files pass basic linting (no trailing whitespace, consistent line endings).

**Acceptance Criteria:**
- A reviewer can understand the project structure in under 5 minutes.
- Code reads cleanly; no obvious anti-patterns.

- [x] 5.7 — Final Code Cleanup

---

### 5.8 — GitHub Pages Deployment

**Objective:** Deploy the app and verify it works in production.
**Principle:** A live URL is stronger than any explanation.

**Deliverables:**
- Push all completed, tested code to the `main` branch.
- Enable GitHub Pages from repo Settings, set source to `main` branch, root folder.
- Verify the live URL: `https://gifthlahla.github.io/zim-currency-converter`.
- Test the full conversion flow on the live site.
- Verify HTTPS is enforced.

**Acceptance Criteria:**
- Live URL loads the app and all assets without 404s.
- API calls succeed.
- Theme toggle works.
- All features functional on the live site.

- [ ] 5.8 — GitHub Pages Deployment

---

### 5.9 — README Finalization

**Objective:** Complete the project documentation with screenshots and accurate information.
**Principle:** The README is the first impression for recruiters and collaborators.

**Deliverables:**
- Update `README.md` with:
  - App title and description.
  - Feature list.
  - Tech stack.
  - Live demo link.
  - Screenshots of light and dark modes (actual screenshots of the live deployed app).
  - Setup instructions (clone, API key, open).
  - License (MIT).

**Acceptance Criteria:**
- README is complete, accurate, and visually appealing.
- Screenshots are crisp and representative.
- A first-time visitor can understand the project in 60 seconds.

- [ ] 5.9 — README Finalization

---

## Phase 6: Post-MVP (Stretch Goals)

> Do not begin this phase until Phase 5 is fully complete and VERIFIED.

- [ ] 6.1 — Allow comma/space separators while typing in the amount field (e.g., "1,000,000").
- [ ] 6.2 — Add a currency search/filter within the dropdown (type to find currency).
- [ ] 6.3 — Save the user's last-used currency pair to `localStorage` and restore on load.
- [ ] 6.4 — Offline detection: show the last cached rates with a "Rates from [date]" notice.
- [ ] 6.5 — PWA support: `manifest.json`, service worker for offline caching, install prompt.
- [ ] 6.6 — "Copy result" button to copy the conversion text to the clipboard.
- [ ] 6.7 — Multi-currency view: convert the base amount to 3–5 popular targets simultaneously.
- [ ] 6.8 — Add a rate trend sparkline (requires a different API or additional data points).

---

*End of SCOPE.md*
