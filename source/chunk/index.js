const reduced = require('../reduced');

const chunk = size => step => {
  let buffer = [];

  return (...args) => {
    const [ a = step(), c, i, foldable ] = args;

    return args.length === 0 ?

      // initial arity
      a :

      // completion arity
      args.length === 1 ?
      step(a) :

      // transduce arity

      // For size < 1 we can complete now.
      // There will never be anything else to do.
      size < 1 ?
      step(reduced(a)) :

      (() => {
        if (
          (a.isReduced || i + 1 === foldable.length) ||
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
  };
};

module.exports = chunk;
