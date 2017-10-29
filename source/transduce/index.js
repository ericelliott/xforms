const curry = require('lodash/fp/curry');

const transduce = curry((reducer, initial, xform, foldable) =>
  foldable.reduce(xform(reducer), initial)
);

module.exports = transduce;
