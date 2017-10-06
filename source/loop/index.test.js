const { describe } = require('riteway');

const compose = require('../compose');
const toArray = require('../to-array');

const loop = require('../loop');

describe('loop', async should => {
  const { assert } = should('continuously loop values');

  const arr = [1, 2, 3];
  const xform = compose(
    loop(10)
  );

  assert({
    given: 'no arguments, short array',
    actual: toArray(xform, arr),
    expected: [1, 2, 3, 1, 2, 3, 1, 2, 3, 1]
  });
});
