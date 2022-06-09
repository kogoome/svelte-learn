<script lang="ts">
  // 스벨트 컴포넌트
  import TopButtons from './TopButtons.svelte'
  import TaskPanel from './TaskPanel.svelte'
  import Note from './Note.svelte'
  // 상태관리
  import { storeComplete, storeInprogress, storeTodo } from './store'
  // css animation
  import 'sweetalert2/src/sweetalert2.scss'
  import { blur } from 'svelte/transition'
  // 함수 & 기능
  import mousetrap from 'svelte-use-mousetrap'
  import {
    trashBox,
    firstTitleFocus,
    sortableOn,
    listUpload,
    f1_help,
    getDB,
    addTask,
    addTaskElement
  } from './kanbanFunctions'
  import { pressKeyCodeSync } from './panelFunctions'
  $: $storeTodo
  $: $storeInprogress
  $: $storeComplete

  getDB()
    .then((result) => {
      $storeTodo = result.Todo
      $storeInprogress = result.InProgress
      $storeComplete = result.Complete
    })
    .then(() => {
      sortableOn()
    })
    .catch((e) => {
      console.log(e)
    })
</script>

<!-- 단축키 -->
<div
  use:mousetrap={[
    [['ctrl+shift+s'], listUpload],
    [
      ['ctrl+shift+space'],
      () => {
        addTaskElement('Todo')
        firstTitleFocus('Todo')
        pressKeyCodeSync(17)
        pressKeyCodeSync(16)
      }
    ],
    [
      ['ctrl+space'],
      () => {
        firstTitleFocus('Todo')
        pressKeyCodeSync(17)
      }
    ],
    [['ctrl+f1'], f1_help],
    [['del'], trashBox]

    // [[], ]
  ]}
/>
<!-- 상단 버튼 -->
<TopButtons />
<!-- 칸반테이블 -->
<div class="flex justify-center       bg-gradient-to-r from-green-50 to-blue-100">
  <div
    class="flex gap-5 w-[1200px] mx-3 rounded-xl 
    "
    in:blur
  >
    {#each ['Todo', 'InProgress', 'Complete'] as process}
      <!-- ANCHOR 스텝 -->
      <div
        class="basis-1/3 rounded-sm drop-shadow-lg flex flex-col gap-2 py-2
        "
      >
        <div class="bg-white flex justify-between items-center">
          <div class="basis-1/3 " />

          <!-- ANCHOR 프로세스 이름 -->
          <div class="basis-1/3  text-[1rem] text-center text-gray-400">{process}</div>
          <div class="basis-1/3  text-right p-1 items-center">
            <!-- ANCHOR 태스크 추가 버튼 -->
            <button
              class="btn btn-ghost hover:btn-warning btn-xs rounded-md py-1 text-slate-400"
              data-btn-process={process}
              on:click={addTask}>+</button
            >
          </div>
        </div>
        <!-- ANCHOR 컨텐츠, 타이틀 태스크 리스트-->
        <div
          class="flex flex-col gap-2 [px-2] min-h-[30rem] overflow-scroll scroll-smooth max-h-[42rem]"
          data-sortable={process}
        >
          {#if process === 'Todo'}
            {#each $storeTodo as item (item)}
              <TaskPanel {item} process="Todo" />
            {/each}
          {:else if process === 'InProgress'}
            {#each $storeInprogress as item (item)}
              <TaskPanel {item} process="InProgress" />
            {/each}
          {:else if process === 'Complete'}
            {#each $storeComplete as item, index (item)}
              <TaskPanel {item} process="Complete" />
            {/each}
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>
<!-- 하단 메모장 -->
<Note />

<!-- <div id="history" data-sortable="History">
  {#each $storeComplete as item, index (item)}
    {#if index >= 6}
      <TaskPanel {item} process="Complete" />
    {/if}
  {/each}
</div> -->

<!-- 개발자용 데스트 데이터 -->
<!-- {#each $storeTodo as item}
  <div>
    {JSON.stringify(item)}
  </div>
{/each}
{#each $storeInprogress as item}
  <div>
    {JSON.stringify(item)}
  </div>
{/each}
{#each $storeComplete as item}
  <div>
    {JSON.stringify(item)}
  </div>
{/each}
 -->
