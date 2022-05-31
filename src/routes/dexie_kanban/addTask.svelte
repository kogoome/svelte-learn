<script lang="ts">
  import { db } from './db'

  let status = ''
  let stepName: 'Todo' | 'Process' | 'Complete' = 'Todo'
  let titleName = 'todayWork'
  let taskList = ['1. task']
  let orderIndex: number = 0
  $: taskIndexArray = [0] // taskList를 위한 인덱스 가이드

  async function addTask() {
    try {
      // Add the new friend!
      const index = await db[stepName].add({
        step: stepName,
        title: titleName,
        task: taskList,
        index: orderIndex
      })

      status = `${stepName} : ${titleName} successfully added. Got index ${index}`

      // Reset form:
      stepName: 'Todo'
      titleName = 'todayWork'
      taskList = ['1. task']
      orderIndex = 0
      taskIndexArray = [0]
    } catch (error) {
      status = `Failed to add ${titleName}: ${error}`
    }
  }

  function addTaskItem() {
    taskIndexArray[taskIndexArray.length] = taskIndexArray.length
    let task = taskList.length + 1 + '. task'
    taskList = [...taskList, task]
  }
  function removeTaskItem(e: Event) {
    const index = (<HTMLButtonElement>e.target).getAttribute('data-index')
    taskIndexArray = [...taskIndexArray].slice(0, -1)
    taskList = taskList.filter((_, i) => i != Number(index))
  }
</script>

<div class="bg-slate-200 rounded-2xl m-3 py-5">
  <fieldset class="px-10 pt-4">
    <legend class="flex w-full justify-center"><h1>Add new task</h1></legend>
    <div class="flex gap-2">
      <div class="basis-1/2">
        <div class="text-xl">Step:</div>
        <select class="select w-full max-w-xs" bind:value={stepName}>
          <option disabled selected>select task step</option>
          <option>Todo</option>
          <option>Process</option>
          <option>Complete</option>
        </select>
      </div>
      <div class="basis-1/2">
        <div class="text-xl">OrderIndex:</div>
        <input class="input input-bordered w-full" type="number" bind:value={orderIndex} />
      </div>
    </div>
    <div class="text-xl">
      Title:
      <input class="input input-bordered w-full" type="text" bind:value={titleName} />
    </div>

    <div class="text-xl">
      <div class="flex items-center justify-between">
        Task:
        <button class="btn btn-circle btn-xs btn-warning" on:click={addTaskItem}>+</button>
      </div>
      {#each taskIndexArray as i (i)}
        <!-- task를 옵저브하고있기 때문에 이를 변경하면 each가 다시리로드를 함. -->
        <div class="flex items-center">
          <input class="input input-bordered w-full" type="text" bind:value={taskList[i]} />
          <button class="btn btn-circle btn-ghost" data-index={i} on:click={removeTaskItem}
            >-</button
          >
        </div>
      {/each}
    </div>
    <p class="text-green-500 flex justify-center h-5">{status}</p>
    <div class="flex justify-center">
      <button class="btn btn-warning w-1/4 m-7" on:click={addTask}>Add Task</button>
    </div>
  </fieldset>
</div>
