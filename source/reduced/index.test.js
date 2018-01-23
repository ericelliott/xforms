const { describe } = require('riteway');

const reduced = require('../reduced');

describe('reduced', async should => {
  const { assert } = should('wrap any value in reduced');

  const x = 20;

  assert({
    given: 'a Number',
    actual: reduced(x).toString(),
    expected: 'Reduced(20)'
  });

  assert({
    given: 'a reduced value',
    should: 'not wrap a reduced in a reduced',
    actual: reduced(reduced(x)).toString(),
    expected: 'Reduced(20)'
  });
});
