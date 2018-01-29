const transducer = require('../transducer');

const concatArray = transducer({
  init: () => [],
  result: a => a,
  step: (a, c) => a.concat([c])
});

module.exports = concatArray;
