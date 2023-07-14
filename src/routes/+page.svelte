<script lang="ts">
  import type { Board } from "$lib";

  const board: Board = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

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

    if (isNaN(rowFrom) || isNaN(cellFrom)) {
      return;
    }

    const [rowTo, cellTo] = getJewelPos(e.target);

    console.log(rowFrom, cellFrom, rowTo, cellTo);
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
