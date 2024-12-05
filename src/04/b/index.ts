import { read, readLines } from "../../util/txt-reader";

const matrix = readLines("../input.txt");

const get = (x: number, y: number): string | undefined => {
  if (x < 0 || x >= matrix.length) {
    return undefined;
  } else if (y < 0 || y >= matrix[x].length) {
    return undefined;
  }
  return matrix[x][y];
};

const findX_MASAt = (x: number, y: number): boolean => {
  if (
    (matrix[x][y] === "M" && findWordToDiagonallyRightDownwards("MAS", x, y)) ||
    (matrix[x][y] === "S" && findWordToDiagonallyRightDownwards("SAM", x, y))
  ) {
    const twoDownwards = get(x, y + 2);
    if (
      twoDownwards &&
      ((matrix[x][y + 2] === "M" &&
        findWordToDiagonallyRightUpwards("MAS", x, y + 2)) ||
        (matrix[x][y + 2] === "S" &&
          findWordToDiagonallyRightUpwards("SAM", x, y + 2)))
    ) {
      return true;
    }
  }

  return false;
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
    if (findX_MASAt(x, y)) sum++;
  }
}
console.log(sum);
