const INIT = '@@transducer/init';
const STEP = '@@transducer/step';
const RESULT = '@@transducer/result';

const missing = (label) => {
  return new Error(`Missing ${ label }`);
};

const transducer = ({
  next,
  init = next ? next[INIT] : () => {
    throw missing('init');
  },
  step = next ? (...args) => next[STEP](...args) : () => {
    throw missing('step');
  },
  result = next ? a => next[RESULT](a) : () => {
    throw missing('result');
  }
}) => ({
  [INIT]: init,
  [STEP]: step,
  [RESULT]: result
});
transducer.INIT = INIT;
transducer.STEP = STEP;
transducer.RESULT = RESULT;

module.exports = transducer;
