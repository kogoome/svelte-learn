<script lang="ts">
  import { kanbanDb as k, bgColor } from './kanbanTempData'
  import { clockSwitch } from './kanbanMethod'
  import { onMount } from 'svelte'
  import { cloneDeep } from 'lodash-es'
  const kanban = cloneDeep(k)
  onMount(() => {
    const todo = document.querySelector('#Todo')
    todo?.firstChild?.addEventListener('click', clockSwitch)
  })
</script>

<!-- <button on:click={read}>read</button> -->
<h1 class="text-center">TODO 업무 진행용 칸반 제작</h1>
반응 테스트

<div class="flex rounded-xl bg-slate-200 p-3 m-3 justify-between gap-3">
  <div class="basis-1/3 w-full bg-slate-300 rounded-md pb-8" style="display:none;" id="clock">
    <h1 class="text-center bg-white" on:click={clockSwitch}>clock</h1>
    <div class="px-3 todayWork">
      <input id="clockWork" type="checkbox" class="hidden peer" checked />
      <label for="clockWork"><h1>todayWork</h1></label>
      <ul
        class="h-0 -translate-y-3 opacity-0 overflow-hidden peer-checked:h-fit peer-checked:opacity-100 peer-checked:transform-none transition-all duration-300"
      >
        {#each kanban.Todo[0].list as task}
          <div>{task}</div>
        {/each}
      </ul>
    </div>
    <div>
      <div class="bg-red-500 w-full rounded-2xl px-3">clock</div>
    </div>
  </div>
  {#each Object.keys(kanban) as key}
    <!-- key : todo, process, complete -->
    <div class="basis-1/3 w-full {bgColor[key]} rounded-md pb-8" id={key}>
      <!-- 클릭이벤트는 마운트 할때 커스텀입력하게 만들것 -->
      <h1 class="text-center bg-white">{key}</h1>
      {#each kanban[key] as item}
        <!-- item : title, list -->
        <div class="px-3 {item.title}">
          <input id={item.title} type="checkbox" class="hidden peer" checked />
          <label for={item.title}><h1>{item.title}</h1></label>
          <ul
            class="h-0 -translate-y-3 opacity-0 overflow-hidden peer-checked:h-fit peer-checked:opacity-100 peer-checked:transform-none transition-all duration-300"
          >
            {#if item.title == 'todayWork'}
              <div class="flex">
                <input class="bg-white w-full rounded-md" />
                <button class="btn btn-ghost btn-sm">add</button>
              </div>
            {/if}
            {#each item.list as task}
              <div contenteditable="true">{task}</div>
            {/each}
          </ul>
        </div>
      {/each}
      <!-- <div class="px-3">
        <input id="0.0.z" type="checkbox" class="hidden peer" checked />
        <label for="0.0.z"><h1>0.0.z</h1></label>
        <ul
          class="h-0 -translate-y-3 opacity-0 overflow-hidden peer-checked:h-fit peer-checked:opacity-100 peer-checked:transform-none transition-all duration-300"
        >
          <li>1. make highquality education share platform</li>
          <li>2. structured knowledge make knowledge relation freely</li>
          <li>3. education out of the world</li>
        </ul>
      </div>
      <div class="px-3">
        <input id="0.y.0" type="checkbox" class="hidden peer" checked />
        <label for="0.y.0"><h1>0.y.0</h1></label>
        <ul
          class="h-0 -translate-y-3 opacity-0 overflow-hidden peer-checked:h-fit peer-checked:opacity-100 peer-checked:transform-none transition-all duration-300"
        >
          <li>1. make highquality education share platform</li>
          <li>2. structured knowledge make knowledge relation freely</li>
          <li>3. education out of the world</li>
        </ul>
      </div>
      <div class="px-3">
        <input id="x.0.0" type="checkbox" class="hidden peer" checked />
        <label for="x.0.0"><h1>x.0.0</h1></label>
        <ul
          class="h-0 -translate-y-3 opacity-0 overflow-hidden peer-checked:h-fit peer-checked:opacity-100 peer-checked:transform-none transition-all duration-300"
        >
          <li>1. make highquality education share platform</li>
          <li>2. structured knowledge make knowledge relation freely</li>
          <li>3. education out of the world</li>
        </ul>
      </div>
      <div class="px-3">
        <input id="philosophy" type="checkbox" class="hidden peer" checked />
        <label for="philosophy"><h1>philosophy</h1></label>
        <ul
          class="h-0 -translate-y-3 opacity-0 overflow-hidden peer-checked:h-fit peer-checked:opacity-100 peer-checked:transform-none transition-all duration-300"
        >
          <li>1. make highquality education share platform</li>
          <li>2. structured knowledge make knowledge relation freely</li>
          <li>3. education out of the world</li>
        </ul>
      </div> -->
    </div>
  {/each}
  <!-- <div class="basis-1/3 w-full bg-slate-400 rounded-md pb-8" id={Object.keys(kanban)[1]}>
    <h1 class="text-center bg-white">Process</h1>
  </div>
  <div class="basis-1/3 w-full bg-slate-500 rounded-md pb-8" id={Object.keys(kanban)[2]}>
    <h1 class="text-center bg-white">Complete</h1>
  </div> -->
</div>
