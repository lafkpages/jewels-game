<script lang="ts">
  import { browser, dev } from "$app/environment";
  import { page } from "$app/stores";

  import { onMount, onDestroy, tick } from "svelte";

  import { kebabCaseToHuman } from "$lib";

  export let sections: string[];
  export let gap = 16;

  export let scrollElm = browser ? document.documentElement : null;

  let activeElm: HTMLSpanElement | null = null;

  $: activeSection = sections.indexOf($page.url.hash.slice(1));

  let activeSectionHeight: number = 0;
  $: activeSectionHeight = new Array(Math.max(activeSection, 0))
    .fill(0)
    .reduce(
      (acc, _, i) =>
        acc +
        gap +
        (document.getElementById(`${sections[i]}-nav-link`)?.clientHeight || 0),
      0
    );

  $: {
    if (activeElm) {
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

  onMount(async () => {
    await tick();

    if (!scrollElm) {
      if (dev) {
        console.warn("<Nav> was created without a scrollElm");
      }
      return;
    }

    scrollElm.addEventListener("scroll", onScroll);
  });
  onDestroy(() => {
    scrollElm?.removeEventListener("scroll", onScroll);
  });

  function onScroll() {
    if (!scrollElm) {
      return;
    }

    activeSection = Math.floor(scrollElm.scrollTop / window.innerHeight);
  }
</script>

<nav>
  <span
    class="active"
    style:--pos="{activeSectionHeight}px"
    bind:this={activeElm}>-</span
  >
  <ul style:--gap="{gap}px">
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
  }

  nav ul {
    list-style-type: none;
    padding: 0px;
    margin: 0px;
    display: flex;
    flex-direction: column;
    gap: var(--gap);
  }

  nav .active {
    position: absolute;
    top: var(--pos);
    left: -24px;
  }
</style>
