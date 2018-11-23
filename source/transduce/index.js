import curry from 'lodash/fp/curry';

const transduce = curry((step, initial, xform, foldable) =>
  foldable.reduce(xform(step), initial)
);

export default transduce;
module.exports = transduce;
