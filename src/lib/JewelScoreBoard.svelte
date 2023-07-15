<script lang="ts">
  import { jewelTypes, jewelTypeIsContrast } from "$lib";
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
            <div class="jewel" style:--jewel={jewelType} style:--shape={jewelType} />
          </td>
          <td>{jewelType + 1}</td>
        </tr>
      {/if}
    {/each}
  </tbody>
</table>
