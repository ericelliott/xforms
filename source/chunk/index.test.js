const { describe } = require('riteway');
const compose = require('lodash/fp/compose');

const concatArray = require('../concat-array');
const toArray = require('../to-array');
const take = require('../take');
const chunk = require('../chunk');

describe('chunk', async should => {
  const { assert } = should('chunk sequences into smaller groups');

  {
    assert({
      given: 'no arguments',
      should: 'return an initial value',
      actual: chunk(2)(concatArray)(),
      expected: [ [] ]
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
      should: 'include a zero-length chunk',
      actual,
      expected: [ [] ]
    });
  }

  {
    const length = 30;
    const size = 0;
    const arr = Array.from({length}, (x, i) => i + 1);

    const actual = toArray(chunk(size), arr);

    assert({
      given: 'chunk size = 0',
      should: 'include a zero-length chunk',
      actual,
      expected: [ [] ]
    });
  }

  {
    const input = [1, 2, 3, 4, 5, 6, 7, 8];

    assert({
      given: 'chunk size = 0',
      should: 'obey empty law with signal passing',
      actual: toArray(compose(take(7), chunk(0)), input),
      expected: [ [] ]
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
      expected: Math.ceil(arr.length / size)
    });
  }

  {
    const length = 12;
    const filter = 7;
    const size = 3;
    const arr = Array.from({ length }, (x, i) => i + 1);

    const xform = compose(
      take(filter),
      chunk(size)
    );

    const actual = toArray(xform, arr).length;

    assert({
      given: 'a filtered group not evenly divisible by the chunk size',
      should: 'chunk sequence into n pieces where n = Math.ceil(filtered size/chunk size)',
      actual,
      expected: Math.ceil((filter / size))
    });
  }

  {
    const length = 12;
    const size = 3;
    const filter = 9;
    const arr = Array.from({length}, (x, i) => i + 1);
    const xform = compose(
      take(filter),
      chunk(size)
    );

    const actual = toArray(xform, arr).length;

    assert({
      given: 'a filtered group is evenly divisible by the chunk size',
      should: 'chunk sequence into n pieces where n = filter size/chunk size',
      actual,
      expected: filter / size
    });
  }

});
