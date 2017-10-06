const { describe } = require('riteway');
const compose = require('lodash/fp/compose');

const filter = require('../filter');
const transduce = require('../transduce');
const concatArray = require('../concat-array');

describe('filter', async should => {
  const { assert } = should('should select values matching predicate');

  {
    const initialState = false;
    const is2 = (x = 0) => x === 2;
    const xform = compose(
      v => {
        return v;
      },
      filter(is2)
    );
    const step = (x = initialState) => x;

    assert({
      given: 'No arguments -- number type',
      should: 'return empty initial state',
      actual: xform(step)(),
      expected: false
    });
  }

  {
    const arr = [1, 2, 3, 4, 5, 6];
    const xform = filter(x => x % 2 === 0);

    assert({
      given: 'isEven',
      should: 'select only even values',
      actual: transduce(xform, concatArray, [], arr),
      expected: [2, 4, 6]
    });
  }

  {
    const arr = [1, 2, 3, 4, 5, 6];
    const xform = filter(x => true); //eslint-disable-line

    assert({
      given: 'x => true',
      should: 'select all values',
      actual: transduce(xform, concatArray, [], arr),
      expected: arr
    });
  }

  {
    const arr = [1, 2, 3, 4, 5, 6];
    const xform = filter(x => false); //eslint-disable-line

    assert({
      given: 'x => false',
      should: 'select zero values',
      actual: transduce(xform, concatArray, [], arr),
      expected: []
    });
  }
});
