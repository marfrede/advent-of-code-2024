import { readFileSync } from "fs";

export function read(fileName: string): string {
  return readFileSync(fileName, "utf8");
}

export function readLines(fileName: string): string[] {
  return read(fileName).split("\n").filter(l => !!l);
}
