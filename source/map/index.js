const transducer = require('../transducer');

const { INIT, STEP, RESULT } = transducer;
const map = f => next => transducer({
  init: () => next[INIT](),
  step: (a, c) => next[STEP](a, f(c)),
  result: a => next[RESULT](a)
});

module.exports = map;
