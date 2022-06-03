<script lang="ts">
  import { liveQuery, type Observable } from 'dexie'
  import { db, type Kanban } from './db'
  import { fly, fade, slide, blur, scale, draw, crossfade } from 'svelte/transition'

  $: Todo = liveQuery(() => db.Todo.reverse().toArray())
  $: Process = liveQuery(() => db.Process.reverse().toArray())
  $: Complete = liveQuery(() => db.Complete.reverse().toArray())
</script>

<!-- 오류 우에 잡노.. -->
{#if $Todo}
  <div class="bg-slate-200 rounded-3xl p-2" transition:blur={{ duration: 700 }}>
    <div class="bg-slate-300 rounded-2xl pt-3 pb-7">
      <h1 class="w-full bg-white flex justify-center">Todo</h1>
      {#each $Todo as taskObj (taskObj.index)}
        <div class="px-3">
          <h3>{taskObj.title}<span class="text-sm">({taskObj.index})</span></h3>
          {#each taskObj.task as task}
            <div contenteditable="false" bind:textContent={task} />
          {/each}
        </div>
      {/each}
    </div>
  </div>
{/if}
