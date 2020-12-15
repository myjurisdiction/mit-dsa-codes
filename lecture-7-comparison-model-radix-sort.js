const { log } = console;

/**
 * TIME COMPLEXITY ANALYSIS FOR RADIX SORT
 *  best, average, worst -> O(nk), where n is the size of the array and k is the word size
 *
 * SPACE COMPLEXITY FOR RADIX SORT
 *  O(n + k)
 */

function getDigit(n, i) {
  return Math.floor(Math.abs(n) / Math.pow(10, i)) % 10;
}

function digitCount(n) {
  if (n === 0) return 1;

  return Math.floor(Math.log10(Math.abs(n))) + 1;
}

function mostDigit(list) {
  if (list.length === 0) return null;
  let maxNum = 0;

  list.forEach((el) => {
    maxNum = Math.max(maxNum, digitCount(el));
  });

  return maxNum;
}

function randomArrayIntegers() {
  return Array.from({ length: 5 }, () => Math.floor(Math.random() * 100000));
}

function radixSort(list) {
  // step1 -> Get the idea of how many times we have to iterate over the entire array.
  const maxCount = mostDigit(list);

  // step2 -> Iterate the defined number of times over the entire
  for (let k = 0; k < maxCount; k++) {
    // step3 : design the container of buckets
    const buckets = Array.from({ length: 10 }, () => []);

    // step4 : iterate through the entire array
    for (let i = 0; i < list.length; i++) {
      // step4 : get the digit in list[i] at position k
      let digit = getDigit(list[i], k);
      // step5 : get to the position buckets[digit] and push list[i];
      buckets[digit].push(list[i]);
    }
    // step6 : merege the bucket with the list
    list = [].concat(...buckets);
  }

  // step7: return the sorted list
  return list;
}

/** EXAMPLE EXECUTIONS */

const sampleArray = [
  3221,
  1,
  10,
  9680,
  577,
  9420,
  7,
  5622,
  4793,
  2030,
  31389999999,
  82,
  2599,
  743,
  4127,
];

const sampleArray2 = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

log(radixSort(sampleArray2));
