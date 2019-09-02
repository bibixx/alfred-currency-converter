const { parseInput } = require('./parseInput');

describe('parseInput', () => {
  it('should convert to PLN as default', () => {
    expect(parseInput('10 USD'))
      .toEqual({
        "amount": 10,
        "inputCurrency": "USD",
        "isConversion": false,
        "outputCurrency": "PLN",
      });
  });

  it('should ', () => {
    expect(parseInput('10 USD to PLN'))
      .toEqual({
        "amount": 10,
        "inputCurrency": "USD",
        "isConversion": true,
        "outputCurrency": "PLN",
      });
  });

  it('should ', () => {
    expect(parseInput('10 USD to EUR'))
      .toEqual({
        "amount": 10,
        "inputCurrency": "USD",
        "isConversion": true,
        "outputCurrency": "EUR",
      });
  });
});
