const { describe } = require('riteway');

const from = require('../from');
const map = require('../map');

describe('from = transducer => iterable => iterator', async should => {
  const { assert } = should('transduce the generator signal');

  const a = [1, 2, 3];
  const xform = map(x => x * 2);

  assert({
    given: '[empty arity]',
    should: 'return an empty generator',
    actual: [...from(xform)()],
    expected: []
  });

  assert({
    given: 'an iterable, curried',
    actual: [...from(xform)(a)],
    expected: [2, 4, 6]
  });
});
