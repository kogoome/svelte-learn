<script lang="ts">
  import { fly, fade, slide, blur, scale, draw, crossfade } from 'svelte/transition'

  export let name: string
  let expand = true
</script>

<div class="bg-slate-200 p-3 rounded-xl" on:click={() => (expand = !expand)}>
  <h3>{name}</h3>
  {#if expand}
    <div class="bg-slate-300 rounded-lg" in:slide out:slide>
      <slot />
    </div>
  {/if}
</div>
