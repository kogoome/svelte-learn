<script>
  import { dNd } from 'src/routes/vanillajs/dnd'
  import { onMount } from 'svelte'
  let arr = ['🦊', '🐸', '🐶', '🐱', '🥞', '🥣']
  // onMount(() => {
  //   dNd()
  // })
  function onDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id)

    event.currentTarget.style.backgroundColor = 'yellow'
  }
  function onDragOver(event) {
    event.preventDefault()
  }
  function onDrop(event) {
    const id = event.dataTransfer.getData('text')

    const draggableElement = document.getElementById(id)
    const dropzone = event.target

    dropzone.appendChild(draggableElement)

    event.dataTransfer.clearData()
  }
</script>

<div class="container flex flex-col">
  <div id="draggableOne" draggable="true" on:dragstart={onDragStart}>🍉</div>
  {#each arr as item}
    <div
      contenteditable="false"
      draggable="true"
      on:dragstart={onDragStart}
      on:dragover={onDragOver}
      on:drop={onDrop}
      bind:textContent={item}
    />
  {/each}
</div>
{JSON.stringify(arr)}
