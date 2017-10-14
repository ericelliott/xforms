const { describe } = require('riteway');
const concatArray = require('../concat-array/index.js');
const take = require('./index.js');
const toArray = require('../to-array/index.js');

describe('take', async should => {
  const { assert } = should('only call step within limit');

  {
    const xform = take(3);

    assert({
      given: 'a limit of 3, concatArray and no further arguments',
      should: 'return an empty array',
      actual: xform(concatArray)(),
      expected: []
    });
  }

  {
    const arr = [ 1, 2, 3, 4, 5, 6 ];
    const xform = take(3);

    assert({
      given: 'a limit of 3 and foldable of length 6',
      should: 'return a foldable of length 3',
      actual: toArray(xform, arr),
      expected: [ 1, 2, 3 ]
    });
  }

  {
    const arr = [ 1, 2, 3, 4, 5, 6 ];
    const xform = take(10);

    assert({
      given: 'a limit of 10 and foldable of length 6',
      should: 'return the original foldable',
      actual: toArray(xform, arr),
      expected: arr
    });
  }

  {
    const arr = [ 1, 2, 3, 4, 5, 6 ];
    const xform = take(-10);

    assert({
      given: 'a limit of -10 and foldable of length 6',
      should: 'an empty foldable',
      actual: toArray(xform, arr),
      expected: []
    });
  }

});
