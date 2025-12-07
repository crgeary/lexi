import type { CharState } from "../types/char.js";

export const getKeyboardState = (guesses: string[], solution: string) => {
  const splitSolution = solution.split("");

  return guesses.reduce(
    (acc, guess) => {
      return guess.split("").reduce((acc, char, i) => {
        if (!splitSolution.includes(char)) {
          acc[char] = "absent";
        } else if (char === splitSolution[i]) {
          acc[char] = "correct";
        } else if (acc[char] !== "correct") {
          acc[char] = "present";
        }
        return acc;
      }, acc);
    },
    {} as Record<string, CharState>,
  );
};
