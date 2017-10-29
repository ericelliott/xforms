const reduced = (
  value,
  v = value.isReduced ? value.valueOf() : value
) => ({
  get isReduced () {
    return true;
  },
  valueOf: () => v,
  toString: () => `Reduced(${ JSON.stringify(v) })`
});

module.exports = reduced;
