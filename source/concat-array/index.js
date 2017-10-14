const concatArray = (...args) => {

  const [ a = [], c ] = args;

  if (args.length < 2) {
    return a;
  }

  return a.valueOf().concat([c]);
};

module.exports = concatArray;
