<script lang="ts">
  import Game from "$lib/Game.svelte";
  import JewelScoreBoard from "$lib/JewelScoreBoard.svelte";

  import type { PageData } from "./$types";

  export let data: PageData;

  if (data.boardGenerationCount) {
    console.debug(
      "generateBoardEnsureNoMatches took",
      data.boardGenerationCount,
      "tries"
    );
  }

  let board = data.board;

  let score = 0;
</script>

<main>
  <h1>Jewels Game</h1>

  <p>Score: {score}</p>

  <Game bind:board />

  <h2>Scores per jewel</h2>

  <JewelScoreBoard />
</main>

<style>
  main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
