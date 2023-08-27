<script lang="ts">
  import { page } from "$app/stores";
</script>

<main>
  <h1>{$page.status}: {$page.error?.message}</h1>
</main>

<style>
  main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
