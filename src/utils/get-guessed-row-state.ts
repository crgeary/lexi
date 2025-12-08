import { VALID_WORD_LENGTH } from "../constants/index.js";
import type { CharState } from "../types/char.js";

export const getGuessedRowState = (guess: string, solution: string | null) => {
  const checked = Array.from({ length: 5 }).fill(false);
  const splitSolution = solution?.split("") ?? [];

  return guess.split("").reduce(
    (acc, curr, i) => {
      if (curr === splitSolution[i]) {
        acc[i] = "correct";
        checked[i] = true;
      } else if (splitSolution.includes(curr)) {
        const currCharIndex = splitSolution.findIndex((x, i2) => x === curr && !checked[i2]);
        if (currCharIndex > -1) {
          acc[i] = "present";
          checked[currCharIndex] = true;
        }
      }
      return acc;
    },
    Array.from({ length: VALID_WORD_LENGTH }).fill("absent") as CharState[],
  );
};
