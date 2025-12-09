import { expect, test } from "vitest";
import { getGuessedRowState } from "./get-guessed-row-state";

const testCases = [
  // correct
  { guess: "abcde", solution: "abcde", expected: ["correct", "correct", "correct", "correct", "correct"] },
  // all absent
  { guess: "zzzzz", solution: "abcde", expected: ["absent", "absent", "absent", "absent", "absent"] },
  // 1 letter absent
  { guess: "abcde", solution: "abcdz", expected: ["correct", "correct", "correct", "correct", "absent"] },
  { guess: "abcde", solution: "zbcde", expected: ["absent", "correct", "correct", "correct", "correct"] },
  // 1 absent, duplicate character
  { guess: "cbcde", solution: "abcde", expected: ["absent", "correct", "correct", "correct", "correct"] },
];

test.each(testCases)("it returns correct state with guess $guess against answer $solution", ({
  guess,
  solution,
  expected,
}) => {
  expect(getGuessedRowState(guess, solution)).toEqual(expected);
});
