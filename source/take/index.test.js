const { describe } = require('riteway');

const concatArray = require('../concat-array/index.js');
const take = require('./index.js');
const toArray = require('../to-array/index.js');
const reduced = require('../reduced');

describe('take', async assert => {
  {
    const reducer = take(1)(concatArray);

    assert({
      given: 'empty arity',
      should: 'return the initial value',
      actual: reducer(),
      expected: []
    });
  }

  {
    const a = [1, 2, 3];
    const reducer = take(1)(concatArray);

    assert({
      given: 'completion arity',
      should: 'return the accumulated value',
      actual: reducer(a),
      expected: a
    });
  }

  {
    const a = [1, 2, 3];

    // This step function is a spy that keeps track
    // of its results in the closure scope
    const step = (...args) => () => args;

    const reducer = take(3)(step);

    // This triggers the call to the spy
    const wasCalledWith = reducer(reduced(a))();

    assert({
      given: 'completion arity: a reduced(accumulator)',
      should: 'call step with the reduced(accumulator)',

      // Now we can see what the spy saw
      actual: wasCalledWith[0].toString(),
      expected: reduced(a).toString()
    });

    assert({
      given: 'completion arity: a reduced(accumulator)',
      should: 'call step with the completion arity',
      actual: wasCalledWith.length,
      expected: 1
    });
  }

  {
    const a = [1, 2];

    const step = (...args) => () => args;
    const reducer = take(2, 3)(step);
    const wasCalledWith = reducer(a, 3)();

    assert({
      given: 'an accumulator where i > limit',
      should: 'call step with reduced(accumulator)',
      actual: wasCalledWith[0].toString(),
      expected: reduced(a).toString()
    });

    assert({
      given: 'an accumulator where i > limit',
      should: 'call step with the completion arity',
      actual: wasCalledWith.length,
      expected: 1
    });
  }

  {
    const a = [1, 2];

    const step = (...args) => () => args;
    const reducer = take(2, 2)(step);
    const wasCalledWith = reducer(a, 3)();

    assert({
      given: 'an accumulator where i === limit',
      should: 'call step with reduced(accumulator)',
      actual: wasCalledWith[0].toString(),
      expected: reduced(a).toString()
    });

    assert({
      given: 'an accumulator where i === limit',
      should: 'pass final value into step',
      actual: wasCalledWith.length,
      expected: 2
    });
  }

  {
    const a = [1, 2];
    const reducer = take(3, 2)(concatArray);

    assert({
      given: 'an accumulator where i < limit',
      should: 'add the new value to the accumulator',
      actual: reducer(a, 3),
      expected: [1, 2, 3]
    });
  }

  {
    const a = [1, 2, 3];
    const reducer = take(10)(concatArray);
    const reducedAcc = reducer(reduced(a), 4);

    assert({
      given: 'reduced(accumulator), finalValue',
      should: 'add the final value to the accumulated value',
      actual: reducedAcc,
      expected: [1, 2, 3, 4]
    });
  }

  {
    const arr = [1, 2, 3, 4, 5, 6];
    const xform = take(3);

    assert({
      given: 'a limit of 3 and foldable of length 6',
      should: 'return a foldable of length 3',
      actual: toArray(xform, arr),
      expected: [1, 2, 3]
    });
  }

  {
    const arr = [1, 2, 3, 4, 5, 6];
    const xform = take(10);

    assert({
      given: 'a limit of 10 and foldable of length 6',
      should: 'return the original foldable',
      actual: toArray(xform, arr),
      expected: arr
    });
  }

  {
    const arr = [1, 2, 3, 4, 5, 6];
    const xform = take(-10);

    assert({
      given: 'a limit of -10 and foldable of length 6',
      should: 'return an empty foldable',
      actual: toArray(xform, arr),
      expected: []
    });
  }
});
