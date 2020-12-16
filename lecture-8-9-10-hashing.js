const { log } = console;

/**
 *
 * @param {a Large string} T
 * @param {a small string} s
 *
 * This is a naive apprach or brute force method for string matching problem.
 *
 * Time complexity for this algorithm is O(m * n);
 *
 * where m  = T.length, n = s.length
 */

function naive_string_matching(T, s) {
  let match_info = {
    count: 0,
    index: null,
  };
  for (let i = 0; i < T.length; i++) {
    let currentIndex = i;
    for (let j = 0; j < s.length; j++) {
      if (j === s.length - 1) {
        match_info.count++;
        match_info.index = i;
      }
      if (T[currentIndex] === s[j]) currentIndex++;
      else break;
    }
  }

  return match_info;
}

// log(
//   naive_string_matching("my name is name name name name abhisehk raj", "name")
// );

/**
 * function hash(str) {
  str = str.toLowerCase();
  let p = 31,
    m = Math.pow(10, 9) + 9,
    hash_value = 0,
    p_pow = 1;

  
  for (let s of str) {
    hash_value =
      (hash_value + (s.charCodeAt() - "a".charCodeAt() + 1) * p_pow) % m;
    p_pow = (p_pow * p) % m;

    log(hash_value, p_pow);
  }

  return hash_value;
}

hash("hello there....");
 */

/** STRING MATCHING THROUGH HASHING
 *  RABIN KARB ALGORITHM
 *  the best and worst case for this algorithm is O(m + n), m is pattern size and n is string size
 */

function rabin_karp_search_algo() {
  const txt = "This is awesomem and beautiful",
    pat = "ful",
    q = 101;

  const result = search(pat, txt, q);

  return typeof result === "string" ? result : -1;
}

function search(pat, txt, q) {
  const d = 256; // number of characters in the alphabet
  let p = 0, // hash value for pat
    t = 0, // hash value for txt
    i,
    j;
  // h = pow(d, pat.length - 1) % q
  const h = Math.pow(d, pat.length - 1) % q;

  // this here calculates the hash value for pattern and the first window of text
  for (i = 0; i < pat.length; i++) {
    p = (d * p + pat.charCodeAt(i)) % q;
    t = (d * t + txt.charCodeAt(i)) % q;
  }

  //  slide the pattern over txt one by one
  for (i = 0; i <= txt.length - pat.length; i++) {
    if (p === t) {
      for (j = 0; j < pat.length; j++) {
        if (txt[i + j] !== pat[j]) break;
      }

      if (j === pat.length)
        return `first occurence of the ${pat} is at index : ${i}`;
    }

    // calculate hash for next window of txt, remove leading digit, add trailing digit
    if (i < txt.length - pat.length) {
      t =
        (d * (t - txt.charCodeAt(i) * h) + txt.charCodeAt(i + pat.length)) % q;

      if (t < 0) t += q;
    }
  }
}

// log(rabin_karp_search_algo());

/**
 * A DECENT HASH FUNCTION
 */

function hash_1(key, arrayLen) {
  // arrayLen should be a prime for uniform distribution of keys in the buccket
  let total = 0,
    WEIRD_PRIME = 31;
  for (let i = 0; i < Math.min(key.length, 100); i++)
    total = (total * WEIRD_PRIME + (key.charCodeAt(i) - 96)) % arrayLen;

  return total;
}

// log(hash_1("hello", 53));

/**
 * BUILDING OUR OWN HASH TABLE
 */

class Node {
  constructor(key, value) {
    Object.assign(this, { key, value, next: null });
  }
}

class HashTable {
  WEIRD_PRIME = 31;
  SIZE = 0;

  constructor(arraySize = 53) {
    Object.assign(this, {
      table: Array.from({ length: arraySize }, () => null),
    });
  }

  get _table() {
    return this.table;
  }

  add(key, value) {
    let index = this.compute_hash(key),
      head = this.table[index];

    while (head) {
      if (head.key === key) {
        head.value = value;
        return;
      }

      head = head.next;
    }

    const newNode = new Node(key, value);
    head = this.table[index];
    this.table[index] = newNode;
    newNode.next = head;
    this.SIZE++;

    // this is done when the loadfactor is greater then 0.7

    /**  THIS CODE NEEDS IMPROVEMENT.
     * 
     * if (this.SIZE / this.table.length >= 0.7) {
      const temp = [...this.table];
      this.table = Array.from({ length: temp.length * 2 }, () => null);
      this.SIZE = 0;

      for (let item of temp) {
        while (item !== null) {
          this.add(item.key, item.value);
          item = item.next;
        }
      }
    }
     */
  }

  compute_hash(key) {
    key = key.toLowerCase();
    let hash_value = 0;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      hash_value =
        (hash_value * this.WEIRD_PRIME + (key.charCodeAt(i) - 96)) %
        this.table.length;
    }

    return hash_value;
  }

  get(key) {
    const hash_code = this.compute_hash(key);
    let head = this.table[hash_code];

    while (head) {
      if (head.key === key) return head.value;
      head = head.next;
    }

    return null;
  }
}

const instance = new HashTable(53);

instance.add("name", "Abhishek");
instance.add("age", 22);
instance.add("friends", ["Ram", "shyam", "sita"]);

log(instance);
log(instance.get("friends"));


/**
 * A MODEL FOR LINKKED LIST
 *
 * class _Node {
  constructor(val) {
    Object.assign(this, { val, next: null });
  }
}

class LinkedList {
  constructor() {
    Object.assign(this, { length: 0, head: null });
  }

  insert(val) {
    // this is to insert at the end
    const newNode = new _Node(val);
    if (this.head === null) this.head = newNode;
    else {
      let pointer = this.head;
      while (pointer.next) {
        pointer = pointer.next;
      }
      pointer.next = newNode;
      this.length++;
    }
  }

  // insert at the begining

  insert_at_begining(val) {
    const newNode = new _Node(val);
    if (this.head === null) {
      this.head = newNode;
    } else {
      let temp = this.head;
      this.head = newNode;
      newNode.next = temp;
    }

    this.length++;
  }
}

const ll = new LinkedList();

const data = ["keshav", {}, [], "hello there", "last"];

for (let el of data) {
  ll.insert_at_begining(el);
}

log(ll);
 *
 */
