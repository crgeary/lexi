import { cx } from "class-variance-authority";
import type { FC, PropsWithChildren } from "react";
import type { CharState } from "../../types/char.js";

export type TileProps = PropsWithChildren<{
  state?: CharState;
}>;

export const Tile: FC<TileProps> = ({ children, state = "idle" }) => {
  return (
    <span
      className={cx("inline-flex items-center justify-center w-full h-full p-2", {
        "bg-green-500 text-green-50": "correct" === state,
        "bg-yellow-500 text-yellow-900": "present" === state,
        "bg-zinc-400 text-zinc-800": "absent" === state,
        "bg-zinc-600 text-zinc-100": "idle" === state,
      })}
    >
      {children && <span className="uppercase font-medium text-xl">{children}</span>}
    </span>
  );
};
