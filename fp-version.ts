#!/bin/node
import loremIpsum from "./lorem-ipsum.js";

interface Words {
  [a: string]: number;
}
type Word = string;
type WordListEntryWithCount = [string, number];
type WordListWithCount = WordListEntryWithCount[];

const countWord = (words: Words, word: Word): Words => {
  const lowerCaseWord: string = word.toLowerCase();
  if (lowerCaseWord in words) {
    words[lowerCaseWord] = words[lowerCaseWord] + 1;
  } else {
    words[lowerCaseWord] = 1;
  }
  return words;
};

const isNotEmpty = (word: Word): boolean => word !== "";

const countWords = (str: string): Words =>
  str
    .split(/[ ,;!?.'"\t\n]+/)
    .filter(isNotEmpty)
    .reduce(countWord, {});

const compareWordLength = (
  [_, v1]: [string, number],
  [__, v2]: [string, number]
): number => v2 - v1;

const sortWordList = (wordList: Words): WordListWithCount =>
  Object.entries(wordList).sort(compareWordLength);

const head = <T>(xs: T[]): T => xs[0];

const getNWords = (n: number, li: WordListWithCount) =>
  li.slice(0, n).map(head);

const surroundWord = (before: string, after: string) => (word: string) =>
  `${before}${word}${after}`;

function surroundWordWith(
  word: string,
  before: string,
  after: string,
  str: string
): string {
  const wordRegEx = new RegExp(word, "gi");
  return str.replace(wordRegEx, surroundWord(before, after));
}

const sortedWordList = sortWordList(countWords(loremIpsum));
const mostCommonWord = head(getNWords(1, sortedWordList));
const result = surroundWordWith(mostCommonWord, "foo", "bar", loremIpsum);
console.log(result);
