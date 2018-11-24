const transduce = require('../transduce');
const append = require('../append-to-array');

const toArray = transduce(append, []);

module.exports = toArray;
