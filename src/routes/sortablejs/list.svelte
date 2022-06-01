<script lang="ts">
  import { onMount } from 'svelte'
  import Sortable from 'sortablejs'
  import Panel from './Panel.svelte'

  type Containers = {
    [key: string]: HTMLElement
  }
  let foo, bar, baz
  let containersObj: Containers = {
    foo,
    bar,
    baz
  }

  onMount(async function () {
    Object.keys(containersObj).forEach((container) => {
      Sortable.create(containersObj[container], {
        group: {
          name: container,
          put: true
        },
        animation: 200
      })
    })
  })
</script>

<div class="flex gap-5 bg-slate-100 p-1 rounded-3xl ">
  <div
    bind:this={containersObj.foo}
    class="bg-slate-100 rounded-2xl shadow-md flex flex-col gap-1 p-2"
  >
    <Panel name="foo 1">Contents</Panel>
    <Panel name="foo 2">Contents</Panel>
    <Panel name="foo 3">Contents</Panel>
  </div>

  <div
    bind:this={containersObj.bar}
    class="bg-slate-100 rounded-2xl shadow-md flex flex-col gap-2 p-2"
  >
    <Panel name="bar 1">Contents</Panel>
    <Panel name="bar 2">Contents</Panel>
    <Panel name="bar 3">Contents</Panel>
    <Panel name="bar 4">Contents</Panel>
  </div>

  <div
    bind:this={containersObj.baz}
    class="bg-slate-100 rounded-2xl shadow-md flex flex-col gap-2 p-2"
  >
    <Panel name="baz 1">Contents</Panel>
    <Panel name="baz 2">Contents</Panel>
    <Panel name="baz 3">Contents</Panel>
    <Panel name="baz 5">Contents</Panel>
  </div>
</div>
