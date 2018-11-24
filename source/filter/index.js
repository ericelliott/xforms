import transducer from '../transducer';

const filter = predicate => next => transducer({
  next,
  step: (a, c, ...rest) => predicate(c) ?
    next(a, c, ...rest) : a
});

module.exports = filter;
