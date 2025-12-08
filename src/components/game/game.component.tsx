import type { FC } from "react";
import { MAX_GUESS_COUNT } from "../../constants/index.js";
import { useGame } from "../../hooks/use-game.hook.js";
import { Board } from "../board/board.component.js";
import { Keyboard } from "../keyboard/keyboard.component.js";

export type GameProps = {};

export const Game: FC<GameProps> = () => {
  const hook = useGame();

  return (
    <>
      {hook.status === "success" && "SUCCESS"}
      {hook.status === "fail" && "FAIL"}
      {hook.status === "playing" ? (
        <div className="max-w-5xl mx-auto flex flex-col gap-1">
          <Board
            rows={MAX_GUESS_COUNT}
            solution={hook.solution}
            guesses={hook.guesses}
            currentGuess={hook.currentGuess}
          />
          <Keyboard
            solution={hook.solution}
            guesses={hook.guesses}
            onChar={(char) => hook.addChar(char)}
            onEnter={() => hook.submitGuess()}
            onDelete={() => hook.removeChar()}
          />
        </div>
      ) : (
        <button type="button" onClick={() => hook.startGame()}>
          Play Game
        </button>
      )}
    </>
  );
};
