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
    
    구현할 기능
    마우스

  */
  import { slide, blur } from 'svelte/transition'
  import Panel from './RenewPanel.svelte'
  import { storeComplete, storeInprogress, storeTodo } from './renewStore'
  import Sortable from 'sortablejs'
  import { db, type Kanban } from './renewDb'
  import { onDestroy } from 'svelte'

  // 데이터는 심플하게
  $: $storeTodo = [{ title: 'todayWork', todos: ['1. task'], index: 0 }] // 초기데이터
  $: $storeInprogress
  $: $storeComplete
  type Addresses = {
    [key: string]: {
      newProcessAdr: HTMLElement | null | undefined
      indexNprocessAdr: HTMLDivElement
    }[]
  }
  ;(async function getDB() {
    const Todo = db.Todo.reverse().toArray()
    const InProgress = db.InProgress.reverse().toArray()
    const Complete = db.Complete.reverse().toArray()
    const result = await Promise.all([Todo, InProgress, Complete]).then(
      ([Todo, InProgress, Complete]) => {
        return { Todo, InProgress, Complete }
      }
    )
    return result
  })()
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

  function sortableOn() {
    let stbCollection = document.querySelectorAll('[data-sortable]') as NodeListOf<HTMLElement>
    for (const stbItem of stbCollection) {
      Sortable.create(stbItem, {
        group: {
          name: stbItem.getAttribute('data-sortable') as string,
          put: true
        },
        animation: 200,
        ghostClass: 'blue-background-class',
        onStart: () => {
          ;(<HTMLInputElement>document.querySelector('#garbageBox')).checked = true
        },
        onEnd: async () => {
          ;(<HTMLInputElement>document.querySelector('#garbageBox')).checked = false
          // 드롭한 시점에서 뷰의 정보구조를 읽어오고
          const addresses: Addresses = await dataFarmingAdr()
          // 카테고리별 랭스를 통해 인덱스 값을 찾아서
          let lastIndexTodo = addresses.todoAdress.length - 1
          let lastIndexInprogress = addresses.inprogressAdress.length - 1
          let lastIndexComplete = addresses.completeAdress.length - 1
          for (const processAdr in addresses) {
            // 인덱스만 변경해보자.
            addresses[processAdr].forEach((adrObj) => {
              switch (processAdr) {
                case 'todoAdress':
                  adrObj.indexNprocessAdr.setAttribute('data-index', `${lastIndexTodo--}`)
                  break
                case 'inprogressAdress':
                  adrObj.indexNprocessAdr.setAttribute('data-index', `${lastIndexInprogress--}`)
                  break
                case 'completeAdress':
                  adrObj.indexNprocessAdr.setAttribute('data-index', `${lastIndexComplete--}`)
                  break
              }
            })
          }
        }
      })
    }
  }
  // 궁극의 뮤터블한 상태변수는 뷰데이터
  function addTask(e: Event) {
    const progressName = (<HTMLButtonElement>e.target).getAttribute('data-btn-process')!
    switch (progressName) {
      case 'Todo':
        $storeTodo = [{ title: 'title', todos: ['todo:'], index: $storeTodo.length }, ...$storeTodo]
        break
      case 'InProgress':
        $storeInprogress = [
          { title: 'title', todos: ['todo:'], index: $storeInprogress.length },
          ...$storeInprogress
        ]
        break
      case 'Complete':
        $storeComplete = [
          { title: 'title', todos: ['todo:'], index: $storeComplete.length },
          ...$storeComplete
        ]
        break
    }
  }
  function editToggle(onOffstring: 'on' | 'off') {
    let option = onOffstring
    let editDivArray = document.querySelectorAll('[contenteditable]') as NodeListOf<HTMLDivElement>
    switch (option) {
      case 'on':
        editDivArray[1].focus()
        break
      case 'off':
        editDivArray.forEach((element) => {
          element.setAttribute('contenteditable', 'false')
        })
        break
    }
  }
  async function listUpload() {
    const dataSet = dataFarming()
    dbClear()
      .then(async () => bundleBulkUpload(await dataSet))
      .then(() => alert('저장되었습니다.'))
      .catch((e) => {
        console.log(e)
        alert('업로드에 실패하였습니다.\n데이터 복구를 실행해 주세요.')
      })
    async function dbClear() {
      await Promise.all([db.Todo.clear(), db.InProgress.clear(), db.Complete.clear()])
        .then(() => {
          console.log('db clear')
        })
        .catch((e) => {
          console.log(e)
        })
    }
    async function bundleBulkUpload(dataSet: { [key: string]: Kanban[] }) {
      const { todoStore, inprogressStore, completeStore } = dataSet
      Promise.all([
        db.Todo.bulkAdd(todoStore),
        db.InProgress.bulkAdd(inprogressStore),
        db.Complete.bulkAdd(completeStore)
      ])
        .then(() => console.log('Upload Complete'))
        .catch((e) => console.log(e))
    }
    async function dataFarming() {
      const address: Addresses = await dataFarmingAdr()

      let todoStore: Kanban[] = []
      let inprogressStore: Kanban[] = []
      let completeStore: Kanban[] = []
      for (const processAddr in address) {
        address[processAddr].forEach((obj) => {
          const process = obj.newProcessAdr?.getAttribute('data-sortable')!
          const index = obj.indexNprocessAdr.getAttribute('data-index')! as string
          const title = obj.indexNprocessAdr.innerText
          const todos = Array.from(obj.indexNprocessAdr.nextElementSibling!.children).map(
            (task) => task.innerHTML
          )
          const item = { title, todos, index: Number(index) }
          switch (process) {
            case 'Todo':
              todoStore.push(item)
              break
            case 'InProgress':
              inprogressStore.push(item)
              break
            case 'Complete':
              completeStore.push(item)
              break
          }
        })
      }
      console.log('data farming complete')
      return { todoStore, inprogressStore, completeStore }
    }
  }
  async function dataFarmingAdr() {
    const divCollector = document.querySelectorAll('[data-index]') as NodeListOf<HTMLDivElement>
    let todoAdress = []
    let inprogressAdress = []
    let completeAdress = []
    for (const divItem of divCollector) {
      const newProcessAdr = divItem.parentElement?.parentElement
      const indexNprocessAdr = divItem
      const newProcessValue = divItem.parentElement?.parentElement?.getAttribute('data-sortable')!
      const item = { newProcessAdr, indexNprocessAdr }
      switch (newProcessValue) {
        case 'Todo':
          todoAdress.push(item)
          break
        case 'InProgress':
          inprogressAdress.push(item)
          break
        case 'Complete':
          completeAdress.push(item)
          break
      }
    }
    return { todoAdress, inprogressAdress, completeAdress }
  }
  // onDestroy(() => {
  // 자동저장은 개발용으로 사용하면 안되겟다.
  // 다 날려먹네
  // 복구
  //   listUpload()
  // })
