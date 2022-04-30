<script lang="ts">
  import {categories, categoryItems} from './navItems';
  import {page} from '$app/stores'
  $: currentLink = $page.url.pathname

  function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }
</script>

<nav>
  <ul class="flex flex-wrap list-none gap-6 items-center">
    {#each categories as category}
      <li class="font-bold transition-all duration-500">
        <div class="bg-[#52a7ec] rounded-2xl p-2 text-white">#{category} - </div>
      </li>
      {#each categoryItems[category] as item}
        <li class="font-bold hover:text-[#52a7ec] transition-all duration-500">
          <a class:active={currentLink === item.link} class="text-xl" href={item.link}>{item.title}</a>
        </li>
      {/each}
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