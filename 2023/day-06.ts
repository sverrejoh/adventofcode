import { name } from "../lib/name";

/*
 */
const part_one = (input: string) => {
  const [timeHeader, distanceHeader] = input.split("\n");
  const times = timeHeader
    .split("Time:")[1]
    .split(" ")
    .filter(Boolean)
    .map((d) => d.trim());

  const distances = distanceHeader
    .split("Distance:")[1]
    .split(" ")
    .filter(Boolean)
    .map((d) => d.trim());

  let sum = 1;

  for (let i = 0; i < times.length; i++) {
    const distance = parseInt(distances[i]);
    const time = parseInt(times[i]);
    const winners = [...Array(time).keys()]
      .map((i) => i * (time - i))
      .filter((i) => i > distance);

    console.log(winners);
    sum = sum * winners.length;
  }

  return sum;
};

/*
 */
const part_two = (input: string) => {
  const [timeHeader, distanceHeader] = input.split("\n");

  const time = parseInt(
    timeHeader
      .split("Time:")[1]
      .split(" ")
      .filter(Boolean)
      .map((d) => d.trim())
      .join(""),
  );

  const distance = parseInt(
    distanceHeader
      .split("Distance:")[1]
      .split(" ")
      .filter(Boolean)
      .map((d) => d.trim())
      .join(""),
  );

  console.log(time, distance);

  // const distance = parseInt(distances[i]);
  // const time = parseInt(times[i]);
  const winners = [...Array(time).keys()]
    .map((i) => i * (time - i))
    .filter((i) => i > distance);

  return winners.length;
};

const main = () => {
  console.log(`${name(__filename)}, Part One:`, part_one(INPUT));
  console.log(`${name(__filename)}, Part Two:`, part_two(INPUT));
};

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  const EXAMPLE_1 = `Time:      7  15   30
Distance:  9  40  200`;

  it(`solves ${name(__filename)}, part one with example data`, () => {
    expect(part_one(EXAMPLE_1)).toBe(288);
  });

  const EXAMPLE_2 = ``;

  it.skip(`solves ${name(__filename)}, part two with example data`, () => {
    expect(part_two(EXAMPLE_2)).toBe(undefined);
  });
}

const INPUT = `Time:        62     64     91     90
Distance:   553   1010   1473   1074`;

main();
