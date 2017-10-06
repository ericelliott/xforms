const reduced = v => ({
  get isReduced () {
    return true;
  },
  valueOf: () => v,
  toString: () => JSON.stringify(v)
});

module.exports = reduced;
