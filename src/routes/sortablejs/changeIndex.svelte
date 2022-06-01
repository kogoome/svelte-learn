<script lang="ts">
  import { onMount } from 'svelte'
  import Sortable from 'sortablejs'

  let container: HTMLElement
  onMount(() => {
    Sortable.create(container, {
      group: {
        name: 'foo',
        put: true
      },
      animation: 200,
      onChange: (e: any) => {
        const sortableList = e.target.children
        let i = sortableList.length - 1
        for (let child of sortableList) {
          child.firstChild.textContent = i
          i--
        }
      }
    })
  })
</script>

<div bind:this={container} class="flex flex-col gap-1 p-2 bg-slate-100">
  <div class="bg-slate-200 rounded-lg flex">
    <div>4</div>
    first
  </div>
  <div class="bg-slate-200 rounded-lg flex">
    <div>3</div>
    second
  </div>
  <div class="bg-slate-200 rounded-lg flex">
    <div>2</div>
    third
  </div>
  <div class="bg-slate-200 rounded-lg flex">
    <div>1</div>
    fourth
  </div>
  <div class="bg-slate-200 rounded-lg flex">
    <div>0</div>
    fifth
  </div>
</div>
