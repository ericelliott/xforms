const { describe } = require('riteway');

const append = require('../append-to-array');
const compose = require('../compose');
const toArray = require('../to-array');

const loop = require('../loop');

describe('loop', async assert => {

  {
    const xform = compose(
      loop(10)
    );

    assert({
      given: 'append and no arguments',
      should: 'return an empty array',
      actual: xform(append)(),
      expected: []
    });
  }

  {
    const arr = [1, 2, 3];
    const xform = compose(
      loop(10)
    );

    assert({
      given: 'no arguments, short array',
      should: 'continously loop values',
      actual: toArray(xform, arr),
      expected: [1, 2, 3, 1, 2, 3, 1, 2, 3, 1]
    });
  }

});
