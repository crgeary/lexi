import { VALID_WORD_LENGTH } from "../constants/index.js";
import type { CharState } from "../types/char.js";

export const getGuessedRowState = (guess: string, solution: string | null) => {
  const state: CharState[] = [];
  const splitSolution = solution?.split("") ?? [];
  const splitGuess = guess.split("");

  const checked = new Array(VALID_WORD_LENGTH).fill(false);

  for (let i = 0; i < VALID_WORD_LENGTH; i++) {
    if (splitGuess[i] === splitSolution[i]) {
      state[i] = "correct";
      checked[i] = true;
    }
  }

  for (let i = 0; i < VALID_WORD_LENGTH; i++) {
    if (state[i]) continue;

    const letter = splitGuess[i];
    let foundIndex = -1;

    for (let j = 0; j < VALID_WORD_LENGTH; j++) {
      if (!checked[j] && splitSolution[j] === letter) {
        foundIndex = j;
        break;
      }
    }

    if (foundIndex !== -1) {
      state[i] = "present";
      checked[foundIndex] = true;
    } else {
      state[i] = "absent";
    }
  }

  return state;
};
