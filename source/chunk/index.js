const chunk = size => step => {
  let buffer = [];

  return (a, c, i, foldable) => {
    if (size < 1) return a;

    if (
      a.isReduced ||
      (i + 1 === foldable.length && buffer.length < size) ||
      buffer.length + 1 === size
    ) {
      buffer.push(c);
      const res = step(a, buffer, i, foldable);
      buffer = [];
      return res;
    }

    buffer.push(c);
    return a;
  };
};

module.exports = chunk;
