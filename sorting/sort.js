/**
 * Important programming question that you have to merge to sorted array in O(1) auxialiary time.
 */

const { log } = console;

class Sorting {
  constructor() {}

  /**
   *
   * @param {array} list
   *
   * @return { sorted array}
   */
  insertion_sort(list) {
    for (let i = 1; i < list.length; i++) {
      let currentEl = list[i],
        j;
      for (j = i - 1; j >= 0 && list[j] > currentEl; j--) list[j + 1] = list[j];
      list[j + 1] = currentEl;
    }

    return list;
  }

  /**
 *   get better_insertion_sort() {
    for (let i = 1; i < this.array.length; i++) {
      let currElement = this.array[currElement],
        start = 0,
        end = i - 1;

      const position = this.binarySearch(this.array, currElement, start, end);
      // in this binary search i need to find the posistion
      // when i get the position for currElement, i perform the swap with the exact index where it should hae been.
    }
  }
 */

  /**
   *
   * @param {unsorted array} list
   */
  mergeSort(list) {
    if (list.length === 1) return list;

    let middle = Math.floor(list.length / 2);

    let left = this.mergeSort(list.slice(0, middle));

    let right = this.mergeSort(list.slice(middle, list.length));

    return this.inPlaceMarge(left, right);
  }

  inPlaceMarge(leftArray, rightArray) {
    log(leftArray, rightArray);
    for (let i = rightArray.length - 1; i >= 0; i--) {
      let j,
        last = leftArray[leftArray.length - 1];
      for (
        j = leftArray.length - 2;
        j >= 0 && leftArray[j] > rightArray[i];
        j--
      ) {
        leftArray[j + 1] = leftArray[j];
      }

      if (j !== leftArray.length - 2 || last > rightArray[i]) {
        leftArray[j + 1] = rightArray[i];
        rightArray[i] = last;
      }
    }

    return leftArray.concat(rightArray);
  }

  merge(leftArray, rightArray) {
    let i = 0,
      j = 0;
    const newArray = new Array();
    while (i < leftArray.length && j < rightArray.length) {
      if (leftArray[i] < rightArray[j]) {
        newArray.push(leftArray[i]);
        i++;
      } else {
        newArray.push(rightArray[j]);
        j++;
      }
    }

    while (i < leftArray.length) {
      newArray.push(leftArray[i]);
      i++;
    }

    while (j < rightArray.length) {
      newArray.push(rightArray[j]);
      j++;
    }

    return newArray;
  }

  get sortedList() {
    return this.insertion_sort;
  }
}

class Searching extends Sorting {
  constructor() {
    super();
  }

  binarySearch(list, target, start = 0, end = list.length - 1) {
    if (start <= end) {
      let middle = start + Math.floor(end - start / 2);

      if (list[middle] === target) return middle;

      if (target < list[middle])
        return this.binarySearch(list, target, start, middle - 1);

      if (target > list[middle])
        return this.binarySearch(list, target, middle + 1, end);
    }

    return -1;
  }
}

const list = Array.from({ length: 10 }, () => Math.floor(Math.random() * 30));

const sort_instance = new Sorting();

// log(sort_instance.mergeSort(list));

/**
 * let left = [2,3],
  right = [10];

function inPlaceMarge(leftArray, rightArray) {
  for (let i = rightArray.length - 1; i >= 0; i--) {
    let j,
      last = leftArray[leftArray.length - 1];

    for (j = leftArray.length - 2; j >= 0 && leftArray[j] > rightArray[i]; j--)
      leftArray[j + 1] = leftArray[j];

    log(j);

    if (j !== leftArray.length - 2 || last > rightArray[i]) {
      leftArray[j + 1] = rightArray[i];
      rightArray[i] = last;
    }
  }

  return leftArray.concat(rightArray);
}

log(inPlaceMarge(left, right));
 */

/**
 * const sorted = new Sorting(list).insertion_sort;

log(sorted);

const searchInstance = new Searching().binarySearch(sorted, 18);

log(searchInstance);
 */

