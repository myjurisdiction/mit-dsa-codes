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

log(
  naive_string_matching("my name is name name name name abhisehk raj", "name")
);

/** STRING MATCHING THROUGH HASHING
 *
 */

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

function rabin_karp_search_algo() {
  const txt = "This is awesomem and beautiful",
    pat = "ful",
    q = 101;

  const result = search(pat, txt, q);

  return typeof result === "string" ? result : -1;
}

function search(pat, txt, q) {
  const d = 256; // number of characters in the alphabet
  let p = 0,
    t = 0,
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

log(rabin_karp_search_algo());
