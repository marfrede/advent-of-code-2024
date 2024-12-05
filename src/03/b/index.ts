import { read, readLines } from "../../util/txt-reader";

const lines = readLines("../input.txt");
const line = lines.join("");

const matcher = /don't\(\)|do\(\)|mul(\(((\d{1,3}),(\d{1,3})\)))/g;
const matches = line.matchAll(matcher);

let sum = 0;
let mode: "do" | "dont" = "do";

for (const element of matches) {
  if (element[0][2] === "n") {
    mode = "dont";
  } else if (element[0][2] === "(") {
    mode = "do";
  } else {
    if (mode === "do") {
      const a = Number(element[3]);
      const b = Number(element[4]);
      sum += a * b;
    }
  }
}

console.log(sum);
