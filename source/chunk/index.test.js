const { describe } = require('riteway');
const compose = require('lodash/fp/compose');

const toArray = require('../to-array');
const take = require('../take');
const chunk = require('../chunk');

describe('chunk', async should => {
  const { assert } = should('chunk sequences into smaller groups');

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
      should: 'include zero chunks',
      actual,
      expected: []
    });
  }

  {
    const length = 3;
    const size = 0;
    const arr = Array.from({length}, (x, i) => i + 1);

    const actual = toArray(chunk(size), arr);

    assert({
      given: 'chunk size = 0',
      should: 'include zero chunks',
      actual,
      expected: []
    });
  }

  {
    const input = [1, 2, 3, 4, 5, 6, 7, 8];

    assert({
      given: 'chunk size 0',
      should: 'obey empty law with signal passing',
      actual: toArray(compose(take(7), chunk(0)), input),
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

    const actual = toArray(chunk(size), arr).length;

    assert({
      given: 'a group not evenly divisible by the chunk size',
      should: 'chunk sequence into n pieces where n = Math.ceil(length/chunk size)',
      actual,
      expected: Math.ceil((arr.length / size))
    });
  }

  {
    const arrayLength = 12;
    const length = 7;
    const size = 3;
    const arr = Array.from({arrayLength}, (x, i) => i + 1);

    const xform = compose(
      take(length),
      chunk(size)
    );

    const actual = toArray(xform, arr).length;

    assert({
      given: 'a filtered group not evenly divisible by the chunk size',
      should: 'chunk sequence into n pieces where n = Math.ceil(length/chunk size)',
      actual,
      expected: Math.ceil((arr.length / size))
    });
  }

  {
    const arrayLength = 12;
    const length = 9;
    const size = 3;
    const arr = Array.from({arrayLength}, (x, i) => i + 1);
    const xform = compose(
      take(length),
      chunk(size)
    );

    const actual = toArray(xform, arr).length;

    assert({
      given: 'a filtered group is evenly divisible by the chunk size',
      should: 'chunk sequence into n pieces where n = length/chunk size',
      actual,
      expected: arr.length / size
    });
  }
});
