const {
  DEFAULT_CURRENCY,
} = require('./constants');

const {
  ALLOWED_CURRENCIES,
} = require('./allowedCurrencies');

const {
  getCurrency,
  CURRENCY_REGEXP
} = require('./currencyUtils');

const parseInput = (argv) => {
  const [input = "", output = ""] = argv.split(/ to ?/);

  const isConversion = Boolean(input && output);

  const [amount = 1] = input.match(/(\d+)/) || [];
  const inputCurrencyMatch = input.match(CURRENCY_REGEXP) || [DEFAULT_CURRENCY];
  const inputCurrency = getCurrency(inputCurrencyMatch[0]).toUpperCase();
  const outputCurrencyMatch = output.match(CURRENCY_REGEXP) || [DEFAULT_CURRENCY];
  const outputCurrency = getCurrency(outputCurrencyMatch[0]).toUpperCase();

  const validatedInputCurrency = ALLOWED_CURRENCIES.includes(inputCurrency) ? inputCurrency : DEFAULT_CURRENCY;
  const validatedOutputCurrency = ALLOWED_CURRENCIES.includes(outputCurrency) ? outputCurrency : DEFAULT_CURRENCY;

  return {
    isConversion,
    amount,
    inputCurrency: validatedInputCurrency,
    outputCurrency: validatedOutputCurrency,
  }
}


module.exports = { parseInput }
