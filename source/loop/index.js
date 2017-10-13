const loop = limit => step => {
  let b = 0;

  return function repeat (...args) {

    let [ a = step(), c, i, foldable ] = args;

    if (args.length === 0) {
      return a;
    }

    const isLooping = a.isReduced || i >= foldable.length - 1;

    a = a.valueOf();

    if (isLooping && i < limit) {
      if (b >= foldable.length) b = 0;
      const res = step(a, c, i, foldable);
      return repeat(res, foldable[b++], ++i, foldable);
    }

    return i < limit ? step(a, c, i, foldable) : a;
  };
};

module.exports = loop;
