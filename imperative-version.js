#!/bin/node
const loremIpsum = require("./lorem-ipsum.js");

function compareWordLength([_, v1], [__, v2]) {
  return v1 < v2;
}

function countWords(string) {
  let wordList = {};
  const words = string.split(/[ ,;!?.'"\t\n]+/);
  for (let word of words) {
    if (word === "") continue;
    word.toLowerCase();
    if (word in wordList) {
      wordList[word]++;
      continue;
    }
    wordList[word] = 0;
  }
  const wordListSorted = Object.entries(wordList).sort(compareWordLength);
  const formattedList = [];
  for (let i = 0; i < wordListSorted.length; i++)
    formattedList.push(wordListSorted[i][0]);
  return formattedList;
}

function getNOf(n, listOfWords) {
  let list = [];
  for (let i = 0; i < n; i++) {
    list.push(listOfWords[i]);
  }
  return list;
}

function surroundWordWith(word, before, after, str) {
  const wordRegEx = new RegExp(word, "gi");
  return str.replace(wordRegEx, (w) => `${before}${w}${after}`);
}

const wordList = countWords(loremIpsum);
const mostCommonWord = getNOf(1, wordList);

const result = surroundWordWith(mostCommonWord, "foo", "bar", loremIpsum);
console.log(result);
