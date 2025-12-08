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
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center gap-2">
            {hook.status !== "idle" && <p className="text-2xl text-zinc-200">{hook.status.toLocaleUpperCase()}</p>}
            <button type="button" className="block bg-blue-500 text-white p-2" onClick={() => hook.startGame()}>
              Play Game
            </button>
          </div>
        </div>
      )}
    </>
  );
};
