const { describe } = require('riteway');
const compose = require('lodash/fp/compose');

const toArray = require('../to-array');
const take = require('../take');
const map = require('../map');
const filter = require('../filter');

describe('toArray', async assert => {

  {
    const arr = [1, 2, 3, 4, 5, 6];
    const xform = filter(x => x % 2 === 0);

    assert({
      given: 'isEven',
      should: 'select only even values',
      actual: toArray(xform, arr),
      expected: [2, 4, 6]
    });
  }

  {
    const arr = [1, 2, 3, 4, 5, 6];
    const xform = compose(
      take(3),
      map(x => x * 2)
    );

    assert({
      given: 'a reduced(stream)',
      should: 'correctly map to arrays',
      actual: toArray(xform, arr),
      expected: [2, 4, 6]
    });
  }
});
