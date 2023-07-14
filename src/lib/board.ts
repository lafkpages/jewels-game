import type { Board } from "$lib";

export const jewelTypes = 11;

export function generateBoard(size: number): Board {
  const board: Board = [];
  for (let i = 0; i < size; i++) {
    board.push([]);
    for (let j = 0; j < size; j++) {
      board[i].push(Math.floor(Math.random() * jewelTypes));
    }
  }
  return board;
}
