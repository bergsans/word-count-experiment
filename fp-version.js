#!/bin/node
const loremIpsum = require("./lorem-ipsum.js");

const countWord = (words, word) => {
  const lowerCaseWord = word.toLowerCase();
  if (lowerCaseWord in words) {
    words[lowerCaseWord] = words[lowerCaseWord] + 1;
  } else {
    words[lowerCaseWord] = 1;
  }
  return words;
};

const countWords = (string) =>
  string
    .split(/[ ,;!?.'"\t\n]+/)
    .filter((word) => word !== "")
    .reduce(countWord, {});

const compareWordLength = ([_, v1], [__, v2]) => v1 < v2;

const sortWordList = (wordList) =>
  Object.entries(wordList).sort(compareWordLength);

const getNMostCommonWords = (n) => (listOfWords) =>
  listOfWords.slice(0, n).map(([word, _frequency]) => word);

const head = (ws) => ws[0];

function surroundWordWith(word, before, after, str) {
  const wordRegEx = new RegExp(word, "gi");
  return str.replace(wordRegEx, (w) => `${before}${w}${after}`);
}

const compose = (...fns) => (initial) =>
  fns.reduceRight((a, b) => b(a), initial);

const mostCommonWord = compose(
  head,
  getNMostCommonWords(1),
  sortWordList,
  countWords
)(loremIpsum);

const result = surroundWordWith(mostCommonWord, "foo", "bar", loremIpsum);
console.log(result);
