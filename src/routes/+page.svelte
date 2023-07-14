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
          <div class="jewel" style:--jewel={3} />
        </td>
      {/each}
    </tr>
  {/each}
</table>

<style>
  tr {
    height: 16px;
  }

  .jewel {
    background: url("/jewels.png") -192px calc(var(--jewel) * -16px);
    width: 16px;
    height: 16px;
  }
</style>
