<script lang="ts">
  import { page } from "$app/stores";

  import Game from "$lib/Game.svelte";
  import JewelScoreBoard from "$lib/JewelScoreBoard.svelte";

  import { kebabCaseToHuman } from "$lib";

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

  const navSections = ["game", "instructions", "scores-per-jewel"];
  $: navActiveSection = navSections.indexOf($page.url.hash.slice(1));
  $: navActiveSectionHeight = new Array(navActiveSection)
    .fill(0)
    .reduce(
      (acc, _, i) =>
        acc +
        16 +
        (document.getElementById(`${navSections[i]}-nav-link`)?.clientHeight ||
          0),
      0
    );
</script>

<main>
  <nav>
    {#key $page.url.hash}
      <span class="active" style:--pos="{navActiveSectionHeight}px">-</span>
      <ul>
        {#each navSections as section}
          <li id="{section}-nav-link">
            <a href="#{section}">{kebabCaseToHuman(section)}</a>
          </li>
        {/each}
      </ul>
    {/key}
  </nav>

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

  nav {
    position: fixed;
    top: 32px;
    left: 32px;
    bottom: 32px;
  }

  nav ul {
    list-style-type: none;
    padding: 0px;
    margin: 0px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  nav .active {
    position: absolute;
    top: var(--pos);
    left: -24px;
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
