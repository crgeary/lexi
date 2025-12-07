import type { FC } from "react";

import { VALID_WORD_LENGTH } from "../../constants/index.js";
import { Tile, type TileProps } from "./tile.component.js";

export type RowProps = {
  letters: Pick<TileProps, "children" | "state">[];
};

export const Row: FC<RowProps> = ({ letters }) => {
  return (
    <div className="grid grid-cols-5 h-11 gap-1">
      {Array.from({ ...letters, length: VALID_WORD_LENGTH }).map((letter, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: ok
        <Tile key={i} {...letter} />
      ))}
    </div>
  );
};
