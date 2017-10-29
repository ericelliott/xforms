const reduced = require('../reduced');

const take = (limit, i = 1) => step => (...args) => {
  const [a = step(), ...rest] = args;

  const val = args.length === 0 ?
    // initial arity
    a :

    // completion arity
    args.length === 1 ?
    step(a) :

    // transducer arity
    i < limit ?
    step(...args) :
    i > limit ?
    step(reduced(a)) :
    step(reduced(a), ...rest)
  ;

  i++;

  return val;
};


module.exports = take;
