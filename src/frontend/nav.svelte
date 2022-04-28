<script lang="ts">
  import type { navItem } from "../frontend/navItems";
  export let navItems : Array<navItem>
  import {page} from '$app/stores'
  $: currentLink = $page.url.pathname
</script>

<nav>
  <ul class="flex flex-wrap list-none gap-6">
    {#each navItems as navItem}
      <li class="font-bold hover:text-[#52a7ec] transition-all duration-500">
        <a class:active={currentLink === navItem.link} class="text-xl" href={navItem.link}>{navItem.title}</a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  .active {
    text-decoration: underline;
		font-size: 1.25rem;
		font-weight: bold;
    color: #52a7ec;
		/* transition: all 0.5s;  */
  }
</style>