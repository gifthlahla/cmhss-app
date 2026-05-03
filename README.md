# Zim-Currency-Converter

A minimalist, real-time currency converter for Zimbabwe and the SADC region — built with vanilla HTML, CSS & JavaScript, featuring live rates, light/dark themes, and a clean 60-30-10 design system.

---

## Features

- **Real-Time Conversion** — Fetches live rates from ExchangeRate-API (160+ currencies)
- **SADC-Focused** — All 16 SADC member currencies plus 7 major trading currencies (23 total)
- **Light/Dark Mode** — Clean theme switching with system preference detection and persistence
- **One-Click Swap** — Instantly reverse the base and target currencies
- **Minimalist UI** — Built on the 60-30-10 color rule for a balanced, professional aesthetic
- **Accessible** — Semantic HTML, keyboard navigation, ARIA labels, and screen-reader friendly
- **Responsive** — Works seamlessly from 320px mobile to desktop
- **Live Timestamp** — Always shows when the rates were last updated
- **ZWL Native** — Zimbabwean Dollar formatted correctly with no decimal places

---

## Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 (Semantic, Accessible) |
| Styling | CSS3 (Custom Properties, Flexbox, Media Queries) |
| Logic | Vanilla JavaScript (ES6+, Strict Mode) |
| API | [ExchangeRate-API](https://www.exchangerate-api.com/) (free tier) |
| Hosting | GitHub Pages |

**Zero dependencies** — no npm, no frameworks, no build tools.

---

## Live Demo

> **[gifthlahla.github.io/zim-currency-converter](https://gifthlahla.github.io/zim-currency-converter)**

---

## 📸 Screenshots

| Light Mode | Dark Mode |
|---|---|
| *Screenshot coming soon* | *Screenshot coming soon* |

---

## 📁 Project Structure

```
zim-currency-converter/
├── index.html        # Page structure & semantic markup
├── style.css         # Complete design system & responsive styling
├── script.js         # API calls, DOM logic, currency formatting
├── assets/
│   └── favicon.svg   # App favicon
├── README.md         # This file
├── SCOPE.md          # Master task checklist
├── PROGRESS.md       # Development tracking log
└── SKILL.md          # Design constitution & AI rules
```

---

## How It Works

1. Select your base currency (default: ZWL)
2. Select your target currency (default: ZAR)
3. Enter the amount to convert
4. Click **Convert** — the app fetches the live exchange rate and displays the result
5. Use the **swap button** (⇄) to quickly reverse the currency pair
6. Toggle the **theme button** (☀️/🌙) to switch between light and dark modes

---

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/gifthlahla/zim-currency-converter.git
cd zim-currency-converter
```

### 2. Get a free API key

- Visit [ExchangeRate-API](https://www.exchangerate-api.com/)
- Sign up for a free account (no credit card required)
- Copy your API key from the dashboard

### 3. Add your API key

- Open `script.js`
- Replace `"YOUR_API_KEY"` with your actual key

### 4. Open the app

- Open `index.html` in your browser
- No build tools or server required

---

## Why This Project

This app demonstrates practical, production-ready skills:

- **API Integration** — Fetching, caching, and error-handling REST API responses
- **DOM Manipulation** — Dynamic UI updates with vanilla JavaScript
- **Design System Architecture** — 60-30-10 color rule enforced via CSS custom properties
- **Theme Engineering** — Smooth light/dark switching with system preference detection
- **Accessibility** — Semantic HTML, keyboard operability, screen-reader announcements
- **Local Relevance** — SADC currency focus with ZWL as the default, showing regional market awareness that resonates with financial and fintech employers in Zimbabwe and Southern Africa

---

## Development Workflow

This project follows a strict single-step development protocol:

- Every change is scoped to exactly one task in `SCOPE.md`
- All progress is tracked in `PROGRESS.md`
- AI agents follow the rules defined in `SKILL.md`
- Each task is tested and marked `VERIFIED` before the next begins

---

## Acknowledgements

- Exchange rates provided by [ExchangeRate-API](https://www.exchangerate-api.com/)
- Inspired by real-world currency needs in Zimbabwe and the SADC region

---
