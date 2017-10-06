const reduced = require('../reduced');

const take = limit => step => (a, c, i, ...rest) => (
  i === limit - 1 ?
    step(reduced(a), c, i, ...rest) :
    i < limit ?
    step(a, c, i, ...rest) :
    a
);

module.exports = take;
