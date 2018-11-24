import transducer from '../transducer';

const map = f => next => transducer({
  next,
  step: (a, c, ...rest) =>
    next(a, f(c), ...rest)
});

export default map;
module.exports = map;
