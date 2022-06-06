<script lang="ts">
  import { slide, blur } from 'svelte/transition'
  import type { Kanban } from './renewDb'
  import { titleKeyDown, keyUp, taskKeyDown, contentDbClick } from './renewPanelFunctions'
  let taskBlockExpand = true
  export let item: Kanban
  export let process: string
</script>

<div class="bg-slate-200 p-2 [rounded-xl]">
  <!-- <div contenteditable="false" class="indexNumber" /> -->
  <div
    class="text-[1.4rem] title rounded-lg pb-1"
    contenteditable="false"
    data-origin-process={process}
    data-index={item.index}
    on:keydown={titleKeyDown}
    on:keyup={keyUp}
    on:dblclick={contentDbClick}
  >
    {item.title}
  </div>
  {#if taskBlockExpand}
    <div class="bg-slate-300 shadow-inner rounded-lg" in:slide>
      {#each item.todos as task}
        <div
          contenteditable="false"
          class="rounded-lg px-1"
          data-ph="Task"
          on:keydown={taskKeyDown}
          on:keyup={keyUp}
          on:dblclick={contentDbClick}
        >
          <!-- on:input={onInputTest} -->
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
