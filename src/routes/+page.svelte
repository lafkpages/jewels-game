<script lang="ts">
  import Game from "$lib/Game.svelte";
  import JewelScoreBoard from "$lib/JewelScoreBoard.svelte";
  import Nav from "$lib/Nav.svelte";

  import type { PageData } from "./$types";

  export let data: PageData;

  if (data.boardGenerationCount) {
    console.debug(
      "generateBoardEnsureNoMatches took",
      data.boardGenerationCount,
      "tries"
    );
  }

  let mainElm: HTMLElement | null = null;

  let board = data.board;

  let score = 0;
</script>

<main bind:this={mainElm}>
  <Nav
    scrollElm={mainElm}
    sections={["game", "instructions", "scores-per-jewel"]}
  />

  <section id="game">
    <h1>Jewels Game</h1>

    <p>Score: {score}</p>

    <Game bind:board bind:score />
  </section>

  <section id="instructions">
    <h2>Instructions</h2>
    <p>
      Drag and drop a jewel to swap it with another, and match three or more
      jewels in a line to destroy them! The more you destroy, the more points
      you get.
    </p>
  </section>

  <section id="scores-per-jewel">
    <h2>Scores per jewel</h2>

    <JewelScoreBoard />
  </section>
</main>

<style>
  main {
    width: 100%;
    height: 100%;
    padding: 32px;
    box-sizing: border-box;
    overflow-y: scroll;
    scroll-behavior: smooth;
    scroll-snap-type: y mandatory;
  }

  section {
    width: 100%;
    max-width: 1000px;
    margin: auto;
    height: 100vh;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    scroll-snap-align: start;
  }
</style>
