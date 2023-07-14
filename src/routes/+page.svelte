<script lang="ts">
  import {
    generateBoard,
    checkForMatches,
    collapseBoard,
    refillBoard,
  } from "$lib";

  const boardSize = 10;
  let board = generateBoard(boardSize);

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

    // Only allow moving to adjacent cells
    if (
      Math.abs(rowFrom - rowTo) > 1 ||
      Math.abs(cellFrom - cellTo) > 1 ||
      (rowFrom === rowTo && cellFrom === cellTo)
    ) {
      return;
    }

    // Don't allow moving diagonally
    if (rowFrom !== rowTo && cellFrom !== cellTo) {
      return;
    }

    // Swap jewels
    const jewelFrom = board[rowFrom][cellFrom];
    board[rowFrom][cellFrom] = board[rowTo][cellTo];
    board[rowTo][cellTo] = jewelFrom;

    // Find matches, move down jewels, plus reactivity
    setTimeout(() => {
      let matches;
      ({ board, matches } = checkForMatches(board));

      setTimeout(() => {
        board = collapseBoard(board);

        setTimeout(() => {
          board = refillBoard(board);
        }, 200);
      }, 200);
    }, 200);
  }
</script>

<h1>Jewels Game</h1>

<table>
  {#each board as row, rowIndex}
    <tr>
      {#each row as cell, cellIndex}
        <td>
          {#if typeof cell == "number"}
            <div
              class="jewel"
              style:--jewel={cell}
              draggable="true"
              on:dragstart={onJewelDragStart}
              on:dragover={onJewelDragOver}
              on:drop={onJewelDrop}
              role="region"
              data-row={rowIndex}
              data-cell={cellIndex}
            />
          {/if}
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
    transition: ease-in-out 0.2s;
    transition-property: transform;
  }

  .jewel:focus-visible,
  .jewel:hover {
    transform: scale(1.1);
  }

  .jewel:active {
    cursor: grabbing;
  }
</style>
