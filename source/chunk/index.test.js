const { describe } = require('riteway');
const compose = require('lodash/fp/compose');

const concatArray = require('../concat-array');
const toArray = require('../to-array');
const take = require('../take');
const chunk = require('../chunk');
const reduced = require('../reduced');

describe('chunk', async assert => {

  {
    const reducer = chunk(2)(concatArray);

    assert({
      given: '[initial arity] no arguments',
      should: 'return an initial value',
      actual: reducer(),
      expected: []
    });
  }

  {
    const length = 3;
    const size = 6;
    const arr = Array.from({length}, (x, i) => i + 1);

    const actual = toArray(chunk(size), arr);

    assert({
      given: 'a group smaller than the chunk length',
      should: 'include the whole group in the first chunk',
      actual,
      expected: [arr]
    });
  }


  {
    const length = 3;
    const size = -1;
    const arr = Array.from({length}, (x, i) => i + 1);

    const actual = toArray(chunk(size), arr);

    assert({
      given: 'negative size',
      should: 'result in an empty collection',
      actual,
      expected: []
    });
  }

  {
    const a = [];
    const x = 20;
    const step = (...args) => () => args;
    const reducer = chunk(0)(step);
    const wasCalledWith = reducer(reduced(a), x)();

    assert({
      given: 'chunk size = 0, empty accumulator, new input',
      should: 'call completion step with reduced([])',
      actual: wasCalledWith[0].toString(),
      expected: reduced(a).toString()
    });

    assert({
      given: 'chunk size = 0, empty accumulator, new input',
      should: 'not pass an empty chunk in completion step',
      actual: wasCalledWith.length,
      expected: 1
    });
  }

  {
    const length = 30;
    const size = 0;
    const arr = Array.from({length}, (x, i) => i + 1);

    const actual = toArray(chunk(size), arr);

    assert({
      given: 'chunk size = 0',
      should: 'return an empty collection',
      actual,
      expected: []
    });
  }

  {
    const length = 7;
    const size = 5;
    const arr = Array.from({length}, (x, i) => i + 1);

    const actual = toArray(chunk(size), arr);

    assert({
      given: 'length = 7, chunk size = 5',
      actual,
      expected: [[1, 2, 3, 4, 5], [6, 7]]
    });
  }

  {
    const length = 3;
    const size = 1;
    const arr = Array.from({length}, (x, i) => i + 1);

    const actual = toArray(chunk(size), arr);

    assert({
      given: 'chunk size = 1',
      actual,
      expected: [[1], [2], [3]]
    });
  }

  {
    const length = 100000;
    const size = 1000;
    const arr = Array.from({length}, (x, i) => i + 1);

    const actual = toArray(chunk(size), arr).length;

    assert({
      given: 'large groups, large chunks',
      should: 'chunk sequence into n pieces where n = length/chunk size',
      actual,
      expected: arr.length / size
    });
  }

  {
    const length = 6;
    const size = 3;
    const arr = Array.from({length}, (x, i) => i + 1);

    const actual = toArray(chunk(size), arr).length;

    assert({
      given: 'a group evenly divisible by the chunk size',
      should: 'chunk sequence into n pieces where n = length/chunk size',
      actual,
      expected: arr.length / size
    });
  }

  {
    const length = 7;
    const size = 3;
    const arr = Array.from({length}, (x, i) => i + 1);

    assert({
      given: 'a group not evenly divisible by the chunk size',
      should: 'chunk sequence into n pieces where n = Math.ceil(length/chunk size)',
      actual: toArray(chunk(size), arr),
      expected: [[1, 2, 3], [4, 5, 6], [7]]
    });
  }

  {
    const length = 12;
    const filtered = 7;
    const size = 3;
    const arr = Array.from({ length }, (x, i) => i + 1);

    const xform = compose(
      take(filtered),
      chunk(size)
    );

    const actual = toArray(xform, arr).valueOf();

    assert({
      given: 'a filtered group not evenly divisible by the chunk size',
      should: 'chunk sequence into n pieces where n = Math.ceil(filtered size/chunk size)',
      actual,
      expected: [[1, 2, 3], [4, 5, 6], [7]]
    });
  }

  {
    const length = 12;
    const size = 3;
    const filter = 9;
    const arr = Array.from({length}, (x, i) => i + 1);
    const expected = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    const xform = compose(
      take(filter),
      chunk(size)
    );

    const actual = toArray(xform, arr);

    assert({
      given: 'a filtered group is evenly divisible by the chunk size',
      should: 'chunk sequence into n pieces where n = filter size/chunk size',
      actual,
      expected
    });
  }
});
