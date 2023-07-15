<script lang="ts">
  import { jewelTypes } from "$lib";
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
      <tr>
        <td>
          <div class="jewel" style:--jewel={jewelType} />
        </td>
        <td>{jewelType + 1}</td>
      </tr>
    {/each}
  </tbody>
</table>
