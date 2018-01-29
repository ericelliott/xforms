const REDUCED = Symbol.for('transducer/reduced');
const VALUE = Symbol.for('transducer/value');

/*
{
  [Symbol.for('transducer/step')]: (a, c) => next.step(a, xform(c))
  [Symbol.for('transducer/init')]: next.init()
  [Symbol.for('transducer/result')]: a => next.result(a)
}
*/

const reduced = (
  value
) => value && value[REDUCED] ? value : ({
  [REDUCED]: true,
  [VALUE]: value,
  valueOf: () => value,
  toString: () => `Reduced(${ JSON.stringify(value) })`
});
Object.assign(reduced, {
  REDUCED,
  VALUE
});

module.exports = reduced;
