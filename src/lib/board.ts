import type { Board } from "$lib";

export const jewelTypes = 11;

export const emptyCell = null;

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

export function checkForMatches(board: Board) {
  // Look for matches, horizontally and vertically
  // Matches must be of at least three equal jewels

  // Horizontal matches
  for (let i = 0; i < board.length; i++) {
    let matchLength = 1;
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] === board[i][j + 1]) {
        matchLength++;
      } else {
        if (matchLength >= 3) {
          // Match found, mark it
          for (let k = 0; k < matchLength; k++) {
            board[i][j - k] = emptyCell;
          }
        }
        matchLength = 1;
      }
    }
  }

  // Vertical matches
  for (let j = 0; j < board.length; j++) {
    let matchLength = 1;
    for (let i = 0; i < board.length; i++) {
      if (board[i][j] === board[i + 1]?.[j]) {
        matchLength++;
      } else {
        if (matchLength >= 3) {
          // Match found, mark it
          for (let k = 0; k < matchLength; k++) {
            board[i - k][j] = emptyCell;
          }
        }
        matchLength = 1;
      }
    }
  }

  return board;
}

export function collapseBoard(board: Board) {
  // Collapse the board, moving jewels down

  for (let j = 0; j < board.length; j++) {
    let shift = 0;
    for (let i = board.length - 1; i >= 0; i--) {
      if (board[i][j] === emptyCell) {
        shift++;
      } else if (shift) {
        board[i + shift][j] = board[i][j];
        board[i][j] = emptyCell;
      }
    }
  }

  return board;
}
