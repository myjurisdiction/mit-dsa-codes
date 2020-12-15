const { log } = console;

/** Let's copy to arrays into a new Array */

const human = ["Abhishek", "sam", "Martin", "frenchessca"];
const pets = ["dog", "cat", "cow", "lion"];

let livingbeings = new Array();

for (let h of human) livingbeings.push(h);

for (let p of pets) livingbeings.push(p);

// livingbeings = human + pets;

log(livingbeings);

log(typeof livingbeings, typeof human, typeof pets);

function removeDuplicates(list) {
  let i = 0,
    j = 1;

  list = list.sort((a, b) => a - b);
  while (j < list.length) {
    if (list[i] !== list[j]) list[++i] = list[j++];
    else j++;
  }

  return list.slice(0, i + 1);
}

const sampleArray = Array.from({ length: 10 }, () =>
  Math.floor(Math.random() * 30)
);

log("original one ", sampleArray);
log("unique one", removeDuplicates(sampleArray));

let regex = /\.(jpg|jpeg|png|gif|mp4)$/i;

const array = ["wdfnf.png", "wefnwfwe.JPG"];

array.forEach((el) => {
  if (el.match(regex)) log(true);
  else log(false);
});
