import { dev } from "$app/environment";

import { generateBoardEnsureNoMatches } from "$lib";

import type { PageServerLoad } from "./$types";

const boardSize = 15;

export const load: PageServerLoad = ({ setHeaders }) => {
  const { board, count } = generateBoardEnsureNoMatches([boardSize], 50000);

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
