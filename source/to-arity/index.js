const toArity = length =>
  length === 0 ? 'init' :
  length === 1 ? 'result' :
  'step'
;

export default toArity;
