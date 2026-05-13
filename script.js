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
    updateThemeColor(theme);
  };

  const updateThemeColor = (theme) => {
    const meta = document.getElementById('theme-meta');
    if (meta) {
      meta.setAttribute('content', theme === 'dark' ? '#1A1D23' : '#0D6EFD');
    }
  };

  toggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme') || 'light';
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  });

  // Sync UI and theme-color with initial state
  const initialTheme = html.getAttribute('data-theme') || 'light';
  updateToggleUI(initialTheme);
  updateThemeColor(initialTheme);
}

function formatCurrency(amount, currencyCode) {
  // ZWL and several others traditionally use no decimals
  const noDecimals = ['ZWL', 'JPY', 'KRW', 'TZS', 'MGA', 'KMF', 'CDF'].includes(currencyCode);
  
  const options = {
    style: 'decimal',
    maximumFractionDigits: noDecimals ? 0 : 2,
    minimumFractionDigits: noDecimals ? 0 : 2
  };
  
  // Use en-ZW locale for Zimbabwe-relevant formatting (comma separators)
  return new Intl.NumberFormat('en-ZW', options).format(amount);
}

function formatRate(rate) {
  // Show 4-6 significant digits based on magnitude
  if (rate >= 100) return rate.toFixed(2);
  if (rate >= 1) return rate.toFixed(4);
  return rate.toPrecision(6);
}

function showResult(amount, from, converted, to, rate, timestamp) {
  const panel = document.querySelector('.result-panel');
  if (!panel) return;

  panel.classList.remove('error');
  panel.removeAttribute('role'); 
  panel.hidden = false;
  
  // Trigger pop animation
  panel.classList.remove('success-pop');
  void panel.offsetWidth; // Force reflow
  panel.classList.add('success-pop');
  
  panel.querySelector('.conversion-text').textContent = `${formatCurrency(amount, from)} ${from} = ${formatCurrency(converted, to)} ${to}`;
  panel.querySelector('.rate-text').textContent = `1 ${from} = ${formatRate(rate)} ${to}`;
  
  // Format timestamp for better readability
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString('en-ZW', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });
  
  panel.querySelector('.timestamp').textContent = `Last updated: ${formattedDate}`;
}

function showError(type, customMessage = "") {
  const panel = document.querySelector('.result-panel');
  if (!panel) return;

  const messages = {
    'network': "No internet connection. Check your network and try again.",
    'timeout': "Connection timed out. Please try again.",
    'api': "Exchange rate service is currently unavailable. Please try again shortly.",
    'rate-limit': "Too many requests. Please wait a moment before trying again.",
    'invalid-amount': "Please enter a valid positive amount.",
    'large-amount': "Amount is too large. Max: 1,000,000,000.",
    'empty': "Please enter an amount to convert.",
    'unsupported': "This currency pair is currently unavailable."
  };

  const message = customMessage || messages[type] || "An unexpected error occurred.";

  panel.classList.add('error');
  panel.setAttribute('role', 'alert');
  panel.hidden = false;
  panel.querySelector('.conversion-text').textContent = "⚠️ Error";
  panel.querySelector('.rate-text').textContent = message;
  panel.querySelector('.timestamp').textContent = "";
}

async function handleConversion(e) {
  if (e && e.preventDefault) e.preventDefault();
  
  const form = document.getElementById('converter-form');
  const submitBtn = form.querySelector('button[type="submit"]');
  const amountStr = form.amount.value.trim();
  const amount = parseFloat(amountStr);
  const from = form.from.value;
  const to = form.to.value;

  // 1. Validation
  if (amountStr === "") {
    showError('empty');
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    showError('invalid-amount');
    return;
  }
  if (amount >= 1000000000) {
    showError('large-amount');
    return;
  }

  // 2. Loading state
  const startTime = Date.now();
  submitBtn.disabled = true;
  submitBtn.textContent = "Converting...";
  submitBtn.setAttribute('aria-busy', 'true');

  // 3. Same currency optimization
  if (from === to) {
    showResult(amount, from, amount, to, 1, new Date().toUTCString());
    submitBtn.disabled = false;
    submitBtn.textContent = "Convert";
    submitBtn.removeAttribute('aria-busy');
    return;
  }

  // 4. Fetch and calculate
  try {
    const result = await fetchRates(from);
    
    // Ensure minimum display time (300ms)
    const elapsed = Date.now() - startTime;
    if (elapsed < 300) {
      await new Promise(resolve => setTimeout(resolve, 300 - elapsed));
    }

    if (!result.success) {
      if (result.error === 'Connection timed out') {
        showError('timeout');
      } else if (result.error === 'quota-reached') {
        showError('rate-limit');
      } else if (result.error === 'unsupported-code') {
        showError('unsupported');
      } else if (!navigator.onLine) {
        showError('network');
      } else {
        showError('api');
      }
      return;
    }

    const rate = result.rates[to];
    if (!rate) {
      showError('unsupported');
      return;
    }

    const converted = amount * rate;
    showResult(amount, from, converted, to, rate, result.lastUpdate);
  } catch (err) {
    showError('api');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Convert";
    submitBtn.removeAttribute('aria-busy');
  }
}

function initSwap() {
  const swapBtn = document.getElementById('swap');
  const fromSelect = document.getElementById('from');
  const toSelect = document.getElementById('to');
  const form = document.getElementById('converter-form');
  const resultPanel = document.querySelector('.result-panel');

  if (!swapBtn || !fromSelect || !toSelect || !form) return;

  let rotation = 0;

  swapBtn.addEventListener('click', () => {
    // 1. Swap selections
    const temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;

    // 2. Animate rotation (cumulative)
    rotation += 180;
    // Check if we are in stacked mode (mobile) to maintain the 90deg offset if needed
    const isStacked = window.getComputedStyle(document.querySelector('.currency-row')).flexDirection === 'column';
    swapBtn.style.transform = `rotate(${rotation + (isStacked ? 90 : 0)}deg)`;

    // 3. Re-convert if result is visible
    if (!resultPanel.hidden) {
      handleConversion({ preventDefault: () => {}, target: form });
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('converter-form');
  if (form) form.addEventListener('submit', handleConversion);

  populateCurrencySelects();
  initTheme();
  initSwap();

  // Enable transitions after initial paint to prevent theme flash
  setTimeout(() => {
    document.documentElement.setAttribute('data-theme-ready', 'true');
  }, 20);

  console.log('zim-currency-converter initialized');
});
