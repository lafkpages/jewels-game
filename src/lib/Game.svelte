<script lang="ts">
  import Jewel from "$lib/Jewel.svelte";

  import {
    checkForMatches,
    collapseBoard,
    generateBoard,
    refillBoard,
    sum,
  } from "$lib";
  import type { Board } from "$lib";

  export let size: number = 0;
  export let board: Board = generateBoard(size);

  export let score = 0;

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
    matchJewels();
  }

  function matchJewels() {
    setTimeout(() => {
      let matches;
      ({ board, matches } = checkForMatches(board));

      if (!matches.length) {
        return;
      }

      score += sum(matches.map((m) => m.length * (m.jewelType + 1)));

      setTimeout(() => {
        board = collapseBoard(board);

        setTimeout(() => {
          board = refillBoard(board);

          matchJewels();
        }, 200);
      }, 200);
    }, 200);
  }
</script>

<table>
  {#each board as row, rowIndex}
    <tr>
      {#each row as cell, cellIndex}
        <td>
          {#if typeof cell == "number"}
            <Jewel
              type={cell}
              row={rowIndex}
              cell={cellIndex}
              on:dragstart={onJewelDragStart}
              on:dragover={onJewelDragOver}
              on:drop={onJewelDrop}
            />
          {/if}
        </td>
      {/each}
    </tr>
  {/each}
</table>

<style>
  table,
  tr,
  td {
    border-spacing: 0px;
  }
</style>
