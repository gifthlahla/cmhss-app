"use strict";

const API_KEY = "f76d6ceb9eaa3cb1df85ac71";
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
  { code: "ZWL", name: "Zimbabwean Dollar",  country: "zw" },
  { code: "ZAR", name: "South African Rand", country: "za" },
  { code: "BWP", name: "Botswana Pula",       country: "bw" },
  { code: "ZMW", name: "Zambian Kwacha",      country: "zm" },
  { code: "MWK", name: "Malawian Kwacha",     country: "mw" },
  { code: "MZN", name: "Mozambican Metical",  country: "mz" },
  { code: "AOA", name: "Angolan Kwanza",      country: "ao" },
  { code: "NAD", name: "Namibian Dollar",     country: "na" },
  { code: "SZL", name: "Swazi Lilangeni",     country: "sz" },
  { code: "LSL", name: "Lesotho Loti",        country: "ls" },
  { code: "TZS", name: "Tanzanian Shilling",  country: "tz" },
  { code: "MGA", name: "Malagasy Ariary",     country: "mg" },
  { code: "MUR", name: "Mauritian Rupee",     country: "mu" },
  { code: "SCR", name: "Seychellois Rupee",   country: "sc" },
  { code: "KMF", name: "Comorian Franc",      country: "km" },
  { code: "CDF", name: "Congolese Franc",     country: "cd" },
  { code: "USD", name: "US Dollar",           country: "us" },
  { code: "EUR", name: "Euro",                country: "eu" },
  { code: "GBP", name: "British Pound",       country: "gb" },
  { code: "CNY", name: "Chinese Yuan",        country: "cn" },
  { code: "INR", name: "Indian Rupee",        country: "in" },
  { code: "JPY", name: "Japanese Yen",        country: "jp" },
  { code: "AED", name: "UAE Dirham",          country: "ae" }
];

const SYMBOL_MAP = {
  "USD": "$", "EUR": "€", "GBP": "£", "ZAR": "R", "BWP": "P",
  "ZWL": "Z$", "ZMW": "K", "MWK": "K", "MZN": "MT", "AOA": "Kz",
  "NAD": "N$", "SZL": "L", "LSL": "L", "TZS": "Sh", "MGA": "Ar",
  "MUR": "₨", "SCR": "SR", "KMF": "CF", "CDF": "FC", "CNY": "¥",
  "INR": "₹", "JPY": "¥", "AED": "د.إ"
};

function getSymbol(code) {
  return SYMBOL_MAP[code] || "$";
}


function createOption(currency) {
  const opt = document.createElement('option');
  opt.value = currency.code;
  // Fallback text for the hidden native select
  opt.textContent = `${currency.code} – ${currency.name}`;
  opt.setAttribute('aria-label', `${currency.name} (${currency.code})`);
  return opt;
}

function populateCurrencySelects() {
  const fromSelect = document.getElementById('from');
  const toSelect = document.getElementById('to');
  if (!fromSelect || !toSelect) return;

  fromSelect.innerHTML = '';
  toSelect.innerHTML = '';

  CURRENCIES.forEach((c) => {
    fromSelect.appendChild(createOption(c));
    toSelect.appendChild(createOption(c));
  });

  // Set defaults
  fromSelect.value = 'ZWL';
  toSelect.value = 'ZAR';

  // Update Symbol Init
  const symbolEl = document.getElementById('currency-symbol');
  if (symbolEl) symbolEl.textContent = getSymbol('ZWL');

  // Initialize Custom Selects
  new CustomSelect(fromSelect);
  new CustomSelect(toSelect);

  // Listen for changes to update symbol
  fromSelect.addEventListener('change', (e) => {
    if (symbolEl) symbolEl.textContent = getSymbol(e.target.value);
  });
}

class CustomSelect {
  constructor(nativeSelect) {
    this.nativeSelect = nativeSelect;
    this.container = nativeSelect.parentElement;
    this.isOpen = false;
    this.options = CURRENCIES;
    this.filteredOptions = [...this.options];

    this.render();
    this.setupEvents();
  }

