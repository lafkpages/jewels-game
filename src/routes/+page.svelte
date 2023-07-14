<script lang="ts">
  import type { Board } from "$lib";

  const board: Board = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
</script>

<h1>Jewels Game</h1>

<table>
  {#each board as row}
    <tr>
      {#each row as cell}
        <td>
          <div class="jewel" style:--jewel={3} draggable="true" />
        </td>
      {/each}
    </tr>
  {/each}
</table>

<style>
  .jewel {
    --size: 32px;
    --scale: calc(var(--size) / 16);
    --jewel: 0;

    background: url("/jewels.png");
    background-position: calc(var(--scale) * -192)
      calc(var(--jewel) * (var(--size) * -1));
    background-size: calc(var(--scale) * 256);
    image-rendering: pixelated;
    width: var(--size);
    height: var(--size);
    cursor: grab;
  }

  .jewel:active {
    cursor: grabbing;
  }
</style>
