const { describe } = require('riteway');
const compose = require('lodash/fp/compose');

const map = require('../map');
const transduce = require('../transduce');
const concatArray = require('../concat-array');
const take = require('../take');

describe('map', async should => {
  const { assert } = should('apply a function in transducer context');

  {
    const initialState = 'Anonymous';
    const getName = ({ name = initialState } = {}) => name;
    const xform = map(getName);
    const step = (a = initialState) => a;

    assert({
      given: 'returned reducer with no arguments Object -> String',
      should: 'return empty initial state',
      actual: xform(step)(),
      expected: initialState
    });
  }

  {
    const initialState = 0;
    const xform = map((a, c) => a + c);
    const step = (a = initialState) => a;

    assert({
      given: 'returned reducer with no arguments: Number -> Number',
      should: 'return empty initial state',
      actual: xform(step)(),
      expected: initialState
    });
  }


  {
    const arr = [1, 2, 3];
    const xform = compose(
      map(x => x * 2)
    );

    assert({
      given: 'A simple collection',
      should: 'return correctly mapped elements',
      actual: transduce(xform, concatArray, [], arr),
      expected: [2, 4, 6]
    });
  }

  const g = n => n + 1;
  const f = n => n * 2;

  {
    const arr = [20];
    const fa = compose(map(g), map(f));
    const fb = map(compose(f, g));

    assert({
      given: 'Composition law: compose(map(g), map(f))',
      should: 'be equivalent to map(compose(f, g))',
      actual: transduce(fa, concatArray, [], arr),
      expected: transduce(fb, concatArray, [], arr)
    });
  }

  {
    const arr = [20];
    const idXform = map(x => x);

    assert({
      given: 'Identity law: x => x',
      should: 'be equivalent to original value',
      actual: transduce(idXform, concatArray, [], arr),
      expected: arr
    });
  }

  {
    const arr = [1, 2, 3, 4, 5, 6];
    const length = 3;
    const xform = compose(
      take(length),
      map(x => x * 2)
    );

    assert({
      given: 'Filtered collection',
      should: 'behave correctly',
      actual: transduce(xform, concatArray, [], arr),
      expected: [2, 4, 6]
    });
  }
});
