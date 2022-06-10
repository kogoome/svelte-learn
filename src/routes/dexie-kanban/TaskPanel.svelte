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

<div class="p-2 rounded-sm nm-convex mx-2 my-px">
  <div
    class="text-[1rem] min-h-[28px] title rounded-md pb-1 flex justify-between items-center outline-none focus:bg-gradient-to-r focus:from-pink-100 focus:to-blue-200 focus:text-rose-500"
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
  <!-- bg-gradient-to-r from-white to-[#e9f7ff] -->
  <div
    class="taskTransition shadow-inner rounded-sm w-full transition-opacity ease-in-out duration-500
    nm-pressed"
  >
    {#each item.todos as task}
      <div
        contenteditable="false"
        class="rounded-md px-1 text-gray-500 
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
  .nm-flat {
    /* background: rgb(241, 245, 249); */
    background: rgb(241, 241, 241);
    box-shadow: 3px 3px 6px #dedede, -3px -3px 6px #ffffff;
  }
  .nm-convex {
    background: linear-gradient(145deg, rgb(249, 251, 253), rgb(241, 241, 241));
    box-shadow: 4px 4px 4px #e5e5e5, -4px -4px 4px #ffffff;
  }
  .nm-pressed {
    /* background: radial-gradient(circle, rgb(230, 235, 240) 13%, rgb(241, 245, 249) 100%); */
    background: linear-gradient(90deg, rgb(243, 243, 243), rgb(253, 253, 253));
    box-shadow: inset 0px 2px 2px #e9e9e9, inset -0px -2px 2px #fbfbfb;
  }
</style>
