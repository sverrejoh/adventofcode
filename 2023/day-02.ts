import { name } from "../src/name";

/*
--- Day 2: Cube Conundrum ---
You're launched high into the atmosphere! The apex of your trajectory just barely reaches the surface of a large island floating in the sky. You gently land in a fluffy pile of leaves. It's quite cold, but you don't see much snow. An Elf runs over to greet you.

The Elf explains that you've arrived at Snow Island and apologizes for the lack of snow. He'll be happy to explain the situation, but it's a bit of a walk, so you have some time. They don't get many visitors up here; would you like to play a game in the meantime?

As you walk, the Elf shows you a small bag and some cubes which are either red, green, or blue. Each time you play this game, he will hide a secret number of cubes of each color in the bag, and your goal is to figure out information about the number of cubes.

To get information, once a bag has been loaded with cubes, the Elf will reach into the bag, grab a handful of random cubes, show them to you, and then put them back in the bag. He'll do this a few times per game.

You play several games and record the information from each game (your puzzle input). Each game is listed with its ID number (like the 11 in Game 11: ...) followed by a semicolon-separated list of subsets of cubes that were revealed from the bag (like 3 red, 5 green, 4 blue).

For example, the record of a few games might look like this:

Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
In game 1, three sets of cubes are revealed from the bag (and then put back again). The first set is 3 blue cubes and 4 red cubes; the second set is 1 red cube, 2 green cubes, and 6 blue cubes; the third set is only 2 green cubes.

The Elf would first like to know which games would have been possible if the bag contained only 12 red cubes, 13 green cubes, and 14 blue cubes?

In the example above, games 1, 2, and 5 would have been possible if the bag had been loaded with that configuration. However, game 3 would have been impossible because at one point the Elf showed you 20 red cubes at once; similarly, game 4 would also have been impossible because the Elf showed you 15 blue cubes at once. If you add up the IDs of the games that would have been possible, you get 8.

Determine which games would have been possible if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes. What is the sum of the IDs of those games?

 */
const part_one = (input: string) => {
  const max = {
    red: 12,
    green: 13,
    blue: 14,
  };
  return input
    .split("\n")
    .filter(Boolean)
    .reduce((acc, game) => {
      const [title, rest] = game.split(": ");
      const [, number] = title.split("Game ");
      for (const set of rest.split("; ")) {
        for (const pair of set.split(", ")) {
          const [count, color] = pair.split(" ");
          if (max[color] < count) {
            return acc;
          }
        }
      }
      return acc + Number(number);
    }, 0);
};

/*
--- Part Two ---
The Elf says they've stopped producing snow because they aren't getting any water! He isn't sure why the water stopped; however, he can show you how to get to the water source to check it out for yourself. It's just up ahead!

As you continue your walk, the Elf poses a second question: in each game you played, what is the fewest number of cubes of each color that could have been in the bag to make the game possible?

Again consider the example games from earlier:

Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
In game 1, the game could have been played with as few as 4 red, 2 green, and 6 blue cubes. If any color had even one fewer cube, the game would have been impossible.
Game 2 could have been played with a minimum of 1 red, 3 green, and 4 blue cubes.
Game 3 must have been played with at least 20 red, 13 green, and 6 blue cubes.
Game 4 required at least 14 red, 3 green, and 15 blue cubes.
Game 5 needed no fewer than 6 red, 3 green, and 2 blue cubes in the bag.
The power of a set of cubes is equal to the numbers of red, green, and blue cubes multiplied together. The power of the minimum set of cubes in game 1 is 48. In games 2-5 it was 12, 1560, 630, and 36, respectively. Adding up these five powers produces the sum 2286.

For each game, find the minimum set of cubes that must have been present. What is the sum of the power of these sets?
 */

const part_two = (input: string) => {
  return input
    .split("\n")
    .filter(Boolean)
    .reduce((acc, game) => {
      const max = {
        red: 0,
        green: 0,
        blue: 0,
      };
      const [, rest] = game.split(": ");
      for (const set of rest.split("; ")) {
        for (const pair of set.split(", ")) {
          const [count, color] = pair.split(" ");
          max[color] = Math.max(Number(count), max[color]);
        }
      }
      return acc + Object.keys(max).reduce((a, k) => a * max[k], 1);
    }, 0);
};

