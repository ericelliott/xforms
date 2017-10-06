const map = f => step => (a = step(), c, ...rest) => (
  step(a, f(c), ...rest)
);

module.exports = map;
