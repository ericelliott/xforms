const right = require('../right');

const from = f => function* generatorFrom (iterable, initial, step = f(right)) {

  if (iterable && iterable[Symbol.iterator]) {
    for (const c of iterable) {
      yield step(initial, c);
    };
  }

};

module.exports = from;
