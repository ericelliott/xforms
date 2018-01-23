const concatArray = (...args) => {

  const [ a = [], c ] = args;

  return args.length === 0 ?
    // initial
    a :
    args.length === 1 ?

    // completion
    a.valueOf() :

    // reducer
    a.valueOf().concat([c])
  ;
};

module.exports = concatArray;
