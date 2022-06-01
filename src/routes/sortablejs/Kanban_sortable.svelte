<script lang="ts">
  import { onMount } from 'svelte'
  import Sortable from 'sortablejs'
  import Panel from './Kanban-Panel.svelte'

  // TODO 솔트시 데이터 변경을 해보자.

  type Containers = {
    [key: string]: HTMLElement
  }
  let stepList = ['Todo', 'Process', 'Complete']
  let containersObj: Containers = {}

  onMount(async function () {
    Object.keys(containersObj).forEach((container) => {
      Sortable.create(containersObj[container], {
        group: {
          name: container,
          put: true
        },
        animation: 200,
        onChange: (e: any) => {
          // 현재 컨테이너 인덱스 정렬
          const sortableListTo = e.to.children
          let iTarget = sortableListTo.length - 1
          for (let child of sortableListTo) {
            child.firstChild.firstChild.textContent = iTarget
            iTarget--
          }
        },
        onEnd: (e: any) => {
          // 이전 컨테이너 인덱스 정렬
          const sortableListTarget = e.target.children
          let iTo = sortableListTarget.length - 1
          for (let child of sortableListTarget) {
            child.firstChild.firstChild.textContent = iTo
            iTo--
          }
          // 거치는 컨테이너 정렬 로직이 없음.
          // srcELement랑 target 이랑 차이가 안보임.
        }
      })
    })
  })
  $: index = '4'
  $: console.log(index)
</script>

<div class="flex gap-3 bg-slate-200 p-1 rounded-3xl shadow-md">
  {#each stepList as step}
    <div
      class="basis-1/3 bg-slate-100 rounded-2xl shadow-inner drop-shadow-lg flex flex-col gap-2 p-2"
    >
      <h1 class="bg-white flex justify-center">{step}</h1>
      <div bind:this={containersObj[step]} class="flex flex-col gap-2">
        <Panel name="today" {index}>task...</Panel>
        <Panel name="0.0.z" index="3">task...</Panel>
        <Panel name="0.y.0" index="2">task...</Panel>
        <Panel name="x.0.0" index="1">task...</Panel>
        <Panel name="philosophy" index="0">task...</Panel>
      </div>
    </div>
  {/each}
</div>
