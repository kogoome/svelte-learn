<script>
  import {navItems} from '../frontend/navItems';
</script>

<svelte:head>
  <title> index page </title>
</svelte:head>

<div class="p-5">
  <h1>FEATURE LINK INDEX</h1>
  
  <h3>Tailwind</h3>
  {#each navItems as item}
    {#if item.title.includes("tailwindcss")}
      <div>
        <a class="text-xl" href={item.link}>{item.title.replace("tailwindcss/","")}</a>
      </div>
    {/if}
  {/each}
  <h3>Svelte</h3>
  <h3>Sveltekit</h3>
</div>