const { REDUCED, VALUE } = require('../reduced');
const transducer = require('../transducer');

const concatArray = transducer({
  init: () => [],
  result: a => a,
  step: (a, c) => {
    return (a[REDUCED])
      ? a[VALUE].concat([c])
      : a.concat([c]);
  }
});

module.exports = concatArray;