  render() {
    const selectedValue = this.nativeSelect.value;
    const selectedOption = this.options.find(o => o.code === selectedValue);

    this.container.innerHTML = '';
    this.container.appendChild(this.nativeSelect);

    const customEl = document.createElement('div');
    customEl.className = 'custom-select';
    
    customEl.innerHTML = `
      <div class="custom-select-trigger" tabindex="0">
        <img src="${getFlagUrl(selectedOption.country)}" class="flag-icon" alt="">
        <span class="currency-code">${selectedOption.code}</span>
        <span class="chevron">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </span>
      </div>
      <div class="custom-select-dropdown">
        <div class="custom-select-search-container">
          <input type="text" class="custom-select-search" placeholder="Search currency..." spellcheck="false">
        </div>
        <div class="custom-select-options"></div>
      </div>
    `;

    this.container.appendChild(customEl);
    this.customEl = customEl;
    this.trigger = customEl.querySelector('.custom-select-trigger');
    this.dropdown = customEl.querySelector('.custom-select-dropdown');
    this.searchInput = customEl.querySelector('.custom-select-search');
    this.optionsList = customEl.querySelector('.custom-select-options');

    this.renderOptions();
  }

  renderOptions() {
    this.optionsList.innerHTML = '';
    this.filteredOptions.forEach((opt) => {
      const isSelected = opt.code === this.nativeSelect.value;
      const optionEl = document.createElement('div');
      optionEl.className = `custom-select-option ${isSelected ? 'selected' : ''}`;
      optionEl.innerHTML = `
        <img src="${getFlagUrl(opt.country)}" class="flag-icon" alt="" loading="lazy">
        <span class="currency-code">${opt.code}</span>
        <span class="currency-name">${opt.name}</span>
      `;
      optionEl.onclick = () => this.selectOption(opt.code);
      this.optionsList.appendChild(optionEl);
    });
  }

  setupEvents() {
    this.trigger.onclick = (e) => {
      e.stopPropagation();
      this.toggle();
    };

    this.searchInput.onclick = (e) => e.stopPropagation();
    this.searchInput.oninput = (e) => this.filterOptions(e.target.value);

    document.addEventListener('click', () => this.close());

    this.nativeSelect.addEventListener('change', () => this.updateTrigger());

    this.trigger.onkeydown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggle();
      } else if (e.key === 'Escape') {
        this.close();
      }
    };
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.isOpen = true;
    this.customEl.classList.add('open');
    this.searchInput.value = '';
    this.filterOptions('');
    setTimeout(() => this.searchInput.focus(), 50);
    
    // Close other custom selects
    document.querySelectorAll('.custom-select.open').forEach(el => {
      if (el !== this.customEl) el.classList.remove('open');
    });
  }

  close() {
    this.isOpen = false;
    this.customEl.classList.remove('open');
  }

  filterOptions(query) {
    const q = query.toLowerCase();
    this.filteredOptions = this.options.filter(o => 
      o.code.toLowerCase().includes(q) || 
      o.name.toLowerCase().includes(q)
    );
    this.renderOptions();
  }

  selectOption(code) {
    this.nativeSelect.value = code;
    this.nativeSelect.dispatchEvent(new Event('change'));
    this.close();
    this.updateTrigger();
  }

  updateTrigger() {
    const selectedOption = this.options.find(o => o.code === this.nativeSelect.value);
    const flag = this.trigger.querySelector('.flag-icon');
    const code = this.trigger.querySelector('.currency-code');
    
    flag.src = getFlagUrl(selectedOption.country);
    code.textContent = selectedOption.code;
  }
}

function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  if (!toggle) return;

  const updateToggleUI = (theme) => {
    // Icons are handled via CSS classes for light/dark
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

function triggerCelebration() {
  const panel = document.querySelector('.result-panel');
  const container = document.createElement('div');
  container.className = 'celebration';
  panel.appendChild(container);

  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
    p.style.setProperty('--tx', `${(Math.random() - 0.5) * 200}px`);
    p.style.setProperty('--ty', `${(Math.random() - 0.5) * 200}px`);
    p.style.left = '50%';
    p.style.top = '50%';
    container.appendChild(p);
  }

  setTimeout(() => container.remove(), 1000);
}

function showResult(amount, from, converted, to, rate, timestamp) {
  const panel = document.querySelector('.result-panel');
  if (!panel) return;

  panel.classList.remove('error');
  panel.removeAttribute('role'); 
  panel.hidden = false;
  
  // Trigger pop animation and celebration
  panel.classList.remove('success-pop');
  void panel.offsetWidth; // Force reflow
  panel.classList.add('success-pop');
  triggerCelebration();
  
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
});
