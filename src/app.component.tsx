import { useEffect, useState } from "react";
import { Board } from "./components/board/board.component.js";
import { Keyboard } from "./components/keyboard/keyboard.component.js";
import { getRandomWord } from "./utils/get-random-word.js";
import { MAX_GUESS_COUNT, VALID_WORD_LENGTH } from "./constants/index.js";
import { isValidWord } from "./utils/is-valid-word.js";
import type { GameState } from "./types/game.js";

export function App() {
  const [solution] = useState(getRandomWord());

  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [status, setStatus] = useState<GameState>("idle");

  const addGuess = () => {
    if (
      status === "success" ||
      status === "fail" ||
      guesses.length >= MAX_GUESS_COUNT ||
      guesses.includes(currentGuess) ||
      !isValidWord(currentGuess)
    ) {
      return;
    }
    setGuesses((v) => [...v, currentGuess]);
    setCurrentGuess("");
  };

  useEffect(() => {
    if (guesses.length === 0) {
      setStatus("idle");
    } else if (guesses.at(-1) === solution) {
      setStatus("success");
    } else if (guesses.length >= MAX_GUESS_COUNT && guesses.at(-1) !== solution) {
      setStatus("fail");
    } else {
      setStatus("playing");
    }
  }, [guesses, solution]);

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-1">
      <Board rows={MAX_GUESS_COUNT} solution={solution} guesses={guesses} currentGuess={currentGuess} />
      <Keyboard
        solution={solution}
        guesses={guesses}
        onChar={(char) => {
          if (currentGuess.length < VALID_WORD_LENGTH) {
            setCurrentGuess((guess) => `${guess}${char}`);
          }
        }}
        onEnter={() => addGuess()}
        onDelete={() => {
          setCurrentGuess((guess) => guess.substring(0, guess.length - 1));
        }}
      />
    </div>
  );
}
