const { describe } = require('riteway');
const concatArray = require('../concat-array/index.js');

describe('concatArray', async should => {
  const { assert } = should('concat arrays and values');

  {
    assert({
      given: 'no arguments',
      should: 'an empty array',
      actual: concatArray(),
      expected: []
    });
  }

  {
    const arr = [ 1, 2, 3 ];

    assert({
      given: 'an array',
      should: 'the original array',
      actual: concatArray(arr),
      expected: arr
    });
  }


  {
    const arr = [ 1, 2, 3 ];

    assert({
      given: 'an array',
      should: 'the original array plus an additional value of undefined',
      actual: concatArray(arr, undefined),
      expected: [ ...arr, undefined ]
    });
  }

  {
    assert({
      given: 'undefined and undefined',
      should: 'an array containing undefined',
      actual: concatArray(undefined, undefined),
      expected: [ undefined ]
    });
  }

  {
    const arr = [ 1, 2, 3 ];

    assert({
      given: 'undefined and an array',
      should: 'an array containing the passed array',
      actual: concatArray(undefined, arr),
      expected: [ arr ]
    });
  }

});
