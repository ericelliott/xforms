const transduce = require('../transduce');
const concat = require('../concat-array');

const toArray = (xform, arr) => transduce(
  xform, concat, [], arr
);

module.exports = toArray;
