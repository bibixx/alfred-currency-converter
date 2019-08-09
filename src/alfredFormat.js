const path = require('path');
const formatDate = require('date-fns/format')

const {
  FLAGS_PATH,
  FLAGS_EXTENSION,
} = require('./constants');

const { sortRates } = require('./sortRates');

const { round } = require('./currencyUtils');

const formatter = ({ amount, rate, currency, base }) => `${amount} ${base} = ${round(amount * rate)} ${currency}`;

const filterBase = (rates, base, shouldFilter) => !shouldFilter ? rates: rates.filter(([currency]) => currency !== base)

const alfredFormat = ({
  rates,
  base,
  lastUpdated,
  amount,
  shouldFilter = true
}) => JSON.stringify({
  items: filterBase(sortRates(rates), base, shouldFilter)
    .map(([currency, rate]) => {
      const flagIcon = path.join(FLAGS_PATH, `${currency}.${FLAGS_EXTENSION}`);

      return ({
        "type": "default",
        "title": formatter({ rates, base, currency, rate, amount }),
        "subtitle": `Last updated: ${formatDate(
          lastUpdated,
          'MM.DD.YYYY HH:mm:ss'
        )}`,
        "icon": {
          "type": "png",
          "path": flagIcon
        },
        "autocomplete": `${amount} ${currency}`,
        arg: round(amount * rate)
      })
    })
});

module.exports = { alfredFormat }
