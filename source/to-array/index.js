const transduce = require('../transduce');
const concat = require('../concat-array');

const toArray = transduce(concat, []);

module.exports = toArray;
