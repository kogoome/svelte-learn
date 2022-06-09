<script lang="ts">
  import { taskBlockExpand } from './store'
  import type { Kanban } from './db'
  import { titleKeyDown, keyUp, taskKeyDown, contentDbClick, esc_focusOut } from './panelFunctions'

  export let item: Kanban
  export let process: string
  $: $taskBlockExpand // $sign is auto subscription

  // 함수실험

  function onBlur(e: Event) {
    esc_focusOut(e.target as HTMLDivElement)
  }
</script>

<div class="bg-white p-2 rounded-lg ">
  <div
    class="text-[1rem] min-h-[28px] title rounded-lg pb-1 flex justify-between items-center outline-none focus:bg-gradient-to-r focus:from-pink-100 focus:to-blue-200 focus:text-rose-500"
    contenteditable="false"
    data-origin-process={process}
    data-index={item.index}
    data-ph="Title"
    on:keydown={titleKeyDown}
    on:keyup={keyUp}
    on:dblclick={contentDbClick}
    on:blur={(e) => onBlur(e)}
  >
    {item.title}
    <!-- <div class="h-3 w-3 bg-slate-400 rounded-full" on:click={changeTheme} /> -->
  </div>
  <div
    class="taskTransition shadow-inner rounded-lg w-full transition-opacity ease-in-out duration-500
    bg-gradient-to-r from-white to-[#e9f7ff]"
  >
    {#each item.todos as task}
      <div
        contenteditable="false"
        class="rounded-lg px-1 text-gray-500 
        outline-none focus:bg-gradient-to-r focus:from-amber-100 focus:to-lime-200 focus:text-sky-400
        "
        data-ph="Task"
        on:keydown={taskKeyDown}
        on:keyup={keyUp}
        on:dblclick={contentDbClick}
        on:blur={(e) => onBlur(e)}
      >
        {#if task}
          {task}
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  [contenteditable]:empty:not(:focus):before {
    content: attr(data-ph);
    color: grey;
    font-style: italic;
  }
</style>
