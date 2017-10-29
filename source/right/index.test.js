const { describe } = require('riteway');

const right = require('../right');

describe('right', async should => {
  const { assert } = should('take 2 arguments and return the second');

  assert({
    given: 'two arguments',
    actual: right(1, 2),
    expected: 2
  });

  assert({
    given: 'two arguments, curried',
    actual: right(1)(2),
    expected: 2
  });
});
