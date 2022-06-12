<script lang="ts">
  // 스벨트 컴포넌트
  import TopButtons from './TopButtons.svelte'
  import TaskPanel from './TaskPanel.svelte'
  import Note from './Note.svelte'
  import Clock from '../design/Clock.svelte'
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

  const processNameColor: {
    [key: string]: string
  } = {
    Todo: 'bg-amber-400',
    InProgress: 'bg-blue-300',
    Complete: 'bg-green-300'
  }

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
<!-- 칸반테이블 bg-gradient-to-r from-green-50 to-blue-100-->

<div class="flex justify-center py-1 nm-bg">
  <!-- bg-gradient-to-br from-white to-slate-100 -->
  <div
    class="flex gap-2 w-[1200px] mx-3 rounded-xl 
    "
    in:blur
  >
    {#each ['Todo', 'InProgress', 'Complete'] as process}
      <!-- ANCHOR 스텝 -->
      <div
        class="basis-1/3 rounded-sm flex flex-col gap-2 pt-2 pb-1 [drop-shadow-md]
        "
      >
        <div class="bg-white flex justify-between items-center nm-convex ml-2 mr-3">
          <div class="basis-1/3 " />

          <!-- ANCHOR 프로세스 이름 -->
          <div
            class="basis-1/3  text-[1rem] text-center text-white {processNameColor[
              process
            ]} drop-shadow-md rounded-md "
          >
            {process}
          </div>
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
              <TaskPanel {item} process="Todo" titleColor={randomColor()} />
            {/each}
          {:else if process === 'InProgress'}
            {#each $storeInprogress as item (item)}
              <TaskPanel {item} process="InProgress" titleColor={randomColor()} />
            {/each}
          {:else if process === 'Complete'}
            {#each $storeComplete as item, index (item)}
              <TaskPanel {item} process="Complete" titleColor={randomColor()} />
            {/each}
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>
<Clock />
<!-- 하단 메모장 -->
<Note />

<!-- <div id="history" data-sortable="History">
  {#each $storeComplete as item, index (item)}
    {#if index >= 6}
      <TaskPanel {item} process="Complete" />
    {/if}
  {/each}
</div> -->
<style>
  .nm-bg {
    /* background-color: rgb(241, 241, 241); */
    background: radial-gradient(circle, rgb(249, 251, 253) 13%, rgb(241, 241, 241) 100%);
  }
  .nm-flat {
    background: rgb(241, 241, 241);
    box-shadow: 3px 3px 6px #dedede, -3px -3px 6px #ffffff;
  }
  .nm-convex {
    background: linear-gradient(145deg, rgb(249, 251, 253), rgb(241, 241, 241));
    /* box-shadow: 4px 4px 6px #dedede, -4px -4px 6px #ffffff; */
    box-shadow: 4px 4px 4px #e5e5e5, -4px -4px 4px #ffffff;
  }
</style>
