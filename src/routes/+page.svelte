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
        <td>{cell}</td>
      {/each}
    </tr>
  {/each}
</table>
