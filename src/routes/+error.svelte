<script lang="ts">
  import { page } from "$app/stores";

  import Game from "$lib/Game.svelte";
</script>

<main>
  <h1>{$page.status}: {$page.error?.message}</h1>

  <p><a href="/">Go home?</a></p>

  <Game size={5} />
</main>

<style>
  main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  h1 {
    width: 100%;
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
