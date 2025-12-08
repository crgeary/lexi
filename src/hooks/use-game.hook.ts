import { useReducer } from "react";
import type { Action } from "../types/actions.js";
import type { GameState } from "../types/game.js";
import { getRandomWord } from "../utils/get-random-word.js";
import { MAX_GUESS_COUNT, VALID_WORD_LENGTH } from "../constants/index.js";
import { Currency } from "lucide-react";

function startGame(state: GameState): GameState {
  const randomWord = getRandomWord();

  return {
    ...state,
    status: "playing",
    currentGuess: "",
    guesses: [],
    solution: randomWord,
  };
}

function addChar(state: GameState, char: string): GameState {
  if (state.currentGuess.length >= VALID_WORD_LENGTH) {
    return state;
  }

  return {
    ...state,
    currentGuess: `${state.currentGuess}${char}`,
  };
}

function removeChar(state: GameState): GameState {
  return {
    ...state,
    currentGuess:
      state.currentGuess.length > 0 ? `${state.currentGuess.substring(0, state.currentGuess.length - 1)}` : "",
  };
}

function submitGuess(state: GameState): GameState {
  if (state.guesses.length >= MAX_GUESS_COUNT || state.guesses.includes(state.currentGuess)) {
    return state;
  }

  const guesses = [...state.guesses, state.currentGuess];

  let status = state.status;

  if (state.currentGuess === state.solution) {
    status = "success";
  } else if (guesses.length >= MAX_GUESS_COUNT) {
    status = "fail";
  }

  return {
    ...state,
    currentGuess: "",
    guesses,
    status,
  };
}

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "StartGame":
      return startGame(state);
    case "AddChar":
      return addChar(state, action.payload.char);
    case "RemoveChar":
      return removeChar(state);
    case "SubmitGuess":
      return submitGuess(state);
    default:
      return state;
  }
}

const initialState: GameState = {
  status: "idle",
  currentGuess: "",
  guesses: [],
  solution: null,
};

export const useGame = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const startGame = () => {
    dispatch({
      type: "StartGame",
    });
  };

  const addChar = (char: string) => {
    dispatch({
      type: "AddChar",
      payload: {
        char,
      },
    });
  };

  const removeChar = () => {
    dispatch({
      type: "RemoveChar",
    });
  };

  const submitGuess = () => {
    dispatch({
      type: "SubmitGuess",
    });
  };

  return {
    // Data
    ...state,

    // Methods
    startGame,
    addChar,
    removeChar,
    submitGuess,
  };
};
