const createMatrix = function(N, default_value) {
  /* 
    Simulate NxN matrix as Array of Array with optional default value
    Return value: 
      Array(N), where each element is:
        Array(N), where each element is default_value
  */

  if(arguments.length < 2) {
    default_value = null;
  }
  var row = Array(N).fill(default_value);
  var matrix = Array(N).fill(default_value);
  matrix = matrix.map(function() {
    return row.slice();
  });
  return matrix;
}

const flattenMatrix = function(matrix) {
  /* 
    Flatten matrix (2-dimensional array) to one dimensional array,
    row by row
  */
  return [].concat.apply([], matrix)
}

const getRowsIndexes = function(N) {
  /* 
    Returns sets of indexes that define a row for NxN matrix,
    assuming each index to be used with the flattened matrix
  */
  var arr_size = Math.pow(N, 2);
  var result = [];
  for(let index = 0; index < N; index++) {
    result.push([...Array(N).keys()].map((value) => index * N + value));
  }
  return result;
}

const getColsIndexes = function(N) {
  /* 
    Returns sets of indexes that define a column for NxN matrix,
    assuming each index to be used with the flattened matrix
  */
  var arr_size = Math.pow(N, 2);
  var result = [];
  for(let index = 0; index < N; index++) {
    result.push([...Array(N).keys()].map((value) => index + N * value));
  }
  return result;
}

const getDiagonalsIndexes = function(N) {
  /* 
    Returns sets of indexes that define a diagonal for NxN matrix,
    assuming each index to be used with the flattened matrix
  */
  var main_diagonal = [];
  var anti_diagonal = [];
  for(let i = 0; i < N; i++) {
    for(let j = 0; j < N; j++) {
      if(i == j) {
        main_diagonal.push(i * N + j);
      }
      if(i == (N-1) - j) {
        anti_diagonal.push(i * N + j);
      }
    }
  }
  var result = [main_diagonal, anti_diagonal];
  return result;
}

const checkArraySameValues = function(arr) {
  /* 
    Check whether each element within an array has same value (strict comparison)
    Return value: 
      {result: Boolean, [value: Mixed]}
    where:
      result: false if array is empty or at least one element is different from the rest, true otherwise
      value: the value if each element indeed has same value (Optional)
  */

  var result = {
    result: false
  }

  // Empty array
  if(!arr.length) {
    return result;
  }

  var benchmark_value = arr[0];
  for(let i = 1; i < arr.length; i++) {
    if(arr[i] !== benchmark_value) {
      // Early exit/return if different value
      return result;
    }
  }

  // Assumed same values for all if reaching this line
  result = {
    result: true,
    value: benchmark_value
  }
  return result;
}

const getArrayElements = function(arr, indexes) {
  /* 
    Get elements from specified indexes of array arr
    Return value: Array(indexes.length)
  */
  var result = [];
  result = indexes.map((index) => arr[index]);
  return result;  
}

var utils = {
  createMatrix: createMatrix,
  flattenMatrix: flattenMatrix,
  getRowsIndexes: getRowsIndexes,
  getColsIndexes: getColsIndexes,
  getDiagonalsIndexes: getDiagonalsIndexes,
  checkArraySameValues: checkArraySameValues,
  getArrayElements: getArrayElements
}

export { createMatrix, flattenMatrix, getRowsIndexes, getColsIndexes, getDiagonalsIndexes, checkArraySameValues, getArrayElements };
export default utils;