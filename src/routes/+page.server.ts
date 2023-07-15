import { generateBoardEnsureNoMatches } from "$lib";

import type { PageServerLoad } from "./$types";

const boardSize = 5;

export const load: PageServerLoad = () => {
  const board = generateBoardEnsureNoMatches([boardSize]);
  return {
    board,
  };
};