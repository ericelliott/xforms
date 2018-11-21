const { describe } = require('riteway');

const filter = require('../filter');
const toArray = require('../to-array');
const concatArray = require('../concat-array');

describe('filter', async assert => {
  {
    const reducer = filter(() => true)(concatArray);

    assert({
      given: 'empty arity',
      should: 'return the empty value',
      actual: reducer(),
      expected: []
    });
  }

  {
    const a = [1, 2, 3];
    const reducer = filter(() => true)(concatArray);

    assert({
      given: 'completion arity',
      should: 'return the accumulator',
      actual: reducer(a),
      expected: a
    });
  }

  {
    const a = [2, 4, 6];
    const even = 8;
    const odd = 7;
    const reducer = filter(x => x % 2 === 0)(concatArray);

    assert({
      given: 'transducer arity: isEven with even value',
      should: 'concat the even value',
      actual: reducer(a, even),
      expected: [2, 4, 6, 8]
    });

    assert({
      given: 'transducer arity: isEven with odd value',
      should: 'reject the odd value',
      actual: reducer(a, odd),
      expected: [2, 4, 6]
    });
  }

  {
    const arr = [1, 2, 3, 4, 5];
    const xform = filter(x => x >= 3);

    assert({
      given: 'predicate',
      should: 'select only values matching predicate',
      actual: toArray(xform, arr),
      expected: [3, 4, 5]
    });
  }

  {
    const arr = [1, 2, 3, 4, 5, 6];
    const xform = filter(x => true); //eslint-disable-line

    assert({
      given: 'x => true',
      should: 'select all values',
      actual: toArray(xform, arr),
      expected: arr
    });
  }

  {
    const arr = [1, 2, 3, 4, 5, 6];
    const xform = filter(x => false); //eslint-disable-line

    assert({
      given: 'x => false',
      should: 'select zero values',
      actual: toArray(xform, arr),
      expected: []
    });
  }
});
