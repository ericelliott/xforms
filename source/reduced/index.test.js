const { describe } = require('riteway');

const reduced = require('../reduced');

const { REDUCED, VALUE } = reduced;

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

  assert({
    given: 'a Number',
    should: 'implement the transducer protocol for reduced',
    actual: reduced(x)[REDUCED],
    expected: true
  });

  assert({
    given: 'a Number',
    should: 'implement the transducer protocol for value',
    actual: reduced(x)[VALUE],
    expected: x
  });
});
