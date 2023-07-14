<script lang="ts">
  import type { Board } from "$lib";

  let board: Board = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];

  let boardElm: HTMLTableElement;

  function getJewelPos(jewel: HTMLElement) {
    return [
      parseInt(jewel.dataset.row ?? "0"),
      parseInt(jewel.dataset.cell ?? "0"),
    ];
  }

  function onJewelDragStart(e: DragEvent) {
    if (!e.dataTransfer) {
      return;
    }

    if (!(e.target instanceof HTMLElement)) {
      return;
    }

    const [row, cell] = getJewelPos(e.target);

    // Drag and drop data
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain;p=row", row.toString());
    e.dataTransfer.setData("text/plain;p=cell", cell.toString());
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

    if (!(e.target instanceof HTMLElement)) {
      return;
    }

    const rowFrom = parseInt(e.dataTransfer.getData("text/plain;p=row"));
    const cellFrom = parseInt(e.dataTransfer.getData("text/plain;p=cell"));

    const [rowTo, cellTo] = getJewelPos(e.target);

    // Swap jewels
    const jewelFrom = board[rowFrom][cellFrom];
    board[rowFrom][cellFrom] = board[rowTo][cellTo];
    board[rowTo][cellTo] = jewelFrom;

    // Reactivity
    board = board;
  }
</script>

<h1>Jewels Game</h1>

<table bind:this={boardElm}>
  {#each board as row, rowIndex}
    <tr>
      {#each row as cell, cellIndex}
        <td>
          <div
            class="jewel"
            style:--jewel={cell}
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
