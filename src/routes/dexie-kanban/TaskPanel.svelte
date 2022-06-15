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
  // function changeTheme(e: Event) {
  //   const title = (<HTMLElement>e.target).parent as HTMLDivElement
  // }
  export let titleColor: string

  const randomColor = () => {
    const color = [
      'bg-red-200',
      'bg-orange-200',
      'bg-yellow-200',
      'bg-green-200',
      'bg-blue-200',
      'bg-indigo-200',
      'bg-purple-200',
      'bg-teal-200',
      'bg-amber-200',
      'bg-fuchsia-200',
      'bg-emerald-200',
      'bg-lime-200',
      'bg-cyan-200',
      'bg-pink-200',
      'bg-rose-200',
      '',
      '',
      '',
      '',
      ''
    ]
    return color[Math.floor(Math.random() * color.length)]
  }
</script>

<div class="p-1 pb-2 rounded-sm nm-convex mx-2 my-px bg-3 bg-amber-300">
  <div
    class="text-[1rem] min-h-[24px] title rounded-md flex justify-between items-center w-fit outline-none focus:bg-gradient-to-r focus:from-pink-100 focus:to-blue-200 focus:text-rose-500
    mb-1 px-1 {titleColor}
    "
    contenteditable="false"
    data-origin-process={process}
    data-index={item.index}
    data-ph="Title"
    on:keydown={titleKeyDown}
    on:keyup={keyUp}
    on:dblclick={contentDbClick}
    on:click={() => {
      titleColor = randomColor()
    }}
    on:blur={(e) => onBlur(e)}
  >
    {item.title}
  </div>
  <!-- <span class="h-3 w-3 bg-slate-400 rounded-full" on:click={changeTheme} /> -->
  <!-- bg-gradient-to-r from-white to-[#e9f7ff] -->
  <div
    class="taskTransition shadow-inner rounded-sm w-full transition-opacity ease-in-out duration-500
    nm-pressed"
  >
    {#each item.todos as task}
      <div
        contenteditable="false"
        class="rounded-md px-1 text-gray-500 
        outline-none focus:bg-gradient-to-r focus:from-amber-100 focus:to-lime-200 focus:text-sky-500
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
    background: linear-gradient(90deg, rgb(240, 240, 240), rgb(253, 253, 253));
    /* box-shadow: inset 0px 2px 2px #e9e9e9, inset -0px -2px 2px #fbfbfb; */
    /* background: linear-gradient(90deg, rgb(255, 249, 199), rgb(255, 255, 255)); */
  }
</style>
