<script lang="ts">
  import { onMount } from 'svelte'
  import Sortable from 'sortablejs'
  import { liveQuery, type Observable } from 'dexie'
  import { db, type Kanban } from './db'
  import { fly, fade, slide, blur, scale, draw, crossfade } from 'svelte/transition'
  $: Todo = liveQuery(() => db.Todo.reverse().toArray())
  $: Process = liveQuery(() => db.Process.reverse().toArray())
  $: Complete = liveQuery(() => db.Complete.reverse().toArray())
  

  // sortable 에 정보를 로드해보자.

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
  let expand = true
</script>

{#if $Todo || $Process || $Complete}
  <div class="flex gap-3 bg-slate-200 p-1 m-10 rounded-3xl shadow-md" transition:blur>
    {#each stepList as step}
      <!-- step box -->
      <div
        class="basis-1/3 bg-slate-100 rounded-2xl shadow-inner drop-shadow-lg flex flex-col gap-2 pt-2 pb-6"
      >
        <h1 class="bg-white flex justify-center">{step}</h1>
        <!-- task box -->
        <div bind:this={containersObj[step]} class="flex flex-col gap-2 px-2">
          <div class="bg-slate-200 p-2 rounded-xl" on:click={() => (expand = !expand)}>
            <h3>
              <div contenteditable="false" class="text-sm" bind:textContent={index} />
              name
            </h3>
            {#if expand}
              <div class="bg-slate-300 rounded-lg shadow-inner" transition:blur>data</div>
            {/if}
          </div>
        </div>
      </div>
    {/each}
  </div>
{/if}
