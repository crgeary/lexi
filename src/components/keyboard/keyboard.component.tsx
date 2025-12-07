import { Delete } from "lucide-react";
import { type FC, useEffect } from "react";
import { getKeyboardState } from "../../utils/get-keyboard-state.js";
import { Key } from "./key.component.js";

export type KeyboardProps = {
  solution: string;
  guesses: string[];

  onChar: (char: string) => void;
  onEnter: () => void;
  onDelete: () => void;
};

export const Keyboard: FC<KeyboardProps> = ({ solution, guesses, onChar, onEnter, onDelete }) => {
  const states = getKeyboardState(guesses, solution);

  useEffect(() => {
    const handler = ({ key }: KeyboardEvent) => {
      if (key === "Enter") {
        onEnter();
      } else if (key === "Backspace") {
        onDelete();
      } else {
        if (key.length === 1 && key.toLowerCase() >= "a" && key.toUpperCase() <= "z") {
          onChar(key);
        }
      }
    };
    window.addEventListener("keyup", handler);
    return () => {
      window.removeEventListener("keyup", handler);
    };
  });

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-center gap-1">
        {`qwertyuiop`.split("").map((key) => (
          <Key
            key={key}
            state={states[key]}
            className="grow shrink basis-0"
            onTouchStart={() => window?.navigator?.vibrate?.(75)}
            onClick={() => onChar(key)}
            data-testid={`key-${key}`}
          >
            {key}
          </Key>
        ))}
      </div>
      <div className="flex justify-center gap-1">
        {`asdfghjkl`.split("").map((key) => (
          <Key
            key={key}
            state={states[key]}
            className="grow shrink basis-0"
            onTouchStart={() => window?.navigator?.vibrate?.(75)}
            onClick={() => onChar(key)}
          >
            {key}
          </Key>
        ))}
      </div>
      <div className="flex justify-center gap-1">
        <Key
          className="flex-grow-1.5 shrink basis-0"
          onTouchStart={() => window?.navigator?.vibrate?.(75)}
          onClick={() => onEnter()}
          data-testid="key-enter"
        >
          <span className="text-xs">Enter</span>
          <span className="sr-only">Enter</span>
        </Key>
        {`zxcvbnm`.split("").map((key) => (
          <Key
            key={key}
            state={states[key]}
            className="grow shrink basis-0"
            onTouchStart={() => window?.navigator?.vibrate?.(75)}
            onClick={() => onChar(key)}
          >
            {key}
          </Key>
        ))}
        <Key
          className="grow-1.5 shrink basis-0"
          onTouchStart={() => window?.navigator?.vibrate?.(75)}
          onClick={() => onDelete()}
          data-testid="key-delete"
        >
          <Delete className="w-5 h-5" />
          <span className="sr-only">Delete</span>
        </Key>
      </div>
    </div>
  );
};
