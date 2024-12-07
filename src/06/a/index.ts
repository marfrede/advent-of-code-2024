import { readLines } from "../../util/txt-reader";

type Pos = { x: number; y: number };
type Dir = "u" | "r" | "d" | "l";

const matrix = readLines("../input.txt");

const guard = "^";
const obstacle = "#";
const positionsVisited: Map<number, Set<number>> = new Map<
  number,
  Set<number>
>();

const addToPosVisited = (pos: Pos) => {
  if (positionsVisited.size === 0 || !positionsVisited.has(pos.x)) {
    const newSet = new Set<number>();
    newSet.add(pos.y);
    positionsVisited.set(pos.x, newSet);
  } else {
    const oldSet = positionsVisited.get(pos.x);
    oldSet!.add(pos.y);
    positionsVisited.set(pos.x, oldSet!);
  }
};

const get = (pos: Pos): string | null => {
  const { x, y } = pos;
  if (y < 0 || y >= matrix.length) {
    return null;
  } else if (x < 0 || x >= matrix[y].length) {
    return null;
  }
  return matrix[y][x];
};

const findCurrPos = (): Pos | null => {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix.length; x++) {
      const element = matrix[y][x];
      if (element === guard) {
        return { x, y };
      }
    }
  }
  return null;
};

const makeMove = (
  currentPos: Pos,
  currentDir: Dir
): { pos: Pos | null; dir: Dir } => {
  const potNewPos: Pos | null = getLookingAtPos(currentPos, currentDir);
  if (potNewPos === null) {
    return { pos: null, dir: currentDir };
  }
  const nextField = get(potNewPos);
  if (nextField !== obstacle) {
    return { pos: potNewPos, dir: currentDir };
  } else {
    const newDir = changeDir(currentDir);
    return makeMove(currentPos, newDir);
  }
};

const getLookingAtPos = (currentPos: Pos, currentDir: Dir): Pos | null => {
  switch (currentDir) {
    case "u":
      const u = { ...currentPos, y: currentPos.y - 1 };
      return get(u) === null ? null : u;
    case "d":
      const d = { ...currentPos, y: currentPos.y + 1 };
      return get(d) === null ? null : d;
    case "l":
      const l = { ...currentPos, x: currentPos.x - 1 };
      return get(l) === null ? null : l;
    case "r":
      const r = { ...currentPos, x: currentPos.x + 1 };
      return get(r) === null ? null : r;
  }
};

const changeDir = (currentDir: Dir): Dir => {
  switch (currentDir) {
    case "u":
      return "r";
    case "d":
      return "l";
    case "l":
      return "u";
    case "r":
      return "d";
  }
};

let currentPos: Pos | null = findCurrPos();
addToPosVisited(currentPos!);

let currentDir: "u" | "r" | "d" | "l" = "u";

while (currentPos !== null) {
  const { pos, dir } = makeMove(currentPos, currentDir);
  currentPos = pos;
  currentDir = dir;
  if (pos) addToPosVisited(pos);
}

let sum = 0;
for (const element of positionsVisited) {
  sum += element[1].size;
}

console.log("sum", sum);
