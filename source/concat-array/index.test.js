const { describe } = require('riteway');
const concatArray = require('../concat-array/index.js');

describe('concatArray', async should => {
  const { assert } = should('concat arrays and values');

  {
    assert({
      given: '[initial arity]',
      should: 'return an empty array',
      actual: concatArray(),
      expected: []
    });
  }

  {
    const arr = [ 1, 2, 3 ];

    assert({
      given: '[completion arity]',
      should: 'return the completed array',
      actual: concatArray(arr),
      expected: arr
    });
  }


  {
    const arr = [ 1, 2, 3 ];

    assert({
      given: 'array, undefined',
      should: 'return the array with undefined at the end',
      actual: concatArray(arr, undefined),
      expected: [ ...arr, undefined ]
    });
  }

  {
    const arr = [ 1, 2, 3 ];

    assert({
      given: 'an empty array, and a array of values',
      should: 'return an array containing the passed array',
      actual: concatArray([], arr),
      expected: [ arr ]
    });
  }

  {
    const a = [ [1], [2], [3] ];
    const b = [4];

    assert({
      given: 'two arrays with values',
      should: 'return an array containing the passed array',
      actual: concatArray(a, b),
      expected: [ ...a, b ]
    });
  }
});
