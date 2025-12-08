export type StartGame = {
  type: "StartGame";
};

export type AddChar = {
  type: "AddChar";
  payload: {
    char: string;
  };
};

export type RemoveChar = {
  type: "RemoveChar";
};

export type SubmitGuess = {
  type: "SubmitGuess";
};

export type Action = StartGame | AddChar | RemoveChar | SubmitGuess;
