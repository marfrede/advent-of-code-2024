import { read, readLines } from "../util/txt-reader";

const lines = readLines("../02b/input.txt");

// console.log(lines);

let numberOfSafeRecords = 0;

lines.forEach((line) => {
  const numbersOfLine = line.split(/\s+/).map((s) => Number(s));
  const firstTry: number | boolean = lineIsSave(numbersOfLine);
  if (firstTry === true) {
    numberOfSafeRecords++;
  } else {
    if (
      lineIsSave([
        ...numbersOfLine.slice(0, firstTry),
        ...numbersOfLine.slice(firstTry + 1),
      ]) === true ||
      lineIsSave([
        ...numbersOfLine.slice(0, firstTry - 1),
        ...numbersOfLine.slice(firstTry),
      ]) === true ||
      lineIsSave([
        ...numbersOfLine.slice(0, firstTry - 2),
        ...numbersOfLine.slice(firstTry - 1),
      ]) === true
    ) {
      numberOfSafeRecords++;
    }
  }
});

function lineIsSave(line: number[]): true | number {
  let prevNumber: number | undefined = undefined;
  let isAsc: boolean = false;
  let isDesc: boolean = false;

  for (let i = 1; i < line.length; i++) {
    prevNumber = line[i - 1];
    const currNumber = line[i];
    if (Math.abs(currNumber - prevNumber) > 3) return i;
    if (currNumber > prevNumber) {
      isAsc = true;
      if (isDesc) return i;
    } else if (currNumber < prevNumber) {
      isDesc = true;
      if (isAsc) return i;
    } else return i;
  }

  return true;
}

console.log("numberOfSafeRecords", numberOfSafeRecords);
