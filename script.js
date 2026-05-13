"use strict";

const CURRENCIES = [
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
  { code: "USD", name: "US Dollar",           flag: "🇺🇸" },
  { code: "EUR", name: "Euro",                flag: "🇪🇺" },
  { code: "GBP", name: "British Pound",       flag: "🇬🇧" },
  { code: "CNY", name: "Chinese Yuan",        flag: "🇨🇳" },
  { code: "INR", name: "Indian Rupee",        flag: "🇮🇳" },
  { code: "JPY", name: "Japanese Yen",        flag: "🇯🇵" },
  { code: "AED", name: "UAE Dirham",          flag: "🇦🇪" }
];

function createOption(currency) {
  const opt = document.createElement('option');
  opt.value = currency.code;
  opt.textContent = `${currency.flag} ${currency.code} – ${currency.name}`;
  opt.setAttribute('aria-label', `${currency.name} (${currency.code})`);
  return opt;
}

function populateCurrencySelects() {
  const fromSelect = document.getElementById('from');
  const toSelect = document.getElementById('to');
  if (!fromSelect || !toSelect) return;

  // Clear existing options (if any)
  fromSelect.innerHTML = '';
  toSelect.innerHTML = '';

  CURRENCIES.forEach((c) => {
    const optionA = createOption(c);
    const optionB = createOption(c);
    fromSelect.appendChild(optionA);
    toSelect.appendChild(optionB);
  });

  // Defaults: From = ZWL, To = ZAR
  fromSelect.value = 'ZWL';
  toSelect.value = 'ZAR';
}

function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  if (!toggle) return;

  const updateToggleUI = (theme) => {
    toggle.textContent = theme === 'dark' ? '🌙' : '☀️';
    toggle.setAttribute('aria-pressed', theme === 'dark');
  };

  const setTheme = (theme) => {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateToggleUI(theme);
  };

  toggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme') || 'light';
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  });

  // Sync UI with initial state (set by head script)
  updateToggleUI(html.getAttribute('data-theme') || 'light');
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('converter-form');
  if (form) form.addEventListener('submit', (e) => e.preventDefault());

  populateCurrencySelects();
  initTheme();

  // Enable transitions after initial paint to prevent theme flash
  setTimeout(() => {
    document.documentElement.setAttribute('data-theme-ready', 'true');
  }, 20);

  console.log('zim-currency-converter initialized');
});
