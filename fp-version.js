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

const isNotEmpty = (word) => word !== "";

const countWords = (string) =>
  string
    .split(/[ ,;!?.'"\t\n]+/)
    .filter(isNotEmpty)
    .reduce(countWord, {});

const compareWordLength = ([_, v1], [__, v2]) => v2 - v1;

const sortWordList = (wordList) =>
  Object.entries(wordList).sort(compareWordLength);

const head = (ws) => ws[0];

const getNWords = (n) => (li) => li.slice(0, n).map(head);

const surroundWord = (before, after) => (word) => `${before}${word}${after}`;

const surroundWordInText = (before, after, str) => (word) => {
  const wordRegEx = new RegExp(word, "gi");
  return str.replace(wordRegEx, surroundWord(before, after));
};

const compose = (...fns) => (initial) =>
  fns.reduceRight((a, b) => b(a), initial);

const tee = (fn) => (res) => {
  fn(res);
  return res;
};

const result = compose(
  surroundWordInText("foo", "bar", loremIpsum),
  head,
  getNWords(1),
  tee(console.log),
  sortWordList,
  countWords
)(loremIpsum);
console.log(result);
