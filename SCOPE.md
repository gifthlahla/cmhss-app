# SCOPE.md — zim-currency-converter

> **Master task checklist.** Each checkbox = one atomic AI prompt.
> Mark `[x]` only after the task is tested and `VERIFIED` by a human.

---

## Phase 1: Project Foundation (Skeleton & Static UI)
- [x] 1.1 — Initialize Repository & File Structure
- [x] 1.2 — HTML Semantic Shell
- [x] 1.3 — Currency Dropdown Population

---

## Phase 2: Design System & Light Theme
- [x] 2.1 — CSS Custom Properties (Design Tokens)
- [x] 2.2 — CSS Reset & Base Styles
- [x] 2.3 — Layout: Card Container
- [x] 2.4 — Typography & Header Styling
- [x] 2.5 — Form Elements Styling
- [x] 2.6 — Result Panel Styling
- [x] 2.7 — Responsive Adjustments

---

## Phase 3: Dark Theme
- [x] 3.1 — Dark Theme CSS Variables
- [x] 3.2 — Theme Toggle Button
- [x] 3.3 — Theme Transition Polish

---

## Phase 4: Core Functionality
- [x] 4.1 — ExchangeRate-API Integration
- [x] 4.2 — Conversion Logic
- [x] 4.3 — Swap Currencies Function
- [x] 4.4 — Loading & Disabled States
- [x] 4.5 — Error Handling Complete

---

## Phase 5: Polish & Production Readiness
- [x] 5.1 — Number Formatting by Currency
- [x] 5.2 — Keyboard Accessibility
- [x] 5.3 — Screen Reader Accessibility
- [x] 5.4 — Animations & Micro-interactions
- [x] 5.5 — Favicon & Meta Tags
- [x] 5.6 — Cross-Browser Testing
- [x] 5.7 — Final Code Cleanup
- [x] 5.8 — GitHub Pages Deployment
- [x] 5.9 — README Finalization

---

## Phase 7: UI Polish Pack (Premium Features)

### 7.1 — Glassmorphism & Background
**Objective:** Add a premium frosted-glass look and animated background.
- [x] 7.1.1 — Implement animated mesh background on `body`.
- [x] 7.1.2 — Add `backdrop-filter` and semi-transparent backgrounds to the card.

### 7.2 — Custom Searchable Selects
**Objective:** Replace standard dropdowns with searchable, custom-styled components.
- [x] 7.2.1 — Build custom dropdown UI with search input.
- [x] 7.2.2 — Implement filtering logic and keyboard navigation for the custom list.

### 7.3 — Input Polish & Feedback
**Objective:** Add dynamic currency symbols and success micro-feedback.
- [x] 7.3.1 — Display currency symbol ($, R, P) inside the amount input.
- [x] 7.3.2 — Add "Success Celebration" animation on conversion.

### 7.4 — Professional Icon Overhaul
**Objective:** Replace all emojis with minimalist, high-quality SVG icons and circular flags.
- [x] 7.4.1 — Replace header, swap, and theme emojis with modern SVG icons.
- [x] 7.4.2 — Replace currency emoji flags with circular, high-resolution flag icons.
- [x] 7.4.3 — Unify stroke weight (1.5px) across all UI icons.

---

## Phase 6: Post-MVP (Original Stretch Goals)

- [ ] 6.1 — Allow comma/space separators while typing.
- [ ] 6.2 — (Merged into 7.2)
- [ ] 6.3 — Save last-used currency pair to `localStorage`.
- [ ] 6.4 — Offline detection notice.
- [ ] 6.5 — PWA support.
- [ ] 6.6 — "Copy result" button.
- [ ] 6.7 — Multi-currency view.
- [ ] 6.8 — Rate trend sparkline.

---

*End of SCOPE.md*
