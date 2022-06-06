<script lang="ts">
  import Item from './Item.svelte'
  import { storeFE, idIncrement } from './store'

  // these are our 'items' saved to our Svelte store

  $storeFE = [
    { id: 0, name: 'First option', otherattrib: 'additional note' },
    { id: 1, name: 'Second option' },
    { id: 2, name: 'Third option' }
    // other items can go here
  ]
  idIncrement.set(3) // this is a crude way to increment the id for new items
  function addItem() {
    var l = $storeFE.length // get our current items list count
    $storeFE[l] = { id: $idIncrement, name: 'Another option', otherattrib: 'additional note' }
    console.log($storeFE)
    $idIncrement++ // increment our id to add additional items
  }
</script>

<button on:click={addItem}>Add an item</button>

<ul>
  {#each $storeFE as item}
    <li><svelte:component this={Item} objAttributes={item} /></li>
  {/each}
</ul>
