import { useEffect, useReducer } from "react";
import { useLocalStorage } from "usehooks-ts";

type StatisticsState = {
  meta: {
    version: string;
  };
  data: {
    winCount: number;
    lossCount: number;
    winsByGuessCount: Record<number, number | undefined>;
  };
};

type RecordGameResultInput = {
  status: "success" | "fail";
  guesses: number;
};

export type RecordGameResult = {
  type: "RecordGameResult";
  payload: {
    status: "success" | "fail";
    guesses: number;
  };
};

export type Clear = {
  type: "Clear";
};

export type Action = RecordGameResult | Clear;

function recordGameResultInternal(
  state: StatisticsState,
  { status, guesses }: RecordGameResult["payload"],
): StatisticsState {
  const s = structuredClone(state);

  // averageGuessCount

  if (status === "success") {
    s.data.winCount += 1;

    if (!(guesses in s.data.winsByGuessCount)) {
      s.data.winsByGuessCount[guesses] = 0;
    }
    // biome-ignore lint/style/noNonNullAssertion: ok
    s.data.winsByGuessCount[guesses]! += 1;
  } else if (status === "fail") {
    s.data.lossCount += 1;
  } else {
    throw new Error("unknown state");
  }

  return s;
}

function reducer(state: StatisticsState, action: Action): StatisticsState {
  switch (action.type) {
    case "RecordGameResult":
      return recordGameResultInternal(state, action.payload);
    case "Clear":
      return initialState;
    default:
      return state;
  }
}

const initialState: StatisticsState = {
  meta: {
    version: "1",
  },
  data: {
    winCount: 0,
    lossCount: 0,
    winsByGuessCount: {},
  },
};

export const useStatistics = () => {
  const [storedState, setStoredState] = useLocalStorage("lexi.v1", initialState);
  const [state, dispatch] = useReducer(reducer, storedState);

  useEffect(() => {
    setStoredState(state);
  }, [state, setStoredState]);

  const recordGameResult = (input: RecordGameResultInput) => {
    dispatch({
      type: "RecordGameResult",
      payload: {
        status: input.status,
        guesses: input.guesses,
      },
    });
  };

  const clear = () => {
    dispatch({
      type: "Clear",
    });
  };

  return {
    // Data
    ...state,

    recordGameResult,
    clear,
  };
};
