import type { emptyCell } from "$lib";

export type BoardCell = number | typeof emptyCell;

export type Board<T = BoardCell> = T[][];

export interface Match {
  length: number;
  jewelType: number;
};
