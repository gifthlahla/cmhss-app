"use strict";

const API_KEY = "YOUR_API_KEY";
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

const CACHE_DURATION = 60 * 1000; // 60 seconds
const cache = new Map();

async function fetchRates(baseCurrency) {
  // Check cache first
  const cached = cache.get(baseCurrency);
  if (cached && (Date.now() - cached.timestamp < CACHE_DURATION)) {
    return { success: true, rates: cached.rates, lastUpdate: cached.lastUpdate };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

  try {
    const response = await fetch(`${BASE_URL}${baseCurrency}`, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.result === "error") {
      throw new Error(data['error-type'] || 'API Error');
    }

    const result = {
      rates: data.conversion_rates,
      timestamp: Date.now(),
      lastUpdate: data.time_last_update_utc
    };

    // Store in cache
    cache.set(baseCurrency, result);

    return { success: true, ...result };
  } catch (error) {
    clearTimeout(timeoutId);
    return {
      success: false,
      error: error.name === 'AbortError' ? 'Connection timed out' : error.message
    };
  }
}

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

function formatCurrency(amount, currencyCode) {
  const noDecimals = ['ZWL', 'JPY', 'KRW', 'TZS', 'MGA', 'KMF', 'CDF'].includes(currencyCode);
  const options = {
    style: 'decimal',
    maximumFractionDigits: noDecimals ? 0 : 2,
    minimumFractionDigits: noDecimals ? 0 : 2
  };
  return new Intl.NumberFormat('en-ZW', options).format(amount);
}

function showResult(amount, from, converted, to, rate, timestamp) {
  const panel = document.querySelector('.result-panel');
  if (!panel) return;

  panel.classList.remove('error');
  panel.hidden = false;
  
  panel.querySelector('.conversion-text').textContent = `${formatCurrency(amount, from)} ${from} = ${formatCurrency(converted, to)} ${to}`;
  panel.querySelector('.rate-text').textContent = `1 ${from} = ${rate.toFixed(6).replace(/\.?0+$/, '')} ${to}`;
  panel.querySelector('.timestamp').textContent = `Last updated: ${timestamp}`;
}

function showError(message) {
  const panel = document.querySelector('.result-panel');
  if (!panel) return;

  panel.classList.add('error');
  panel.hidden = false;
  panel.querySelector('.conversion-text').textContent = "Conversion Error";
  panel.querySelector('.rate-text').textContent = message;
  panel.querySelector('.timestamp').textContent = "";
}

async function handleConversion(e) {
  e.preventDefault();
  
  const form = e.target;
  const amount = parseFloat(form.amount.value);
  const from = form.from.value;
  const to = form.to.value;

  // 1. Validation
  if (isNaN(amount) || amount <= 0) {
    showError("Please enter a valid positive amount.");
    return;
  }
  if (amount >= 1000000000) {
    showError("Amount is too large. Max: 1,000,000,000.");
    return;
  }

  // 2. Same currency optimization
  if (from === to) {
    showResult(amount, from, amount, to, 1, new Date().toUTCString());
    return;
  }

  // 3. Fetch and calculate
  const result = await fetchRates(from);
  if (!result.success) {
    showError(result.error || "Failed to fetch exchange rates.");
    return;
  }

  const rate = result.rates[to];
  if (!rate) {
    showError(`Exchange rate for ${to} not found.`);
    return;
  }

  const converted = amount * rate;
  showResult(amount, from, converted, to, rate, result.lastUpdate);
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('converter-form');
  if (form) form.addEventListener('submit', handleConversion);

  populateCurrencySelects();
  initTheme();

  // Enable transitions after initial paint to prevent theme flash
  setTimeout(() => {
    document.documentElement.setAttribute('data-theme-ready', 'true');
  }, 20);

  console.log('zim-currency-converter initialized');
});
