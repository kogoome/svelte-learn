<script lang="ts">
  import { categories, categoryItems } from '../frontend/navItems'

	// 여긴 인덱스디비가 접근안돼는곳이다.
</script>

<svelte:head>
  <title>index page</title>
</svelte:head>

<div class="p-5">
  <h1>FEATURE LINK INDEX</h1>

  {#each categories as category}
    <h3>{category}</h3>
    {#each categoryItems[category] as item}
      <div>
        <a class="text-xl" href={item.link}>{item.title}</a>
      </div>
    {/each}
  {/each}
</div>
