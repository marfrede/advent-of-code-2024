import { read, readLines } from "../util/txt-reader";

const lines = readLines("../02/input.txt");

let numberOfSafeRecords = 0;

lines.forEach((line) => {
  const numbersOfLine = line.split(/\s+/).map((s) => Number(s));
  if (lineIsSave(numbersOfLine)) numberOfSafeRecords++;
});

function lineIsSave(line: number[]) {
  let prevNumber: number | undefined = undefined;
  let isAsc: boolean = false;
  let isDesc: boolean = false;

  for (let i = 1; i < line.length; i++) {
    prevNumber = line[i - 1];
    const currNumber = line[i];
    if (Math.abs(currNumber - prevNumber) > 3) return false;
    if (currNumber > prevNumber) {
      isAsc = true;
      if (isDesc) return false;
    } else if (currNumber < prevNumber) {
      isDesc = true;
      if (isAsc) return false;
    } else return false;
  }

  return true;
}

console.log("numberOfSafeRecords", numberOfSafeRecords);
