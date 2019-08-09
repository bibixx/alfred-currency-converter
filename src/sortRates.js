// const debug = require('debug')('debug');
const { RATES_ORDER } = require('./constants');

const sortRates = rates => {
  const [favourites, others] = Object.entries(rates).reduce((acc, curr) => {
    if (RATES_ORDER.indexOf(curr[0]) >= 0) {
      return [
        [
          ...acc[0],
          curr
        ],
        acc[1],
      ];
    }

    return [
      acc[0],
      [
        ...acc[1],
        curr
      ],
    ];
  }, [[], []]);

  const all = [].concat(
    [...favourites].sort((a, b) => RATES_ORDER.indexOf(a[0]) - RATES_ORDER.indexOf(b[0])),
    [...others].sort((a, b) => a[0].localeCompare(b[0]))
  )

  return all;
}

module.exports = { sortRates }