const main = () => {
  console.log(`${name(__filename)}, Part One:`, part_one(INPUT));
  console.log(`${name(__filename)}, Part Two:`, part_two(INPUT));
};

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  const EXAMPLE_1 = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

  it(`solves ${name(__filename)}, part one with example data`, () => {
    expect(part_one(EXAMPLE_1)).toBe(8);
  });

  const EXAMPLE_2 = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

  it(`solves ${name(__filename)}, part two with example data`, () => {
    expect(part_two(EXAMPLE_2)).toBe(2286);
  });
}

const INPUT = `Game 1: 1 green, 1 blue, 1 red; 3 green, 1 blue, 1 red; 4 green, 3 blue, 1 red; 4 green, 2 blue, 1 red; 3 blue, 3 green
Game 2: 9 blue, 7 red; 5 blue, 6 green, 1 red; 2 blue, 10 red, 9 green; 3 green, 14 red, 5 blue; 8 red, 3 blue, 4 green; 8 green, 14 blue, 10 red
Game 3: 11 green, 8 blue, 7 red; 3 green, 4 red, 9 blue; 3 red, 4 green, 8 blue; 11 green, 1 red, 16 blue
Game 4: 3 blue, 20 green, 2 red; 1 green, 3 red, 3 blue; 1 blue, 9 green; 4 red, 17 green; 12 green, 3 red
Game 5: 2 red, 1 blue, 4 green; 6 blue, 2 green; 2 red, 5 green
Game 6: 1 green, 7 red; 1 blue, 3 green, 1 red; 1 blue, 2 red, 2 green; 1 blue, 1 green, 2 red; 3 red; 8 red, 1 green, 1 blue
Game 7: 13 green, 5 blue, 1 red; 9 green, 6 blue; 11 green, 2 blue, 2 red
Game 8: 2 red, 11 green, 6 blue; 5 green, 3 blue; 3 blue, 3 green, 5 red; 5 blue, 9 green, 1 red
Game 9: 3 blue, 5 green, 8 red; 4 green, 19 blue, 4 red; 4 red, 17 blue
Game 10: 2 green, 8 red, 4 blue; 1 green, 5 red, 9 blue; 3 green, 2 red, 4 blue; 2 green, 5 red, 2 blue; 6 green, 4 blue; 10 blue, 8 green, 8 red
Game 11: 3 green, 1 blue, 9 red; 2 blue, 1 red, 9 green; 1 blue, 9 green, 7 red; 8 red, 6 green
Game 12: 5 green; 8 green, 7 red, 1 blue; 8 blue, 8 green, 14 red; 6 red, 14 green; 14 green, 3 red, 8 blue
Game 13: 7 red, 2 green, 4 blue; 5 red, 3 blue, 8 green; 10 green, 1 red, 4 blue; 7 green, 1 red, 13 blue; 11 green, 12 blue, 2 red
Game 14: 9 green, 4 red; 7 green, 4 blue, 5 red; 2 red, 2 green; 3 green, 2 red, 8 blue; 7 green, 6 red, 8 blue
Game 15: 19 blue, 1 green; 1 red, 5 blue; 3 green, 8 blue; 1 red, 13 blue, 3 green
Game 16: 8 red, 11 blue, 3 green; 14 green, 1 red, 12 blue; 6 green, 1 red, 6 blue; 1 red, 6 blue, 17 green; 2 green, 8 blue, 3 red
Game 17: 3 red, 1 blue; 1 blue, 2 red, 1 green; 1 red; 3 red, 2 green
Game 18: 8 green, 2 red; 1 blue, 6 red; 8 green, 7 red, 2 blue; 1 red; 6 green, 1 blue, 3 red
Game 19: 4 blue, 2 green; 4 green, 18 blue, 2 red; 14 green, 4 blue; 1 red, 3 blue, 18 green; 11 blue, 3 red; 14 green, 4 red, 6 blue
Game 20: 7 blue; 1 blue, 6 green, 1 red; 1 red, 3 blue, 10 green; 7 green, 4 blue, 1 red; 6 green, 6 blue, 1 red; 1 red, 5 blue, 17 green
Game 21: 11 blue, 9 red; 8 red, 2 blue; 2 red, 11 blue, 2 green
Game 22: 4 green, 9 blue, 2 red; 2 blue, 8 green; 2 green, 2 red, 6 blue
Game 23: 7 green, 7 blue; 6 blue, 11 green; 1 red, 14 green; 15 green, 4 blue, 1 red; 1 red, 5 blue, 3 green; 1 red, 1 blue, 13 green
Game 24: 5 green, 2 red, 2 blue; 1 blue, 3 green, 2 red; 2 blue, 7 green, 3 red
Game 25: 16 red, 8 green; 2 red, 3 blue; 10 green, 5 red, 4 blue; 9 red, 7 green; 7 red, 6 blue
Game 26: 3 red, 1 green; 5 red, 1 blue, 10 green; 8 red, 5 green
Game 27: 3 red, 2 blue; 6 red, 8 green; 5 green, 13 red, 2 blue; 4 red, 1 blue, 8 green; 14 red, 1 blue, 3 green; 2 red, 1 green, 2 blue
Game 28: 9 red, 10 blue; 9 red, 9 blue; 1 green, 6 red, 4 blue; 12 blue, 3 green, 2 red; 2 green, 12 red, 8 blue
Game 29: 4 red, 15 blue; 5 blue, 3 green, 6 red; 1 green, 9 blue, 1 red; 5 green, 8 red, 1 blue
Game 30: 4 green, 2 blue, 10 red; 1 red, 5 green, 6 blue; 15 red, 2 blue; 5 green, 10 red, 8 blue
Game 31: 6 green, 2 blue, 2 red; 5 green, 6 red, 6 blue; 3 blue, 5 red, 1 green; 4 green, 6 red, 9 blue; 4 red; 3 green, 1 red, 3 blue
Game 32: 8 green, 17 red, 17 blue; 11 red, 6 green, 13 blue; 14 red, 1 green, 1 blue; 1 green, 17 red, 4 blue; 5 green, 14 red, 15 blue; 15 blue, 8 green
Game 33: 2 red, 14 blue; 3 blue, 17 red, 4 green; 9 blue, 8 red; 5 red, 2 blue; 4 green, 16 red, 5 blue; 15 blue, 6 green, 17 red
Game 34: 12 green, 2 red, 1 blue; 3 blue, 9 red, 13 green; 2 blue, 17 green, 6 red; 6 green, 4 red, 3 blue; 2 red, 1 blue; 7 green, 3 blue, 7 red
Game 35: 4 blue, 5 red, 5 green; 6 green, 12 red, 6 blue; 3 green, 18 red, 2 blue; 13 red, 6 green, 9 blue; 3 green, 10 blue, 17 red; 1 green, 3 blue, 16 red
Game 36: 4 green, 3 blue, 1 red; 3 green, 3 red, 10 blue; 1 red, 8 green, 8 blue; 3 blue, 1 red; 2 red, 2 blue, 14 green
Game 37: 16 blue, 1 green; 9 blue; 7 red, 13 blue
Game 38: 6 green, 8 red, 3 blue; 5 blue, 4 green, 6 red; 5 blue, 4 green; 5 red, 3 green, 1 blue; 6 green, 4 blue, 15 red
Game 39: 10 blue, 4 green; 1 blue, 7 green, 5 red; 8 red, 2 blue
Game 40: 2 blue, 2 green, 6 red; 8 green, 4 red, 2 blue; 4 blue, 12 green, 6 red
Game 41: 4 green, 2 blue, 11 red; 6 red, 11 green; 4 blue, 2 red, 19 green; 3 green, 2 blue, 1 red
Game 42: 2 blue, 2 green, 4 red; 1 red, 4 blue, 8 green; 5 red, 2 blue, 15 green; 10 green, 5 red, 1 blue; 10 green, 1 blue; 2 blue
Game 43: 10 red, 19 green, 11 blue; 11 green, 1 red, 2 blue; 13 red, 6 blue, 3 green; 12 red, 10 green; 5 red, 19 green, 8 blue; 2 red, 10 green, 3 blue
Game 44: 7 blue, 8 red; 1 green, 12 red; 19 red, 3 green, 5 blue
Game 45: 12 red; 2 green, 5 red, 3 blue; 10 green, 2 blue, 4 red; 10 green, 7 red
Game 46: 4 blue, 4 red, 2 green; 7 green, 6 blue; 6 blue, 1 red, 4 green
Game 47: 4 green, 8 red, 1 blue; 4 green, 1 blue, 11 red; 14 red, 3 blue, 10 green; 15 green, 2 blue, 7 red
Game 48: 6 blue, 3 green, 1 red; 15 blue, 11 red, 3 green; 17 blue, 14 red; 2 green, 13 red; 5 red, 2 green, 4 blue
Game 49: 7 blue, 1 green; 8 red, 2 blue, 1 green; 1 red, 1 green, 2 blue; 3 red, 2 blue, 1 green
Game 50: 13 red, 2 green, 2 blue; 13 red, 6 green, 1 blue; 12 red, 8 green; 1 red, 3 green; 13 red; 2 blue, 11 red, 2 green
Game 51: 7 green, 4 blue, 2 red; 3 red, 7 green, 5 blue; 10 green, 2 blue; 14 green, 3 red, 4 blue; 2 blue, 2 red, 10 green
Game 52: 7 blue, 10 red; 7 red, 4 blue, 8 green; 12 red, 4 blue, 7 green; 7 green, 7 red; 17 green, 11 blue, 6 red; 8 green, 8 red, 18 blue
Game 53: 6 green, 2 red; 10 red, 13 green; 2 blue, 3 green, 5 red; 4 red, 4 green; 8 green, 1 red; 13 green, 2 blue, 10 red
Game 54: 5 red, 9 green, 5 blue; 6 red, 15 green, 10 blue; 8 blue, 3 green, 1 red; 12 blue, 3 red, 13 green
Game 55: 10 green, 4 red, 2 blue; 2 green, 1 red, 2 blue; 2 blue, 4 red, 8 green; 5 blue, 3 green
Game 56: 7 green, 9 red, 2 blue; 4 red, 1 blue, 3 green; 3 red, 4 blue, 6 green; 7 green, 2 red; 5 blue, 2 red, 3 green; 7 green, 7 red, 5 blue
Game 57: 11 blue, 5 green, 6 red; 18 red, 15 green, 10 blue; 5 green, 14 red, 6 blue; 1 green, 11 red, 7 blue; 11 blue, 7 red, 12 green
Game 58: 9 red, 6 blue, 6 green; 6 blue, 12 red, 3 green; 8 red, 1 blue, 20 green; 3 green, 3 red, 15 blue; 4 blue, 15 green, 3 red
Game 59: 18 red, 4 blue, 7 green; 11 blue, 19 red, 7 green; 10 red, 9 blue, 1 green; 8 red, 12 green, 4 blue; 6 green, 5 blue, 12 red; 2 blue, 14 green, 2 red
Game 60: 1 blue, 9 green, 6 red; 1 red, 1 blue, 13 green; 15 green, 4 red; 1 blue, 2 red, 15 green
Game 61: 9 green, 3 red, 2 blue; 1 green, 5 blue, 10 red; 17 red, 9 green, 5 blue; 10 red, 5 green, 5 blue
Game 62: 4 red, 2 green; 2 red; 5 red, 2 green, 2 blue; 3 green, 1 blue; 2 blue, 3 red, 3 green
Game 63: 4 red, 6 blue, 2 green; 3 green, 1 red, 5 blue; 7 blue, 5 green
Game 64: 8 blue, 12 red; 1 green, 6 red, 14 blue; 12 red, 13 blue
Game 65: 2 red, 8 green; 1 blue, 2 red, 5 green; 2 blue, 3 green; 1 green, 1 red
Game 66: 6 red, 8 blue, 2 green; 6 blue, 7 green; 7 green, 11 blue; 5 green, 4 red, 10 blue; 5 blue, 4 green; 6 blue, 6 green, 5 red
Game 67: 12 green, 4 red; 2 blue, 11 green, 6 red; 9 red, 2 green, 6 blue; 2 red, 8 blue, 18 green; 17 green, 7 blue, 6 red; 12 blue, 9 green
Game 68: 3 red, 9 blue, 1 green; 3 green, 11 blue; 12 blue, 9 red; 6 red, 13 green, 8 blue
Game 69: 3 red, 8 green, 3 blue; 6 green, 3 red; 11 green, 3 blue; 4 red, 3 green; 7 green, 4 blue, 6 red; 1 red, 2 blue
Game 70: 6 green, 4 blue; 7 red, 9 green, 14 blue; 12 red; 9 green, 10 red; 6 green, 16 blue, 8 red
Game 71: 4 blue, 6 red, 9 green; 6 green, 2 red; 8 green, 4 blue, 2 red; 1 red, 3 blue, 8 green; 9 green, 3 red, 3 blue; 4 red, 6 green
Game 72: 3 red, 3 green, 3 blue; 4 red, 1 green, 3 blue; 2 red, 2 green, 1 blue
Game 73: 7 green, 6 red, 7 blue; 2 green, 4 blue; 2 blue, 15 green, 4 red; 1 blue, 4 green, 2 red; 7 blue, 14 green
Game 74: 4 green, 2 red, 2 blue; 9 blue, 13 green, 4 red; 10 green, 12 blue, 7 red; 4 blue, 8 green, 7 red
Game 75: 3 red, 3 green; 3 green, 12 red; 18 red, 2 blue; 3 green, 9 red, 1 blue; 14 red, 1 green; 15 red
Game 76: 1 blue, 7 red, 8 green; 3 blue, 4 red, 1 green; 6 green, 6 red
Game 77: 2 green, 8 red; 5 green, 11 red, 1 blue; 5 red, 2 blue, 2 green; 6 red, 5 green, 2 blue; 11 red, 2 green, 1 blue; 2 red, 8 green, 2 blue
Game 78: 1 blue, 4 red, 10 green; 13 green, 4 red, 9 blue; 12 green, 6 blue, 3 red; 5 blue, 8 green, 6 red
Game 79: 9 red, 1 blue, 17 green; 9 green, 6 red; 15 green, 1 blue, 9 red; 1 blue, 8 red, 12 green; 11 green, 1 blue, 1 red
Game 80: 3 red, 3 blue, 1 green; 1 blue, 8 green; 10 green, 16 blue
Game 81: 15 blue, 2 red; 1 red, 8 blue; 2 green, 7 red, 11 blue; 19 blue, 8 red, 2 green; 20 red, 19 blue
Game 82: 3 red, 17 blue, 9 green; 10 red, 2 green, 17 blue; 13 red, 3 blue, 10 green; 11 red, 10 green, 18 blue; 1 green, 12 blue, 9 red; 3 red, 10 blue, 8 green
Game 83: 4 green, 2 blue, 14 red; 7 red, 2 blue, 7 green; 16 red, 7 green; 16 red, 2 green; 3 blue, 4 green, 15 red; 6 red, 1 blue, 4 green
Game 84: 4 blue, 1 green, 2 red; 7 blue, 6 red; 1 blue, 4 red, 3 green
Game 85: 5 blue, 1 red, 4 green; 14 blue, 7 green; 9 blue, 1 red, 7 green; 15 blue, 9 green; 8 blue, 6 green, 1 red
Game 86: 12 red, 12 blue, 7 green; 16 red, 11 green, 4 blue; 14 blue, 8 green, 8 red; 2 blue, 15 red, 6 green; 1 green, 6 red, 5 blue; 11 blue, 9 green
Game 87: 4 blue, 2 green, 6 red; 8 red, 3 green, 5 blue; 10 red, 1 green; 1 green, 3 blue, 1 red
Game 88: 2 green, 2 red, 4 blue; 4 blue, 4 green, 12 red; 2 green, 3 blue, 4 red; 2 green, 2 blue, 12 red; 4 blue, 8 red, 2 green
Game 89: 13 blue, 1 red, 5 green; 8 green, 16 blue, 5 red; 12 green, 2 red, 18 blue
Game 90: 7 red, 11 blue, 1 green; 8 green, 13 blue; 7 green, 16 blue; 5 green, 13 red, 11 blue; 5 blue, 10 green, 3 red
Game 91: 1 blue; 1 blue, 3 green; 1 green, 2 red
Game 92: 16 red, 4 blue, 14 green; 15 red, 7 blue, 13 green; 7 green, 13 red, 8 blue; 4 blue, 9 red, 5 green; 6 red, 7 blue, 8 green; 14 green, 7 red, 10 blue
Game 93: 2 red, 6 blue, 7 green; 8 green, 3 red, 10 blue; 1 green, 4 red; 2 red, 2 green; 8 blue, 7 green
Game 94: 2 green, 3 blue, 5 red; 10 blue; 1 green, 7 red; 3 blue, 1 green, 12 red
Game 95: 13 blue, 5 red; 9 blue, 3 red, 7 green; 10 green, 4 red, 12 blue; 14 blue; 7 green, 2 blue, 1 red
Game 96: 5 red, 2 blue; 4 red; 1 green, 2 blue
Game 97: 9 red, 10 green, 3 blue; 2 green, 15 red, 1 blue; 2 blue, 16 green, 16 red; 8 green, 14 red; 16 red
Game 98: 18 green, 16 red, 1 blue; 3 red, 2 blue, 20 green; 1 blue, 20 green, 14 red; 14 red, 2 green
Game 99: 7 red, 9 green, 5 blue; 6 blue, 1 green; 4 green, 5 blue, 1 red; 8 green, 6 red, 7 blue; 1 blue, 2 red, 9 green
Game 100: 10 blue, 2 red; 7 green, 20 blue, 9 red; 8 red, 6 green, 2 blue`;

main();
