import toArity from '../to-arity';

// eslint-disable-next-line camelcase
export const doc_transducer = `
    transducer = ({
      step: Reducer,
      init?: Reducer,
      result?: Reducer,
      next?: Reducer
    }) => Reducer => Reducer

A **transducer** is a composable reducer which takes a reducer as an argument and returns a new reducer.

The transducer function is sugar that makes it easier to write transducers in JavaScript.

When passed init, result, and step, take transducer arities and return a transducer with those arities.

When passed step and next, return a transducer implementing:

    {
      init: () => next(),
      result: () => next(a),
      step
    }
`;

const transducer = ({
  init, result, step, next
}) => (...args) => {
  const arity = toArity(args.length);
  const [ a ] = args;

  const defaults = next ? {
    init: () => next(),
    result: () => next(a)
  } : {};

  return {
    init,
    result,
    step,
    ...defaults
  }[arity](...args);
};

export default transducer;
