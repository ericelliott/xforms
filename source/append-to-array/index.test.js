const { describe } = require('riteway');

const append = require('../append-to-array');
const reduced = require('../reduced');

describe('append-to-array', async assert => {
  {
    assert({
      given: 'initial arity',
      should: 'return an empty array',
      actual: append(),
      expected: []
    });
  }

  {
    const arr = [ 1, 2, 3 ];

    assert({
      given: 'completion arity',
      should: 'return the completed array',
      actual: append(arr),
      expected: arr
    });
  }

  {
    const arr = [ 1, 2, 3 ];

    assert({
      given: 'completion arity: reduced(acc)',
      should: 'return the completed array',
      actual: append(reduced(arr)),
      expected: arr
    });
  }

  {
    const a = [1, 2, 3];

    assert({
      given: 'reduced(accumulator), finalValue',
      should: 'add the final value to the accumulated value',
      actual: append(reduced(a), 4),
      expected: [1, 2, 3, 4]
    });
  }

  {
    const arr = [ 1, 2, 3 ];

    assert({
      given: 'array, undefined',
      should: 'return the array with undefined at the end',
      actual: append(arr, undefined),
      expected: [ ...arr, undefined ]
    });
  }

  {
    const arr = [ 1, 2, 3 ];

    assert({
      given: 'an empty array, and a array of values',
      should: 'return an array containing the passed array',
      actual: append([], arr),
      expected: [ arr ]
    });
  }

  {
    const a = [ [1], [2], [3] ];
    const b = [4];

    assert({
      given: 'two arrays with values',
      should: 'return an array containing the passed array',
      actual: append(a, b),
      expected: [ ...a, b ]
    });
  }
});
