const loop = limit => step => {
  let buffer = [];
  let b = 0;

  return function repeat (...args) {

    const [ a = step(), c, i, foldable ] = args;

    if (args.length === 0) {
      return a;
    }

    const isLooping = a.isReduced || (i >= foldable.length - 1);
    a = a.valueOf();

    if (isLooping && i < limit) {
      if (i === foldable.length - 1) {
        buffer.push(c);
        const res = step(a, c, i, a);
        return repeat(res, buffer[b++], i++, a);
      }

      if (b >= buffer.length) b = 0;
      const res = step(a, c, i, a);
      return repeat(res, buffer[b++], i++, a);
    }

    buffer.push(c);

    return step(a, c, i, foldable);
  };
};

module.exports = loop;
