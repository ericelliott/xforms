const curry = require('lodash/fp/curry');

const right = curry((l, r) => r);

module.exports = right;
