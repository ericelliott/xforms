const REDUCED = '@@transducer/reduced';
const VALUE = '@@transducer/value';

const reduced = (
  value
) => value && value[REDUCED] ? value : ({
  [REDUCED]: true,
  [VALUE]: value,
  valueOf: () => value,
  toString: () => `Reduced(${ JSON.stringify(value) })`
});
Object.assign(reduced, {
  REDUCED,
  VALUE
});

module.exports = reduced;
