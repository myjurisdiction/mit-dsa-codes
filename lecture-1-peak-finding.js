/**
 * This code base is just the codeing part for the concepts taught in mit-dsa lecture 1
 *
 * @author Abhishek Raj
 */

const { log } = console;

class PeakFinding {
  constructor() {}

  /**
   *
   * @param {array} list
   * @return { index, value} wrapped in an object
   *
   * worst case O(n);
   */
  naive_approach(list) {
    for (let i = 0; i < list.length; i++) {
      if (
        (i === 0 || list[i - 1] <= list[i]) &&
        (i === list.length - 1 || list[i + 1] <= list[i])
      )
        return { index: i, val: list[i] };
    }

    return -1;
  }

  /**
   *
   * @param {array} list
   * @param {int} left
   * @param {int} right
   *
   * @return { index, value} wrapped in an object
   *
   * worst case O(logn);
   */
  binary_search_approach(list, left = 0, right = list.length - 1) {
    if (left <= right) {
      const middle = Math.floor(right + left / 2);

      if (
        (middle === 0 || list[middle - 1] <= list[middle]) &&
        (middle === list.length - 1 || list[middle + 1] <= list[middle])
      )
        return { index: middle, value: list[middle] };

      if (middle > 0 && list[middle] < list[middle - 1])
        return this.binary_search_approach(list, left, middle - 1);
      else return this.binary_search_approach(list, middle + 1, right);
    }

    return -1;
  }

  two_dimension_peak(matrix) {
    // let's go through this one
    return matrix;
  }
}

const sample1 = Array.from({ length: 10 }, () =>
  Math.floor(Math.random() * 30)
);
const peak_finding = new PeakFinding();

log(sample1);
log(peak_finding.naive_approach(sample1));
log(peak_finding.binary_search_approach(sample1));

function twoDMatrix(row, column, value) {
  const matrix = new Array(row);
  for (let i = 0; i < row; i++) {
    matrix[i] = new Array(column);
    for (let j = 0; j < column; j++) {
      matrix[i][j] = ++value;
    }
  }

  return matrix;
}

function multiply_matrix(m1, m2) {
  const result = new Array();
  for (let i = 0; i < m1.length; i++) {
    result[i] = new Array();
    for (let j = 0; j < m2[0].length; j++) {
      result[i][j] = 0;
      for (let k = 0; k < m1[0].length; k++) {
        result[i][j] += m1[i][k] * m2[k][j];
      }
    }
  }

  return result;
}

log(twoDMatrix(2, 3, 0), twoDMatrix(3, 2, 6));
log(multiply_matrix(twoDMatrix(2, 3, 0), twoDMatrix(3, 2, 6)));

const sample_1 = [
  [58, 64],
  [139, 154],
];

function find_neighbours(row, column, matrix) {
  if (!matrix.length) return null;

  const neighbours = [];

  const row_vector = [-1, 1, 0, 0],
    // top, bottom, right, left
    column_vector = [0, 0, 1, -1];

  for (let i = 0; i < 4; i++) {
    let _row = row + row_vector[i];
    let _column = column + column_vector[i];

    if (_row < 0 || _column < 0) continue;
    if (_row === matrix.length || _column === matrix.length) continue;

    neighbours.push(matrix[_row][_column]);
  }

  return neighbours;
}

log(find_neighbours(0, 1, sample_1));

