const { describe } = require('riteway');
const drop = require('./index.js');
const toArray = require('../to-array');

describe('drop', async should => {
  const { assert } = should('drop every x frame');

  {
    const xform = drop(2);
    const step = (x = []) => x;

    assert({
      given: 'No arguments -- array type',
      should: 'return empty initial state',
      actual: xform(step)(),
      expected: []
    });
  }

  {
    const length = 12;
    const arr = Array.from({ length }, (x, i) => i + 1);
    const xform = drop(2);

    const actual = toArray(xform, arr);

    assert({
      given: 'a sequence of frames and a value of 2',
      should: 'drop every 2 frames',
      actual,
      expected: [ 1, 3, 5, 7, 9, 11 ]
    });
  }

  {
    const length = 12;
    const arr = Array.from({ length }, (x, i) => i + 1);
    const xform = drop(0);

    const actual = toArray(xform, arr);

    assert({
      given: 'a sequence of frames and a value of 0',
      should: 'not drop any frame',
      actual,
      expected: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
    });
  }

  {
    const length = 12;
    const arr = Array.from({ length }, (x, i) => i + 1);
    const xform = drop(1);

    const actual = toArray(xform, arr);

    assert({
      given: 'a sequence of frames and a value of 1',
      should: 'drop all frames',
      actual,
      expected: [ ]
    });
  }

  {
    const length = 12;
    const arr = Array.from({ length }, (x, i) => i + 1);
    const xform = drop();

    const actual = toArray(xform, arr);

    assert({
      given: 'a sequence of frames and no value',
      should: 'not drop any frame',
      actual,
      expected: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
    });
  }

  {
    const length = 12;
    const arr = Array.from({ length }, (x, i) => i + 1);
    const xform = drop(-3);

    const actual = toArray(xform, arr);

    assert({
      given: 'a sequence of frames and a negative value',
      should: 'act like positive value',
      actual,
      expected: [ 1, 2, 4, 5, 7, 8, 10, 11 ]
    });
  }

  {
    const length = 12;
    const arr = Array.from({ length }, (x, i) => i + 1);
    const xform = drop(13);

    const actual = toArray(xform, arr);

    assert({
      given: 'a sequence of frames and value higher than the sequence',
      should: 'not drop any frame',
      actual,
      expected: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
    });
  }

});
