<script>
  import { fade } from 'svelte/transition'
  import { storeFE } from './store.js'
  export let objAttributes = {}

  function removeComponent() {
    $storeFE = $storeFE.filter(function (value, index, arr) {
      if (value.id != objAttributes.id) return value
    })
    console.log($storeFE)
  }
</script>

<li transition:fade>
  {objAttributes.name} (id={objAttributes.id})
  {#if objAttributes.otherattrib}<em>{objAttributes.otherattrib}</em>{/if}
  <button on:click={removeComponent}>x</button>
</li>
