const reduced = require('../reduced');
const transducer = require('../transducer');

const { REDUCED } = reduced;

const chunk = size => step => {
  let buffer = [];

  return transducer({
    init: () => step(),
    result: a => step(a),
    step: (...args) => {
      const [ a = step(), c, i, foldable ] = args;

      // For size < 1 we can complete now.
      // There will never be anything else to do.
      return size < 1 ?
        step(reduced(a)) :

        (() => {
          if (
            (a[REDUCED] || i + 1 === foldable.length) ||
            buffer.length + 1 === size
          ) {
            buffer.push(c);
            const res = step(a, buffer, i, foldable);
            buffer = [];
            return res;
          }

          buffer.push(c);
          return a;
        })();
    }
  });
};

module.exports = chunk;
