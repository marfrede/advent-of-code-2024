import { read, readLines } from "../../util/txt-reader";

const lines = readLines("../input.txt");

interface Rule {
  first: number;
  then: number;
}

const index = lines.findIndex((l) => l[2] !== "|");
const rules: Rule[] = lines
  .slice(0, index)
  .map((l) => ({ first: Number(l[0] + l[1]), then: Number(l[3] + l[4]) }));
const arrays = lines.slice(index).map((line) => line.split(",").map(Number));

function topologicalSort(rules: Rule[]): number[] {
  const graph = new Map<number, number[]>(); // Adjacency list
  const inDegree = new Map<number, number>(); // In-degree count

  // Initialize graph and in-degree map
  for (const rule of rules) {
    const { first, then } = rule;

    if (!graph.has(first)) graph.set(first, []);
    if (!graph.has(then)) graph.set(then, []);

    graph.get(first)!.push(then);

    inDegree.set(then, (inDegree.get(then) || 0) + 1);
    if (!inDegree.has(first)) inDegree.set(first, 0);
  }

  // Collect elements with no dependencies (in-degree = 0)
  const queue: number[] = [];
  for (const [node, degree] of inDegree.entries()) {
    if (degree === 0) {
      queue.push(node);
    }
  }

  const sortedOrder: number[] = [];

  // Kahn's algorithm
  while (queue.length > 0) {
    const current = queue.shift()!;
    sortedOrder.push(current);

    for (const neighbor of graph.get(current)!) {
      inDegree.set(neighbor, inDegree.get(neighbor)! - 1);

      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }

  // If sortedOrder contains all nodes, we have a valid order
  if (sortedOrder.length !== graph.size) {
    throw new Error("Cycle detected or missing nodes!");
  }

  return sortedOrder;
}

function isCorrectOrder(arrayToCheck: number[], correctOrder: number[]) {
  let checkI = 0;
  for (let i = 0; i < correctOrder.length; i++) {
    const element = correctOrder[i];
    if (arrayToCheck[checkI] === element) checkI++;
  }
  return checkI === arrayToCheck.length;
}

let sum = 0;
arrays.forEach((array) => {
  const rulesThatApply = rules.filter(
    (rule) => array.includes(rule.first) && array.includes(rule.then)
  );
  const rulesThatApplyArray = topologicalSort(rulesThatApply);

  if (!isCorrectOrder(array, rulesThatApplyArray)) {
    sum += rulesThatApplyArray[Math.floor(rulesThatApplyArray.length / 2)];
  }
});

console.log(sum);
