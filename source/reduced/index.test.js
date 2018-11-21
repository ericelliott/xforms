const { describe } = require('riteway');

const reduced = require('../reduced');

describe('reduced', async assert => {
  const x = 20;

  assert({
    given: 'a Number',
    should: 'wrap any value in reduced',
    actual: reduced(x).toString(),
    expected: 'Reduced(20)'
  });

  assert({
    given: 'a value',
    should: 'return the same value from .valueOf()',
    actual: reduced(x).valueOf(),
    expected: x
  });

  assert({
    given: 'a reduced value',
    should: 'not wrap a reduced in a reduced',
    actual: reduced(reduced(x)).toString(),
    expected: 'Reduced(20)'
  });
});