</script>

<div>
  <button class="btn btn-ghost btn-sm" on:click={listUpload}>list-upload</button>
</div>

<div class="flex gap-5 [bg-slate-200 shadow-md] p-1 mx-5 rounded-3xl" in:blur>
  {#each ['Todo', 'InProgress', 'Complete'] as process}
    <!-- ANCHOR 스텝 -->
    <div class="basis-1/3 bg-slate-100 rounded-lg drop-shadow-lg flex flex-col gap-2 py-5">
      <div class="bg-white flex justify-between items-center">
        <div class="basis-1/3 " />

        <!-- ANCHOR 프로세스 이름 -->
        <div class="basis-1/3  text-[2rem] text-center">{process}</div>
        <div class="basis-1/3  text-right p-1 items-center">
          <!-- ANCHOR 컨셉 추가 -->
          <button
            class="btn btn-ghost hover:btn-warning btn-sm rounded-xl py-2 text-slate-400"
            data-btn-process={process}
            on:click={addTask}>+</button
          >
        </div>
      </div>
      <!-- ANCHOR 컨텐츠, 타이틀 태스크 리스트-->
      <div class="flex flex-col gap-2 [px-2] min-h-16" data-sortable={process}>
        {#if process === 'Todo'}
          {#each $storeTodo as item (item)}
            <Panel {item} process="Todo" />
          {/each}
        {:else if process === 'InProgress'}
          {#each $storeInprogress as item (item)}
            <Panel {item} process="InProgress" />
          {/each}
        {:else if process === 'Complete'}
          {#each $storeComplete as item (item)}
            <Panel {item} process="Complete" />
          {/each}
        {/if}
      </div>
    </div>
  {/each}
</div>
<div>
  <input type="checkbox" id="garbageBox" class="peer invisible" />
  <div
    class="opacity-0 peer-checked:visible peer-checked:opacity-60 hover:opacity-100 absolute top-5 left-1/2 -translate-x-1/2 text-center h-20 w-20 rounded-full transition-all duration-700 z-0
    overflow-hidden shadow-lg text-4xl py-3 select-none bg-[url('./trash')] bg-cover bg-center bg-rose-300"
  >
    🗑️

    <div data-sortable="garbageBox" class="h-15 overflow-hidden rounded-lg opacity-0" />
  </div>
</div>

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
