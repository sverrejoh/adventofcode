/*
 */

const part_one = (input: string) => {
  return input;
};

const part_two = (input: string) => {
  return input;
};

const main = () => {
  console.log("Part One:", part_one(INPUT));
  console.log("Part Two:", part_two(INPUT));
};

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  const EXAMPLE_1 = ``;

  it("solves part one with example data", () => {
    expect(part_one(EXAMPLE_1)).toBe(142);
  });

  const EXAMPLE_2 = ``;

  it("solves part two with example data", () => {
    expect(part_two(EXAMPLE_2)).toBe(281);
  });
}

const INPUT = ``;

main();
