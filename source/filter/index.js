const filter = predicate => step => (...args) => {
  const [a = step(), c, ...rest] = args;

  return args.length === 0 ?
    a :                       // empty arity
    args.length === 1 ?
    step(a) :                 // completion arity
    predicate(c) ?            // transduce arity
    step(a, c, ...rest) :
    a
  ;
};

module.exports = filter;
