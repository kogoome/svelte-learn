<script lang="ts">
  /* 
    구현기능

    화면진입시 이전 사용자 데이터 뷰
    자동저장
    솔터블js 리스트 이동
    쓰레기통
    리스트 이동시 인덱스 자동 재설정
    이동된 리스트 저장시 프로세스 재설정
    태스크 추가 기능
    태스크 삭제 기능
    단축키 이용해서 문서 편집
    마우스트랩
    스윗 얼럿
    태스크 스크롤 기능 - 페이지네이션 대체물
    함수 분리

    구현할 기능

    컴플릿 히스토리 박스
    컴플릿 다된거 기간 지나면 자동으로 히스토리 박스로 넘어가게 하는 기능
    넘어간 자료는 릴리즈 노트로 사용

    시간기록 기능 이거 하려면 디비 클리어하고 넣는 방식으로 사용할 수 없음.

  

  */
  // 스벨트 컴포넌트
  import TopButtons from './TopButtons.svelte'
  import TaskPanel from './TaskPanel.svelte'
  import Note from './Note.svelte'
  // 상태관리
  import { storeComplete, storeInprogress, storeTodo, taskBlockExpand } from './store'
  // css animation
  import 'sweetalert2/src/sweetalert2.scss'
  import { blur } from 'svelte/transition'
  // 함수 & 기능
  import mousetrap from 'svelte-use-mousetrap'
  import {
    firstTitleFocus,
    sortableOn,
    listUpload,
    f1_tutorial,
    getDB,
    addTask,
    addTaskElement
  } from './kanbanFunctions'
  $: $storeTodo = [{ title: 'todayWork', todos: ['1. task'], index: 0 }] // 초기데이터
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
      }
    ],
    [['ctrl+f1'], f1_tutorial]
    // [[], ]
    // TODO edit focus
  ]}
/>
<!-- 상단 버튼 -->
<TopButtons />
<!-- 칸반테이블 -->
<div class="flex gap-5 [bg-slate-800] mx-3 rounded-3xl " in:blur>
  {#each ['Todo', 'InProgress', 'Complete'] as process}
    <!-- ANCHOR 스텝 -->
    <div class="basis-1/3 bg-slate-100 rounded-lg drop-shadow-lg flex flex-col gap-2 py-5">
      <div class="bg-white flex justify-between items-center">
        <div class="basis-1/3 " />

        <!-- ANCHOR 프로세스 이름 -->
        <div class="basis-1/3  text-[2rem] text-center">{process}</div>
        <div class="basis-1/3  text-right p-1 items-center">
          <!-- ANCHOR 태스크 추가 버튼 -->
          <button
            class="btn btn-ghost hover:btn-warning btn-sm rounded-xl py-2 text-slate-400"
            data-btn-process={process}
            on:click={addTask}>+</button
          >
        </div>
      </div>
      <!-- ANCHOR 컨텐츠, 타이틀 태스크 리스트-->
      <div
        class="flex flex-col gap-2 [px-2] min-h-16 [] overflow-scroll scroll-smooth max-h-[33rem]"
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
