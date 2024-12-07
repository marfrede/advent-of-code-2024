import { transpile } from "typescript";
import { readLines } from "../../util/txt-reader";

const lines = readLines("../input.txt");

function tryGetResult(result: number, numbers: number[]): boolean {
  const combinations = 2 ** (numbers.length - 1);
  for (let i = combinations - 1; i >= 0; i--) {
    const binary = (i >>> 0).toString(2);
    const operations = (
      "0".repeat(
        ((combinations - 1) >>> 0).toString(2).length - binary.length
      ) + binary
    )
      .replaceAll("1", "*")
      .replaceAll("0", "+");

    let resultMatch = eval(
      transpile(`${numbers[0]}${operations[0]}${numbers[1]}`)
    );
    for (let i = 1; i < operations.length; i++) {
      resultMatch = eval(
        transpile(`${resultMatch}${operations[i]}${numbers[i + 1]}`)
      );
    }

    if (result === resultMatch) return true;
  }
  return false;
}

let sum = 0;
for (const line of lines) {
  const [result, ...numbers] = line.replace(/\D+/g, " ").split(" ").map(Number);
  if (tryGetResult(result, numbers)) {
    sum += result;
  }
}

console.log(sum);
