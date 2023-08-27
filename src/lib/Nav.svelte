<script lang="ts">
  import { page } from "$app/stores";

  import { kebabCaseToHuman } from "$lib";

  export let sections: string[];

  let activeElm: HTMLSpanElement | null = null;

  $: activeSection = sections.indexOf($page.url.hash.slice(1));

  let activeSectionHeight: number = 0;
  $: activeSectionHeight = new Array(Math.max(activeSection, 0))
    .fill(0)
    .reduce(
      (acc, _, i) =>
        acc +
        16 +
        (document.getElementById(`${sections[i]}-nav-link`)?.clientHeight || 0),
      0
    );
  $: {
    if (activeElm) {
      console.debug(activeSectionHeightOld, activeSectionHeight);
      activeElm.animate(
        [
          {
            top: `${activeSectionHeightOld}px`,
          },
          {
            top: `${activeSectionHeight}px`,
          },
        ],
        {
          duration: 100,
          easing: "ease-in-out",
        }
      );
      activeSectionHeightOld = activeSectionHeight;
    }
  }

  let activeSectionHeightOld = activeSectionHeight;
</script>

<nav>
  <span
    class="active"
    style:--pos="{activeSectionHeight}px"
    bind:this={activeElm}>-</span
  >
  <ul>
    {#each sections as section}
      <li id="{section}-nav-link">
        <a href="#{section}">{kebabCaseToHuman(section)}</a>
      </li>
    {/each}
  </ul>
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
