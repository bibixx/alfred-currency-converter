const debug = require('debug')('debug');
const {
  API_LATEST,
} = require('./constants');

const { cachedFetch } = require('./cachedFetch');
const { alfredFormat } = require('./alfredFormat');
const { parseInput } = require('./parseInput');

(async () => {
  const [,,...inputs] = process.argv;
  const input = inputs.join(' ');

  const {
    isConversion,
    amount,
    inputCurrency,
    outputCurrency,
  } = parseInput(input);

  const {
    response: {
      rates,
    },
    modifyDate: lastUpdated
  } = await cachedFetch(inputCurrency, `${API_LATEST}?base=${inputCurrency}`);

  if (isConversion && outputCurrency) {
    const outputRate = Object.entries(rates).find(([currency]) => currency === outputCurrency)[1];

    return console.log(
      alfredFormat({
        rates: { [outputCurrency]: outputRate },
        base: inputCurrency,
        lastUpdated,
        amount,
        shouldFilter: false,
      })
    );
  } else {
    return console.log(
      alfredFormat({
        rates,
        base: inputCurrency,
        lastUpdated,
        amount,
      })
    );
  }
})();
