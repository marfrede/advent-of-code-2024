import { read, readLines } from "../util/txt-reader";

const matrix = readLines("../04/input.txt");

const allowedWords = ["XMAS", "SAMX"];

const get = (x: number, y: number): string | undefined => {
  if (x < 0 || x >= matrix.length) {
    return undefined;
  } else if (y < 0 || y >= matrix[x].length) {
    return undefined;
  }
  return matrix[x][y];
};

const findWordsAt = (x: number, y: number): number => {
  let occurrences = 0;
  for (const allowedWord of allowedWords) {
    occurrences += findWordOccurrencesAt(allowedWord, x, y);
  }
  return occurrences;
};

const findWordOccurrencesAt = (
  wordToFind: string,
  x: number,
  y: number
): number => {
  let occurrences = 0;
  const char = matrix[x][y];
  if (char !== wordToFind[0]) return 0;
  if (findWordToTheRight(wordToFind, x, y)) occurrences++;
  if (findWordDownwards(wordToFind, x, y)) occurrences++;
  if (findWordToDiagonallyRightDownwards(wordToFind, x, y)) occurrences++;
  if (findWordToDiagonallyRightUpwards(wordToFind, x, y)) occurrences++;
  return occurrences;
};

const findWordToTheRight = (
  wordToFind: string,
  x: number,
  y: number
): boolean => {
  for (let i = 1; i < wordToFind.length; i++) {
    const correctLetter = wordToFind[i];
    if (correctLetter !== get(x, y + i)) return false;
  }
  return true;
};

const findWordDownwards = (
  wordToFind: string,
  x: number,
  y: number
): boolean => {
  for (let i = 1; i < wordToFind.length; i++) {
    const correctLetter = wordToFind[i];
    if (correctLetter !== get(x + i, y)) return false;
  }
  return true;
};

const findWordToDiagonallyRightDownwards = (
  wordToFind: string,
  x: number,
  y: number
): boolean => {
  for (let i = 1; i < wordToFind.length; i++) {
    const correctLetter = wordToFind[i];
    if (correctLetter !== get(x + i, y + i)) return false;
  }
  return true;
};

const findWordToDiagonallyRightUpwards = (
  wordToFind: string,
  x: number,
  y: number
): boolean => {
  for (let i = 1; i < wordToFind.length; i++) {
    const correctLetter = wordToFind[i];
    if (correctLetter !== get(x + i, y - i)) return false;
  }
  return true;
};

let sum = 0;
for (let x = 0; x < matrix.length; x++) {
  for (let y = 0; y < matrix[x].length; y++) {
    sum += findWordsAt(x, y);
  }
}
console.log(sum);
