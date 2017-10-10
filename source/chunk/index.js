const chunk = size => step => {
  let buffer = [];

  const maybePush = (a, buffer, c) => {
    if (size >= 1) buffer.push(c);
  };

  return (a, c, i, foldable) => {

    if (
      (a.isReduced || i + 1 === foldable.length) ||
      buffer.length + 1 === size
    ) {
      maybePush(a, buffer, c);
      const res = step(a, buffer, i, foldable);
      buffer = [];
      return res;
    }

    maybePush(a, buffer, c);
    return a;
  };
};

module.exports = chunk;
