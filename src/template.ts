import { name } from "../src/name";

/*
 */
const part_one = (input: string) => {
  return;
};

/*
 */
const part_two = (input: string) => {
  return;
};

const main = () => {
  console.log(`${name(__filename)}, Part One:`, part_one(INPUT));
  console.log(`${name(__filename)}, Part Two:`, part_two(INPUT));
};

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  const { basename } = await import("path");

  const EXAMPLE_1 = ``;

  it(`solves ${name(__filename)}, part one with example data`, () => {
    expect(part_one(EXAMPLE_1)).toBe(undefined);
  });

  const EXAMPLE_2 = ``;

  it.skip(`solves ${name(__filename)}, part two with example data`, () => {
    expect(part_two(EXAMPLE_2)).toBe(undefined);
  });
}

const INPUT = ``;

main();
