import { dev } from "$app/environment";

import { error } from "@sveltejs/kit";

import {
  generateBoardEnsureNoMatches,
  BoardGenerationTooManyAttempts,
} from "$lib";

import type { Board } from "$lib";

import type { PageServerLoad } from "./$types";

const boardSize = 15;

export const load: PageServerLoad = ({ setHeaders }) => {
  let board: Board;
  let count: number;
  try {
    ({ board, count } = generateBoardEnsureNoMatches([boardSize], 50000));
  } catch (e) {
    if (e instanceof BoardGenerationTooManyAttempts) {
      throw error(500, "Board generation took to many iterations. Try again.");
    } else {
      throw e;
    }
  }

  if (dev) {
    setHeaders({
      "x-board-generation-count": count.toString(),
    });
  }

  return {
    board,
    boardGenerationCount: dev ? count : undefined,
  };
};
