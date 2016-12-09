const createMatrix = function(n, default_value) {
  if(arguments.length < 2) {
    default_value = null;
  }
  var row = Array(n).fill(default_value);
  var matrix = Array(n).fill(default_value);
  matrix = matrix.map(function() {
    return row.slice();
  });
  return matrix;
}

var utils = {
  createMatrix: createMatrix
}

export { createMatrix };
export default utils;