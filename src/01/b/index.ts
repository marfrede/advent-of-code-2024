import { read, readLines } from "../../util/txt-reader";

const lines = readLines("../input.txt");

const leftNumbers: number[] = [];
const rightNumbers: number[] = [];

lines.forEach((line) => {
  const numberPair = line.split(/\s+/);
  leftNumbers.push(Number(numberPair[0]));
  rightNumbers.push(Number(numberPair[1]));
});

let sum = 0;
leftNumbers.forEach((leftN, i) => {
  const numberOfEqualsInRightList = rightNumbers.filter(
    (rN) => rN === leftN
  ).length;
  sum += numberOfEqualsInRightList * leftN;
});

console.log("sum", sum);
