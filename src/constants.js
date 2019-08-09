const path = require('path');

const API_URL = "https://api.exchangeratesapi.io";
const API_LATEST = `${API_URL}/latest`;

const CACHE_FILE = '/tmp/currency_cache';
const CACHE_EXPIRY = 1;

const FLAGS_PATH = path.join(__dirname, '..', 'flags');
const FLAGS_EXTENSION = 'png';

const DEFAULT_CURRENCY = "PLN";

const RATES_ORDER = [
  'PLN',
  'EUR',
  'USD',
  'GBP',
];

module.exports = {
  API_URL,
  API_LATEST,
  CACHE_FILE,
  CACHE_EXPIRY,
  FLAGS_PATH,
  FLAGS_EXTENSION,
  DEFAULT_CURRENCY,
  RATES_ORDER,
}
