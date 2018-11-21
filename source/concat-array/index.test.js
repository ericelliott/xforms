const { describe } = require('riteway');

const concatArray = require('../concat-array/index.js');
const reduced = require('../reduced');

describe('concatArray', async assert => {
  {
    assert({
      given: 'initial arity',
      should: 'return an empty array',
      actual: concatArray(),
      expected: []
    });
  }

  {
    const arr = [ 1, 2, 3 ];

    assert({
      given: 'completion arity',
      should: 'return the completed array',
      actual: concatArray(arr),
      expected: arr
    });
  }

  {
    const arr = [ 1, 2, 3 ];

    assert({
      given: 'completion arity: reduced(acc)',
      should: 'return the completed array',
      actual: concatArray(reduced(arr)),
      expected: arr
    });
  }

  {
    const a = [1, 2, 3];

    assert({
      given: 'reduced(accumulator), finalValue',
      should: 'add the final value to the accumulated value',
      actual: concatArray(reduced(a), 4),
      expected: [1, 2, 3, 4]
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
