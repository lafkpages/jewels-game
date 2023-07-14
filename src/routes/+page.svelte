<script lang="ts">
  import type { Board } from "$lib";

  const board: Board = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  function onJewelDragStart(e: DragEvent) {
    if (!e.dataTransfer) {
      return;
    }

    if (!(e.target instanceof HTMLElement)) {
      return;
    }

    const row = e.target.dataset.row;
    const cell = e.target.dataset.cell;

    if (row === undefined || cell === undefined) {
      return;
    }

    // Drag and drop data
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain;p=row", row);
    e.dataTransfer.setData("text/plain;p=cell", cell);
  }

  function onJewelDragOver(e: DragEvent) {
    if (!e.dataTransfer) {
      return;
    }

    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  function onJewelDrop(e: DragEvent) {
    if (!e.dataTransfer) {
      return;
    }

    const row = parseInt(e.dataTransfer.getData("text/plain;p=row"));
    const cell = parseInt(e.dataTransfer.getData("text/plain;p=cell"));

    if (isNaN(row) || isNaN(cell)) {
      return;
    }

    console.log(row, cell, e.target);
  }
</script>

<h1>Jewels Game</h1>

<table>
  {#each board as row, rowIndex}
    <tr>
      {#each row as cell, cellIndex}
        <td>
          <div
            class="jewel"
            style:--jewel={rowIndex * 3 + cellIndex}
            draggable="true"
            on:dragstart={onJewelDragStart}
            on:dragover={onJewelDragOver}
            on:drop={onJewelDrop}
            role="cell"
            tabindex="0"
            data-row={rowIndex}
            data-cell={cellIndex}
          />
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
