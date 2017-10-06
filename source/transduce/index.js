const transduce = (xform, reducer, initial, foldable) => (
  foldable.reduce(xform(reducer), initial)
);

module.exports = transduce;
