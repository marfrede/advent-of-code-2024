import { readLines } from "../../util/txt-reader";

type Pos = { x: number; y: number };

const matrix = readLines("../input.txt");

const antennasPositions = new Map<string, Pos[]>();
for (let y = 0; y < matrix.length; y++) {
  for (let x = 0; x < matrix[y].length; x++) {
    const antenna = matrix[y][x];
    if (antenna !== ".") {
      if (!antennasPositions.has(antenna)) {
        antennasPositions.set(antenna, []);
      }
      antennasPositions.set(antenna, [
        ...antennasPositions.get(antenna)!,
        { x, y },
      ]);
    }
  }
}

const positionsFound: Map<number /*x*/, number[] /*ys*/> = new Map<
  number,
  number[]
>();
const addPosFoundUnique = (pos: Pos) => {
  const { x, y } = pos;
  if (x < 0 || y < 0 || x >= matrix[0].length || y >= matrix.length) {
    return;
  }
  if (!positionsFound.has(x)) {
    positionsFound.set(x, []);
  }
  if (!positionsFound.get(x)!.includes(y)) {
    positionsFound.set(x, [...positionsFound.get(x)!, y]);
  }
};

function calcAntiNodes(p1: Pos, p2: Pos): [Pos, Pos] | undefined {
  const poss: [Pos, Pos] = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ];

  const pointLower = p1.y > p2.y ? p1 : p2;
  const pointHigher = p1.y <= p2.y ? p1 : p2;
  const isShowingToTopLeft = pointLower.x >= pointHigher.x; // or showing to top right

  const diffX = Math.abs(p1.x - p2.x);
  const diffY = Math.abs(p1.y - p2.y);

  if (isShowingToTopLeft) {
    // 4,3 & 5,5 => 3,1 & 6,7
    poss[0].x = Math.min(p1.x, p2.x) - diffX; // 3
    poss[1].x = Math.max(p1.x, p2.x) + diffX; // 6
    poss[0].y = Math.min(p1.y, p2.y) - diffY; // 1
    poss[1].y = Math.max(p1.y, p2.y) + diffY; // 7
    // => 3,1 & 6,7
  } else {
    // 5,3 & 4,5 => 6,1 & 3,7
    poss[0].x = Math.min(p1.x, p2.x) - diffX; // 3
    poss[1].x = Math.max(p1.x, p2.x) + diffX; // 6
    poss[0].y = Math.max(p1.y, p2.y) + diffY; // 7
    poss[1].y = Math.min(p1.y, p2.y) - diffY; // 1
    // => 3,7 & 6,1
  }

  return poss;
}

for (const antennaPositions of antennasPositions.values()) {
  for (let i1 = 0; i1 < antennaPositions.length; i1++) {
    for (let i2 = 0; i2 < antennaPositions.length; i2++) {
      if (i1 !== i2) {
        const poss: [Pos, Pos] | undefined = calcAntiNodes(
          antennaPositions[i1],
          antennaPositions[i2]
        );
        if (poss !== undefined) {
          addPosFoundUnique(poss[0]);
          addPosFoundUnique(poss[1]);
        }
      }
    }
  }
}

let sum = 0;
for (const element of positionsFound.values()) {
  sum += element.length;
}

console.log(sum);
