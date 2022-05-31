<script lang="ts">
  import { liveQuery, type Observable } from 'dexie'
  import { db, type Kanban } from './db'
  let titleName = ''
  let Todo: Observable<Kanban[]> | Kanban[]
  $: Todo = liveQuery(() => db.Todo.where('title').startsWithAnyOf(titleName).toArray())
</script>

<input
  type="text"
  class="input input-ghost input-sm w-full text-3xl"
  bind:value={titleName}
  placeholder="search title"
/>
{#if $Todo}
  <div class="bg-slate-200 rounded-3xl p-2">
    <div class="bg-slate-300 rounded-2xl pt-3 pb-7">
      <h1 class="w-full bg-white flex justify-center">Todo</h1>
      {#each $Todo as taskObj (taskObj.index)}
        <div class="px-3">
          <h3>{taskObj.title}</h3>
          {#each taskObj.task as task}
            <div contenteditable="false" bind:textContent={task} />
          {/each}
        </div>
      {/each}
    </div>
  </div>
{/if}
