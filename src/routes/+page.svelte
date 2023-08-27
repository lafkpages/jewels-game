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
  <section>
    <h1>Jewels Game</h1>

    <p>Score: {score}</p>

    <Game bind:board />
  </section>

  <section>
    <h2>Scores per jewel</h2>

    <JewelScoreBoard />
  </section>
</main>

<style>
  main {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    scroll-behavior: smooth;
    scroll-snap-type: y mandatory;
  }

  section {
    width: 100%;
    height: 100vh;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    scroll-snap-align: start;
  }
</style>
