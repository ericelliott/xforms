import transducer from '../transducer';

const appendToArray = transducer({
  init: () => [],
  result: a => a.valueOf(),
  step: (a, c) => a.valueOf().concat([c])
});

module.exports = appendToArray;
