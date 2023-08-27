<script lang="ts">
  import { jewelTypes, jewelTypeIsContrast } from "$lib";

  import Jewel from "$lib/Jewel.svelte";
</script>

<table>
  <thead>
    <tr>
      <th>Jewel</th>
      <th>Score</th>
    </tr>
  </thead>
  <tbody>
    {#each { length: jewelTypes } as _, jewelType}
      {#if jewelTypeIsContrast(jewelType)}
        <tr>
          <td>
            <Jewel type={jewelType} interactive={false} />
          </td>
          <td>{jewelType + 1}</td>
        </tr>
      {/if}
    {/each}
  </tbody>
</table>
