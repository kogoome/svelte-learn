<script lang="ts">
  import { taskBlockExpand } from './store'
  import { slide, blur } from 'svelte/transition'
  import type { Kanban } from './db'
  import { titleKeyDown, keyUp, taskKeyDown, contentDbClick } from './panelFunctions'

  export let item: Kanban
  export let process: string
  $: $taskBlockExpand // $sign is auto subscription

  // 함수실험
  function changeTheme(e: Event) {
    const target = e.target as HTMLElement
    const bgElement = target.parentElement!.parentElement! as HTMLDivElement
    const titleElement = target.parentElement! as HTMLDivElement
    const taskElement = titleElement.nextElementSibling! as HTMLDivElement
    // rgb randomColor
    const bgClassName = findBg()
    const randomRgbArr = random_rgba()
    const randomRgb = randomRgbArr.join(',')
    const brightRgb = randomRgbArr.map((x) => x + 75).join(',')
    // down brightness

    const bgColor = `rgba(${brightRgb},0.15)`
    const taskColor = `rgba(${brightRgb},0.3)`
    const titleColor = `rgba(${randomRgb},1)`
    changeBg()
    changeTaskBg()
    changeButtonBg()
    changeTitleColor()

    function changeTaskBg() {
      const taskBgClassName = bgClassName.replace('200', '300')
      taskElement.classList.remove(taskBgClassName)
      taskElement.style.backgroundColor = taskColor
    }
    function changeBg() {
      bgElement.classList.remove(bgClassName)
      bgElement.style.backgroundColor = bgColor
    }
    function changeButtonBg() {
      const buttonBgClassName = bgClassName.replace('200', '400')
      target.classList.remove(buttonBgClassName)
      target.style.backgroundColor = taskColor
    }
    function changeTitleColor() {
      titleElement.style.color = titleColor
    }
    function random_rgba() {
      const o = Math.round
      let r = Math.random
      const s = 150
      return [o(r() * s), o(r() * s), o(r() * s)]
    }
    function findBg() {
      let bgClassName: string = 'bg-slate-100'
      bgElement.classList.forEach((className) => {
        if (className.includes('bg')) {
          bgClassName = className
        }
      })
      return bgClassName
    }
  }
</script>

<div class="bg-slate-200 p-2 rounded-lg">
  <div
    class="text-[1.4rem] title rounded-lg pb-1 flex justify-between items-center"
    contenteditable="false"
    data-origin-process={process}
    data-index={item.index}
    on:keydown={titleKeyDown}
    on:keyup={keyUp}
    on:dblclick={contentDbClick}
  >
    {item.title}
    <!-- <div class="h-3 w-3 bg-slate-400 rounded-full" on:click={changeTheme} /> -->
  </div>
  {#if $taskBlockExpand}
    <div class="bg-slate-300 shadow-inner rounded-lg w-full" in:slide out:slide>
      {#each item.todos as task}
        <div
          contenteditable="false"
          class="rounded-lg px-1"
          data-ph="Task"
          on:keydown={taskKeyDown}
          on:keyup={keyUp}
          on:dblclick={contentDbClick}
        >
          {#if task}
            {task}
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  [contenteditable]:empty:not(:focus):before {
    content: attr(data-ph);
    color: grey;
    font-style: italic;
  }
</style>
