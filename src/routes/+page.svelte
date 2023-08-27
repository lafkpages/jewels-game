<script lang="ts">
  import { checkForMatches, collapseBoard, refillBoard, sum } from "$lib";

  import JewelScoreBoard from "$lib/JewelScoreBoard.svelte";

  import type { PageData } from "./$types";

  export let data: PageData;

  let board = data.board;

  let score = 0;

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

<main>
  <h1>Jewels Game</h1>

  <p>Score: {score}</p>

  <table>
    {#each board as row, rowIndex}
      <tr>
        {#each row as cell, cellIndex}
          <td>
            {#if typeof cell == "number"}
              <div
                class="jewel"
                style:--jewel={cell}
                style:--shape={cell}
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

  table,
  tr,
  td {
    border-spacing: 0px;
  }
</style>
