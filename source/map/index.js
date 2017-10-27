const map = f => step => (...args) => {
  const [a = step(), c, ...rest] = args;

  return args.length === 0 ?
    a :                      // empty arity
    args.length === 1 ?
    step(a) :                // completion arity
    step(a, f(c), ...rest)   // transduce arity
  ;
};

module.exports = map;
