import { VALID_WORD_LENGTH } from "../constants/index.js";
import { acceptableWords, words } from "../data/words.js";

export const isValidWord = (word: string) => {
  if (word.length !== VALID_WORD_LENGTH) {
    return false;
  }

  return [...words, ...acceptableWords].includes(word.toLowerCase());
};
