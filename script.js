"use strict";

// Placeholder currency list — populated in Task 1.3
const CURRENCIES = [];

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('converter-form');
  if (form) form.addEventListener('submit', (e) => e.preventDefault());
  console.log('zim-currency-converter initialized');
});
