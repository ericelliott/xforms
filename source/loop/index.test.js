const { describe } = require('riteway');

const concatArray = require('../concat-array');
const compose = require('../compose');
//const toArray = require('../to-array');

const loop = require('../loop');

describe('loop', async should => {
  const { assert } = should('continuously loop values');

  {
    const xform = compose(
      loop(10)
    );

    assert({
      given: 'no arguments, short array',
      actual: xform(concatArray)(),
      expected: []
    });
  }

  /*
  {
    const arr = [1, 2, 3];
    const xform = compose(
      loop(10)
    );

    console.log(toArray(xform, arr));

    assert({
      given: 'no arguments, short array',
      actual: false,
      expected: [1, 2, 3, 1, 2, 3, 1, 2, 3, 1]
    });
  }
  */

});
