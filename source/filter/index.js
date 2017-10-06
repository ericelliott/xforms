const filter = predicate => step => (a = step(), c, ...rest) => (
  predicate(c) ?
    step(a, c, ...rest) :
    a
);

module.exports = filter;
