import { readLines } from "../../util/txt-reader";

type Pos = [x: number, y: number];

const matrix = readLines("../inputTest.txt");

const guard = "^";
const direction: "⬆️" | "⏭️" | "⬇️" | "⬅️" = "⬆️";
const obstacle = "#";

const get = (x: number, y: number): string | undefined => {
  if (x < 0 || x >= matrix.length) {
    return undefined;
  } else if (y < 0 || y >= matrix[x].length) {
    return undefined;
  }
  return matrix[x][y];
};

const findCurrPos = (): Pos => {
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix.length; y++) {
      const element = matrix[x][y];
      if (element === guard) {
        return [x, y];
      }
    }
  }
  return [0, 0];
};

let sum = 0;
let currentPos = findCurrPos();

console.log("currentPos", currentPos);
