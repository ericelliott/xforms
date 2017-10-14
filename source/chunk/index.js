const chunk = size => step => {
  let buffer = [];

  const maybePush = (buffer, c) => {
    if (size >= 1) buffer.push(c);
  };

  return (...args) => {

    const [ a = step(undefined, buffer), c, i, foldable ] = args;

    if (args.length === 0) {
      return a;
    }

    if (
      (a.isReduced || i + 1 === foldable.length) ||
      buffer.length + 1 === size
    ) {
      maybePush(buffer, c);
      const res = step(a, buffer, i, foldable);
      buffer = [];
      return res;
    }

    maybePush(buffer, c);
    return a;
  };
};

module.exports = chunk;
