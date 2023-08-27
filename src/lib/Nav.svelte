<script lang="ts">
  import { page } from "$app/stores";

  import { kebabCaseToHuman } from "$lib";

  export let sections: string[];

  $: activeSection = sections.indexOf($page.url.hash.slice(1));
  $: activeSectionHeight = new Array(Math.max(activeSection, 0))
    .fill(0)
    .reduce(
      (acc, _, i) =>
        acc +
        16 +
        (document.getElementById(`${sections[i]}-nav-link`)?.clientHeight || 0),
      0
    );
</script>

<nav>
  {#key $page.url.hash}
    <span class="active" style:--pos="{activeSectionHeight}px">-</span>
    <ul>
      {#each sections as section}
        <li id="{section}-nav-link">
          <a href="#{section}">{kebabCaseToHuman(section)}</a>
        </li>
      {/each}
    </ul>
  {/key}
</nav>

<style>
  nav {
    position: fixed;
    top: 32px;
    left: 32px;
    bottom: 32px;
  }

  nav ul {
    list-style-type: none;
    padding: 0px;
    margin: 0px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  nav .active {
    position: absolute;
    top: var(--pos);
    left: -24px;
  }
</style>
