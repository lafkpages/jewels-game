import { generateBoardEnsureNoMatches } from "$lib";

import type { PageServerLoad } from "./$types";

const boardSize = 15;

export const load: PageServerLoad = () => {
  const board = generateBoardEnsureNoMatches([boardSize], 50000);
  return {
    board,
  };
};
