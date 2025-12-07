import type { FC } from "react";
import { getGuessedRowState } from "../../utils/get-guessed-row-state.js";
import { Row } from "./row.component.js";

export type BoardProps = {
  solution: string;
  rows: number;
  guesses: string[];
  currentGuess: string;
};

export const Board: FC<BoardProps> = ({ solution, rows, guesses, currentGuess }) => {
  const board = Array.from({
    ...[
      ...guesses.map((letters) => {
        const states = getGuessedRowState(letters, solution);
        return letters.split("").map((char, i) => ({ children: char, state: states[i] }));
      }),
      currentGuess.split("").map((char) => ({ children: char })),
    ],
    length: rows,
  });
  return (
    <div className="h-full grid auto-rows-fr gap-1">
      {board.map((letters, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: ok
        <Row key={i} letters={letters} />
      ))}
    </div>
  );
};
