<script lang="ts">
  import { onMount } from 'svelte'
  import Sortable from 'sortablejs'
  import Panel from './list-panel.svelte'

  // TODO 솔트시 데이터 변경을 해보자.

  type Containers = {
    [key: string]: HTMLElement
  }
  let containersObj: Containers = {}

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
    <Panel name="wod">1</Panel>
    <Panel name="foo">2</Panel>
    <Panel name="foo">3</Panel>
  </div>

  <div
    bind:this={containersObj.bar}
    class="bg-slate-100 rounded-2xl shadow-md flex flex-col gap-2 p-2"
  >
    <Panel name="bar">1</Panel>
    <Panel name="bar">2</Panel>
    <Panel name="bar">3</Panel>
    <Panel name="bar">4</Panel>
  </div>

  <div
    bind:this={containersObj.baz}
    class="bg-slate-100 rounded-2xl shadow-md flex flex-col gap-2 p-2"
  >
    <Panel name="baz">Contents</Panel>
    <Panel name="baz">Contents</Panel>
    <Panel name="baz">Contents</Panel>
    <Panel name="baz">Contents</Panel>
  </div>
</div>
