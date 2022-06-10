<script>
  import { trash, save, info, expand, writing, contract, clock } from '$lib/assets/_index'
  import { f1_help, listUpload, taskExpand, addTaskElement, trashBox } from './kanbanFunctions'
</script>

<div class="flex justify-center">
  <div class="flex items-center w-[1200px]">
    <!-- <button class="btn btn-ghost btn-sm text-2xl h-16 w-16 z-10 font-medium" on:click={listUpload}>
      <img src={save} alt="save data" />
    </button> -->

    <button class="btn btn-ghost btn-sm text-2xl h-16 w-16 z-10" on:click={f1_help}>
      <img src={info} alt="key shorcut tutorial" />
    </button>

    <button
      class="btn btn-ghost btn-sm text-2xl h-16 w-16 z-10"
      on:click={() => {
        taskExpand()
      }}
    >
      <img src={expand} alt="task expand" />
    </button>

    <button
      class="btn btn-ghost btn-sm text-2xl h-16 w-16 z-10"
      on:click={() => {
        addTaskElement('Todo')
      }}
    >
      <img src={contract} alt="add Todo" />
    </button>

    <button class="btn btn-ghost btn-sm text-2xl h-16 w-16 z-10" on:click={() => {}}>
      <img src={clock} alt="complete history" />
    </button>

    <button
      class="btn btn-ghost btn-sm text-2xl h-16 w-16 z-10"
      on:click={() => {
        trashBox()
      }}
    >
      <img src={trash} alt="trash" />
    </button>

    <div
      id="trashBox"
      data-sortable="garbageBox"
      class="overflow-hidden scroll-smooth opacity-0
      [hover:h-36] transition-all duration-300 ease-in-out
      rounded-xl h-[3.4rem] min-w-[20%] grow mx-1
      flex justify-start items-start
      bg-gradient-to-r from-pink-100 to-blue-200
      "
    />
  </div>
</div>
