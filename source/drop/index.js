const drop = (num = 0) => step => (
  acc = step(),
  value,
  index,
  ...rest
) => (index + 1) % num === 0 ?
  acc :
  step(acc, value, index, ...rest)
;

module.exports = drop;
