const CURRENCY_MAP = {
  '$': 'USD',
  '￥': 'CNY',
  '¥': 'JPY',
  '£': 'GBP',
  '€': 'EUR',
  'złoty': 'PLN',
  'zloty': 'PLN',
  'zlotych': 'PLN',
  'złotych': 'PLN',
  'zł': 'PLN',
};

const CURRENCY_SINGS = ['\\$', '￥', '¥', '£', '€']

const CURRENCIES_SIGNS = CURRENCY_SINGS.join('|');
const CURRENCY_REGEXP = new RegExp(`([^\\d\\s]+|${CURRENCIES_SIGNS})`, 'ig');

const getCurrency = s => CURRENCY_MAP[s.toLowerCase()] || s.toUpperCase();

const round = (n, d = 2) => Math.round(n * (10**d)) / (10**d);

module.exports = {
  round,
  getCurrency,
  CURRENCY_REGEXP
}
