import { cx } from "class-variance-authority";
import type { ComponentPropsWithoutRef, FC } from "react";
import type { CharState } from "../../types/char";

export type KeyProps = ComponentPropsWithoutRef<"button"> & {
  state?: CharState;
};

export const Key: FC<KeyProps> = ({ children, className, state = "idle", ...props }) => {
  return (
    <button
      className={cx("p-3 uppercase font-medium cursor-pointer", className, {
        "bg-green-500 text-green-50": "correct" === state,
        "bg-yellow-500 text-yellow-900": "present" === state,
        "bg-zinc-600 text-zinc-800": "absent" === state,
        "bg-zinc-200 text-zinc-600": "idle" === state,
      })}
      {...props}
    >
      {children}
    </button>
  );
};
