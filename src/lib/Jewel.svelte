<script lang="ts">
  export let type: number;
  export let shape: number = type;

  export let row: number | null = null;
  export let cell: number | null = null;

  export let interactive = true;
</script>

<div
  class="jewel"
  style:--jewel={type}
  style:--shape={shape}
  draggable={interactive}
  on:dragstart
  on:dragover
  on:drop
  role="region"
  data-row={row}
  data-cell={cell}
/>
