import { read, readLines } from "../util/txt-reader";

const lines = readLines("../03/input.txt");
const line = lines.join("");

const matcher = /mul(\(((\d{1,3}),(\d{1,3})\)))/g;
const matches = line.matchAll(matcher);

let sum = 0;
let adds = 0;

for (const element of matches) {
  const a = Number(element[3]);
  const b = Number(element[4]);
  adds++;
  sum += a * b;
}

console.log(adds, sum);
