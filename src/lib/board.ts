import type { Board, Match } from "$lib";

export const jewelTypes = 11;
export const jewelShapes = 16;

export const emptyCell = null;

export function jewelTypeIsContrast(jewelType: number) {
  return jewelType % 2 === 0;
}

export function generateBoard(size: number, contrast = true): Board {
  const board: Board = [];
  for (let i = 0; i < size; i++) {
    board.push([]);
    for (let j = 0; j < size; j++) {
      let jewelType = Math.floor(Math.random() * jewelTypes);
      if (contrast) {
        while (!jewelTypeIsContrast(jewelType)) {
          jewelType = Math.floor(Math.random() * jewelTypes);
        }
      }

      board[i].push(jewelType);
    }
  }
  return board;
}

export function generateBoardEnsureNoMatches(
  boardOptions: Parameters<typeof generateBoard>,
  limit = 1000
) {
  let board = generateBoard(...boardOptions);
  let matches = checkForMatches(board).matches;
  let count = 0;
  while (matches.length) {
    board = generateBoard(...boardOptions);
    matches = checkForMatches(board).matches;
    count++;

    if (count > limit) {
      throw new Error("generateBoardEnsureNoMatches: too many attempts");
    }
  }
  return board;
}

export function checkForMatches(board: Board) {
  // Look for matches, horizontally and vertically
  // Matches must be of at least three equal jewels

  // Keep track of the matches found,
  // so we can give the player points for them
  const matches: Match[] = [];

  // Horizontal matches
  for (let i = 0; i < board.length; i++) {
    let matchLength = 1;
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] === board[i][j + 1]) {
        matchLength++;
      } else {
        if (matchLength >= 3) {
          let jewelType = board[i][j];

          if (jewelType === emptyCell) {
            // If the match includes an empty cell,
            // then it's not a match
            matchLength = 1;
            continue;
          }

          // Match found, mark it
          for (let k = 0; k < matchLength; k++) {
            board[i][j - k] = emptyCell;
          }

          // Keep track of the matches found
          matches.push({
            length: matchLength,
            jewelType,
          });
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
          let jewelType = board[i][j];

          if (jewelType === emptyCell) {
            // If the match includes an empty cell,
            // then it's not a match
            matchLength = 1;
            continue;
          }

          // Match found, mark it
          for (let k = 0; k < matchLength; k++) {
            board[i - k][j] = emptyCell;
          }

          // Keep track of the matches found
          matches.push({
            length: matchLength,
            jewelType,
          });
        }

        matchLength = 1;
      }
    }
  }

  return {
    matches,
    board,
  };
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

export function refillBoard(board: Board, contrast = true) {
  // Refill the board, adding new jewels to the top

  for (let j = 0; j < board.length; j++) {
    for (let i = 0; i < board.length && board[i][j] === emptyCell; i++) {
      let jewelType = Math.floor(Math.random() * jewelTypes);
      if (contrast) {
        while (!jewelTypeIsContrast(jewelType)) {
          jewelType = Math.floor(Math.random() * jewelTypes);
        }
      }

      board[i][j] = jewelType;
    }
  }

  return board;
}
