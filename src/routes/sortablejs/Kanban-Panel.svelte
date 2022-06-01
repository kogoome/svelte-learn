<script lang="ts">
  import { fly, fade, slide, blur, scale, draw, crossfade } from 'svelte/transition'

  export let name: string
  export let index: string
  let expand = true
</script>

<div class="bg-slate-200 p-3 rounded-xl" on:click={() => (expand = !expand)}>
  <h3>
    <div contenteditable="false" class="text-sm" bind:textContent={index} />
    {name}
  </h3>
  {#if expand}
    <div class="bg-slate-300 rounded-lg shadow-inner" in:slide out:slide>
      <slot />
    </div>
  {/if}
</div>