/**
 * const sampleArray = [1, 2, 4, 5, 9];

function findMePosition(list, target) {
  let start = 0,
    end = list.length - 1;

  let middle = start + Math.floor(end - start / 2);

  while (start <= end) {
    if (target < list[middle]) end = middle - 1;
    else start = middle + 1;

    middle = start + Math.floor(end - start / 2);
  }

  return start;
}

log(findMePosition(sampleArray, 6));
 */

/** Bubblee fort */

const bubble_list = [2, 1, 3, 6, 4];

function bubble_sort(list) {
  for (let i = 0; i < list.length; i++) {
    let isSwap = false;
    for (let j = 0; j < list.length; j++) {
      if (list[j] > list[j + 1]) {
        [list[j], list[j + 1]] = [list[j + 1], list[j]];
        isSwap = true;
      }
    }
    if (!isSwap) break;
  }

  return list;
}

// log("bubble sort", bubble_sort(list));

class Heap {
  constructor() {
    this.heap = new Array();
  }

  insert(val) {
    if (!val) return;
    this.heap.push(val);
    this.bubbleUp;
  }

  // if the pushed el is greater than its parent then it will bubbleUp
  bubbleUp() {
    let currIndex = this.heap.length - 1;
    while (currIndex > 0) {
      let parentIdx = Math.floor(currIndex - 1 / 2);

      if (this.heap[parentIdx] >= this.heap[currIndex]) break;

      this.swap(parentIdx, currIndex);

      currIndex = parentIdx;
    }
  }

  swap(idx1, idx2) {
    return ([this.heap[idx1], this.heap[idx2]] = [
      this.heap[idx2],
      this.heap[idx1],
    ]);
  }

  get extractMax() {
    let first = this.heap[0],
      last = this.heap.pop();
    this.heap[0] = last;
    this.sinkDown;

    return first;
  }

  get sinkDown() {
    let currIndex = 0,
      len = this.heap.length;
    while (true) {
      let leftChildIdx = 2 * currIndex + 1,
        rightChildIdx = 2 * currIndex + 2,
        swapIdx = null;

      if (leftChildIdx < len && this.heap[leftChildIdx] > this.heap[currIndex])
        swapIdx = leftChildIdx;

      if (rightChildIdx < len) {
        if (
          (swapIdx === null &&
            this.heap[rightChildIdx] > this.heap[currIndex]) ||
          (swapIdx !== null &&
            this.heap[rightChildIdx] > this.heap[leftChildIdx])
        )
          swapIdx = rightChildIdx;
      }

      if (swapIdx === null) break;

      this.swap(currIndex, swapIdx);

      currIndex = swapIdx;
    }
  }
}

const max_heap = new Heap([2, 6, 3, 4, 5, 1]);

for (let el of list) {
  max_heap.insert(el);
}

log(list);

log(max_heap.heap);

log(max_heap.extractMax);

log(max_heap.heap);

log("************ second max***************");

log(max_heap.extractMax);

log(max_heap.heap);

class HeapSort extends Sorting {
  constructor() {
    super();
  }

  heap_sort(list) {
    let len = list.length;

    log("usorted list ", list);

    for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
      this.heapify(list, len, i);
    }

    for (let i = len - 1; i > 0; i--) {
      // swapping the first first element with the last to have a sorting in increasing order
      this.swap(list, 0, i);
      // heapifying now on the reduced heap
      this.heapify(list, i, 0);
    }

    return list;
  }

  heapify(list, len, i) {
    let largest = i,
      leftIdx = 2 * i + 1,
      rightIdx = 2 * 1 + 2;

    if (leftIdx < len && list[leftIdx] > list[largest]) largest = leftIdx;

    if (rightIdx < len && list[rightIdx] > list[largest]) largest = rightIdx;

    if (largest !== i) {
      this.swap(list, i, largest);
      this.heapify(list, len, largest);
    }
  }

  swap(list, idx1, idx2) {
    return ([list[idx1], list[idx2]] = [list[idx2], list[idx1]]);
  }
}

const sorting_instance = new HeapSort();

log(sorting_instance.heap_sort([4, 10, 3, 5, 1]));
