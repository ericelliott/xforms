const { describe } = require('riteway');
const compose = require('lodash/fp/compose');

const map = require('../map');
const transduce = require('../transduce');
const concatArray = require('../concat-array');
const take = require('../take');

describe('map', async should => {
  const { assert } = should('apply a function in transducer context');

  {
    const reducer = map(x => x)(concatArray);

    assert({
      given: '[empty arity] concatArray',
      should: 'return an empty array',
      actual: reducer(),
      expected: []
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
      given: '[completion arity] a reduced value',
      should: 'behave correctly',
      actual: transduce(xform, concatArray, [], arr),
      expected: [2, 4, 6]
    });
  }

  {
    const arr = [1, 2, 3];
    const xform = compose(
      map(x => x * 2)
    );

    assert({
      given: '[transducer arity] a simple collection',
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
});
