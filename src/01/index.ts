import { read, readLines } from "../util/txt-reader";

const lines = readLines("../01/input.txt");

const leftNumbers: number[] = [];
const rightNumbers: number[] = [];

lines.forEach((line) => {
  const numberPair = line.split(/\s+/);
  leftNumbers.push(Number(numberPair[0]));
  rightNumbers.push(Number(numberPair[1]));
});

leftNumbers.sort();
rightNumbers.sort();

let sum = 0;
leftNumbers.forEach((leftN, i) => {
  const rightN = rightNumbers[i];
  sum += Math.abs(rightN - leftN);
});

console.log("sum", sum);
