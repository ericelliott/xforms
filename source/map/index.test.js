const { describe } = require('riteway');
const compose = require('lodash/fp/compose');

const map = require('../map');
const append = require('../append-to-array');
const take = require('../take');
const reduced = require('../reduced');
const toArray = require('../to-array');

describe('map', async assert => {
  {
    const reducer = map(x => x)(append);

    assert({
      given: '[empty arity]',
      should: 'return the initial value',
      actual: reducer(),
      expected: []
    });
  }

  {
    const arr = [1, 2, 3];

    const reducer = map(x => x)(append);

    assert({
      given: '[completion arity]',
      should: 'return the reduced value',
      actual: reducer(arr),
      expected: arr
    });
  }

  {
    const arr = [2, 4, 6];

    const reducer = map(x => x * 2)(append);

    assert({
      given: '[transducer arity]',
      should: 'return the transformed result',
      actual: reducer(arr, 4),
      expected: [2, 4, 6, 8]
    });
  }

  {
    const arr = [2, 4, 6];
    const reducedArr = reduced(arr);

    const reducer = map(x => x * 2)(append);

    assert({
      given: 'reduced with a final value',
      should: 'return the final result',
      actual: reducer(reducedArr, 4),
      expected: [2, 4, 6, 8]
    });
  }

  {
    const arr = [1, 2, 3, 4, 5, 6];

    const xform = compose(
      take(3),
      map(x => x * 2)
    );

    assert({
      given: 'a composition with a completing transducer',
      should: 'map up to completion',
      actual: toArray(xform, arr),
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
      actual: toArray(fa, arr),
      expected: toArray(fb, arr)
    });
  }

  {
    const arr = [20];
    const idXform = map(x => x);

    assert({
      given: 'Identity law: x => x',
      should: 'be equivalent to original value',
      actual: toArray(idXform, arr),
      expected: arr
    });
  }
});
