export type GameStatus = "idle" | "playing" | "fail" | "success";

export type GameState = {
  status: GameStatus;
  solution: string | null;
  currentGuess: string;
  guesses: string[];
};
