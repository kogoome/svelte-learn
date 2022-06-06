<script lang="ts">
  /* 
  현재 가지고 있는 코드구조의 근본적인 문제가 있는게
  솔터블 js를 사용하면서 view 데이터와 객체데이터의 연동분기점이 생긴다는 점이다.
  솔터블 js는 근본적으로 하위데이터와 view 데이터를 분리하여 겉보기 데이터를 변경시켜주는 역할을 하는데,
  이때 겉보기 데이터와 하위데이터를 동기화시키면 솔터블js가 바인딩하고 있던 데이터가 변경되며 view 데이터 상의 버그가 발생한다.
  화면을 리로드하면 되지만 사용성이 떨어질 수밖에 없다.
  따라서 솔터블 js를 사용해야 한다면, 기저데이터와 화면데이터를 연동시킬것이 아니라. 
  화면에 받아올 때만 기저데이터 사용하되, 화면에 있는 정보 자체를 상태값으로 사용해야만 한다.
  따라서 view데이터의 상태값이 변경되고 이를 저장하려면 다시 크롤링하여 이를 디비에 반영하도록 한다.
  기저 데이터는 화면을 로드할 때 한번만 사용하고 버려지는 방식으로 사용하는게 좋을듯 하다.

  현 파일에서는 다시 재작업하기 빡세서
  기저데이터 kanban 뷰데이터 kanbSortableHusk로 나누고 


*/

  // NOTE : 스크립트 데이터 구조
  // ANCHOR : 돔데이터 구조
  import { AlertNotify, senderAlerterNotifier } from 'svelte-alertnotify' //ts 없음
  import { slide, blur } from 'svelte/transition'
  import Sortable from 'sortablejs'
  import { db, type Kanban } from './db'
  import _ from 'lodash-es'

  // NOTE 인덱스 디비에서 데이터 가져와서 화면에 띄우기
  type StepIndex = {
    Todo: number[]
    Process: number[]
    Complete: number[]
  }
  let awaitKanban = false
  let taskBlockExpand = true
  // await 블록 사용시 데이터바인딩이 불가. 이유를 모름. 상위 데이터에서 프로미스 덴을 이용하여 await블록을 회피할수 잇는 boolean 값으로 대체
  $: kanban = [] as Kanban[]
  let kanbanSortHusks: Kanban[]
  let kanbanTaskTreeIdx: { [key: string]: number[] }
  $: kanbanTaskTreeIdx
  function taskTreeIdxReload() {
    kanbanTaskTreeIdx = {
      Todo: Array(kanban.filter((item) => item.step === 'Todo').length).fill(0),
      Process: Array(kanban.filter((item) => item.step === 'Process').length).fill(
        kanban.filter((item) => item.step === 'Todo').length
      ),
      Complete: Array(kanban.filter((item) => item.step === 'Complete').length).fill(
        kanban.filter((item) => item.step === 'Todo' || item.step === 'Process').length
      )
    }
  }
  ;(async function getDB() {
    const Todo = db.Todo.reverse().toArray()
    const Process = db.Process.reverse().toArray()
    const Complete = db.Complete.reverse().toArray()
    const result = await Promise.all([Todo, Process, Complete]).then(
      ([Todo, Process, Complete]) => {
        return [...Todo, ...Process, ...Complete]
      }
    )
    return result
  })()
    .then((result) => {
      kanban = result
      kanbanSortHusks = _.cloneDeep(result)
      taskTreeIdxReload()
      awaitKanban = true
    })
    .then(() => {
      sortableOn()
    })
    .catch((err) => {
      console.log(err)
    })

  // NOTE 리스트 솔터블js 가능하게 변경하기
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
        onChange: (e: any) => {
          // 현재 컨테이너 인덱스 정렬 - 껍데기만 바뀌고 객체 반영 안됨.
          const sortableListTo = e.to.children
          let iTarget = sortableListTo.length - 1
          for (let child of sortableListTo) {
            child.firstChild.innerText = iTarget
            iTarget--
          }
        },
        onEnd: async (e: any) => {
          // 제반정보 생성
          const { changedTitleIndex, title, originStep, changedStep } = getItemData()
          const targetStepLastIndex = getTargetStepLastIndex(changedStep)
          // 상태변경
          let result
          if (originStep !== changedStep) {
            result = await changeStepName(
              changedTitleIndex,
              title,
              changedStep,
              targetStepLastIndex,
              kanbanSortHusks
            )
          } else {
            result = await changeOrder(targetStepLastIndex, kanbanSortHusks)
          }
          kanbanSortHusks = await indexRenewer(result)
          // TODO 이걸 칸반 데이터에 직접 넣으니까, 바인딩되어있던 솔터블객체 내용이 변경되면서 겉보기 아이템이 역으로 변경되지 않는 문제가 발생한다.
          // 위치값을 변경했지만 위치참조를 하고있는데 참조하는 내부데이터가 바뀌고 그값을 로드해오면서 뷰가 바뀌지 않는듯한 문제.

          console.log(result)
          // const result = await changeOrder(targetStepLastIndex, kanban)
          // kanban = await indexRenewer(result)

          async function indexRenewer(kanban: Kanban[]) {
            let todoMaxindex = kanban.filter((item) => item.step === 'Todo').length - 1
            let processMaxindex = kanban.filter((item) => item.step === 'Process').length - 1
            let completeMaxindex = kanban.filter((item) => item.step === 'Complete').length - 1
            const result = kanban.map((item) => {
              if (todoMaxindex >= 0) {
                item.index = '' + todoMaxindex
                --todoMaxindex
              } else if (processMaxindex >= 0) {
                item.index = '' + processMaxindex
                --processMaxindex
              } else if (completeMaxindex >= 0) {
                item.index = '' + completeMaxindex
                --completeMaxindex
              }
              return item
            })
            return result
          }
          async function changeOrder(targetStepLastIndex: number, kanban: Kanban[]) {
            const originKanbanIndex = kanban.findIndex((item) => item.title === title)
            const objToMove = kanban.splice(originKanbanIndex, 1)
            kanban.splice(targetStepLastIndex - changedTitleIndex - 1, 0, ...objToMove)
            return kanban
          }
          function getItemData() {
            // 변경된 태스크인덱스와 타이틀, 과거와 현재 스텝이름
            const changedTitleIndex = Number(e.item.firstChild.innerText)
            const title = e.item.getAttribute('data-title') as string
            const originStep = e.from.getAttribute('data-sortable') as
              | 'Todo'
              | 'Process'
              | 'Complete'
            const changedStep = e.to.getAttribute('data-sortable') as
              | 'Todo'
              | 'Process'
              | 'Complete'
            return { changedTitleIndex, title, originStep, changedStep }
          }
          async function changeStepName(
            changedTitleIndex: number,
            title: string,
            changedStep: 'Todo' | 'Process' | 'Complete',
            targetStepLastIndex: number,
            kanban: Kanban[]
          ) {
            // 뽑아낼 객체의 기존 인덱스
            const kanbanIdx = kanban.findIndex((item) => item.title === title)
            // 칸반 배열에서 변경할 스텝객체 추출
            const objToMove = kanban.splice(kanbanIdx, 1)[0]
            // 스텝이름 변경
            objToMove.step = changedStep
            objToMove.index = changedTitleIndex.toString()
            // 끼워넣을 인덱스 찾기
            // 변경된 객체 추가.
            kanban.splice(targetStepLastIndex - changedTitleIndex, 0, objToMove)
            return kanban
          }
          function getTargetStepLastIndex(changedStep: 'Todo' | 'Process' | 'Complete') {
            return changedStep === 'Todo'
              ? kanban.filter((item) => item.step === 'Todo').length
              : changedStep === 'Process'
              ? kanban.filter((item) => item.step === 'Todo' || item.step === 'Process').length
              : kanban.length
          }
          // dataChange()
          // 거치는 컨테이너 정렬 로직이 없음.
          // srcELement랑 target 이랑 차이가 안보임.
          // 하지만 운용상의 문제는 없으므로 그냥 둠
        }
      })
    }
  }

  // NOTE 사용시 필요한 함수들
  function editToggle() {
    const edit = document.getElementById('edit')
    if (edit == null) throw new Error('edit button is null')
    let option = edit.innerText === 'EDIT-OFF' ? 'on' : 'off'
    let editDivArray = document.querySelectorAll('[contenteditable]') as NodeListOf<HTMLDivElement>
    switch (option) {
      case 'on':
        editDivArray.forEach((element) => {
          element.setAttribute('contenteditable', 'true')
        })
        edit.innerText = 'edit-on'
        edit.classList.remove('btn-ghost')
        edit.classList.add('btn-warning')
        editDivArray[2].focus()
        break
      case 'off':
        editDivArray.forEach((element) => {
          element.setAttribute('contenteditable', 'false')
        })
        edit.innerText = 'edit-off'
        edit.classList.add('btn-ghost')
        edit.classList.remove('btn-warning')
        break
    }
  }
  // NOTE 업로드 함수
  async function listUpload() {
    // FIXME 데이터 체인지 함수를 다른곳으로 옮겨야만 함.
    await dataChange()
      .then(async () => {
        console.log('2 디비업로드')
        await dbUpload()
        senderAlerterNotifier.sendNotificationWithoutStyle('task uploaded', 'success', 4000)
      })
      .then(() => {
        // console.log('3 알림창')
        // senderAlerterNotifier.sendNotificationWithoutStyle('task uploaded', 'success', 2000)
        // location.reload()
      })
      .catch((err) => {
        console.log(err)
        senderAlerterNotifier.sendNotificationWithoutStyle('task upload failed', 'danger', 5000)
      })
    // changeIndexes()

    // 인덱스 정보 변경시 each 블록에서 데이터 리로드하며 솔터블 데이터 바인딩이 깨짐.
    // location.reload() // 리스트 변경하면 리로드 때문에 보기 좋지 않음.
    // FIXME 그럼 솔터블 시행을 데이터바인딩 말고 다른걸로 해야할듯.

    async function dbUpload() {
      await dbClear().then(() => {
        kanban.forEach((item) => {
          switch (item.step) {
            case 'Todo':
              db.Todo.put(item)
              break
            case 'Process':
              db.Process.put(item)
              break
            case 'Complete':
              db.Complete.put(item)
              break
          }
        })
      })
      async function dbClear() {
        return await Promise.all([db.Todo.clear(), db.Process.clear(), db.Complete.clear()])
      }
    }
  }
  async function dataChange() {
    // 변경된 위치에 따라 스텝과 인덱스를 변경하는 함수
    // FIXME 현재 스텝이름이 변경되면 객체 정렬이 깨져 화면리로드를 해야만 재정렬 되는 문제가 있음.
    // 이를 고쳐내려면 이 함수 마지막에 객체배열을 순서정렬하는 로직이 필요.

    return new Promise((resolve) => {
      let indexCollection = document.querySelectorAll(
        '.indexNumber'
      ) as NodeListOf<HTMLInputElement>
      for (const indexElement of indexCollection) {
        // TODO 타이틀 이름의 고유값이어야함. 타이틀 이름 설정 & 변경시 고유값 유효성 검사 만들어야함
        const i = getOldIndex(indexElement)
        // changeStepName(i, indexElement) // 이 로직은 솔터블로 이동
        changeIndex(i, indexElement)
      }
      resolve(
        senderAlerterNotifier.sendNotificationWithoutStyle(
          'stepname, index rebase',
          'success',
          2000
        )
      )
    })

    function getOldIndex(indexElement: HTMLInputElement) {
      return kanban.findIndex((item) => item.title === indexElement.getAttribute('data-title'))
    }
    function changeIndex(i: number, indexElement: HTMLInputElement) {
      kanban[i].index = indexElement.innerText.trim()
    }
    function changeStepName(i: number, indexElement: HTMLInputElement) {
      kanban[i].step = getStepNameFromMoved(indexElement) as 'Todo' | 'Process' | 'Complete'

      function getStepNameFromMoved(indexElement: HTMLInputElement) {
        // TODO 로직이 돔 디자인에 의존적. 의존적이지 않게 변경할 필요가 있어보이는데 차후에 하자.
        return indexElement.parentElement?.parentElement?.previousElementSibling
          ?.getAttribute('data-step')
          ?.trim()
      }
    }
  }
  async function addList(e: Event) {
    kanban = kanbanSortHusks
    const button = <HTMLButtonElement>e.target
    const { newKanbanObj, stepIndex } = makeKanbanObj(button)
    kanbanSortHusks.splice(stepIndex, 0, newKanbanObj)
    taskTreeIdxReload()

    function makeKanbanObj(button: HTMLButtonElement) {
      const step = getStepName(button)
      const title = 'title'
      const task = ['1. task']
      const index = getNewIndex(button)
      const stepIndex = getStepIndex(step)
      return { newKanbanObj: { step, title, task, index }, stepIndex }
    }
    function getStepName(ButtonElement: HTMLButtonElement) {
      return ButtonElement.getAttribute('data-step') as 'Todo' | 'Process' | 'Complete'
    }
    function getNewIndex(button: HTMLButtonElement) {
      const stepIndex = kanbanSortHusks.findIndex((item) => item.step === getStepName(button))
      const lastTitleIndex = Number(kanban[stepIndex].index)
      return (lastTitleIndex + 1).toString()
    }
    function getStepIndex(step: 'Todo' | 'Process' | 'Complete') {
      return kanbanSortHusks.findIndex((item) => item.step === step)
    }
  }
  function changeIndexes() {
    let tempIdx = {
      Todo: Array(kanban.filter((item) => item.step === 'Todo').length).fill(0),
      Process: Array(kanban.filter((item) => item.step === 'Process').length).fill(
        kanban.filter((item) => item.step === 'Todo').length
      ),
      Complete: Array(kanban.filter((item) => item.step === 'Complete').length).fill(
        kanban.filter((item) => item.step === 'Todo' || item.step === 'Process').length
      )
    }
    kanbanTaskTreeIdx = tempIdx
  }
</script>

<AlertNotify positioningAlerting={'bottomLeft'} positioningNotifications={'topRight'} />

<div>
  <button class="btn btn-ghost btn-sm" on:click={listUpload}>list-upload</button>
  <button class="btn btn-ghost btn-sm" on:click={editToggle} id="edit">edit-off</button>
  <button
    class="btn btn-ghost btn-sm"
    on:click={() => {
      taskBlockExpand = !taskBlockExpand
    }}>list toggle</button
  >
</div>
{#if awaitKanban}
  <div class="flex gap-5 [bg-slate-200 shadow-md] p-1 mx-5 rounded-3xl" transition:blur>
    {#each Object.entries(kanbanTaskTreeIdx) as [stepName, stepIdxs]}
      <!-- ANCHOR 스텝 -->
      <div class="basis-1/3 bg-slate-100 rounded-lg drop-shadow-lg flex flex-col gap-2 py-5">
        <div class="bg-white flex justify-between items-center" data-step={stepName}>
          <div class="basis-1/3 " />
          <div class="basis-1/3  text-4xl text-center">{stepName}</div>
          <div class="basis-1/3  text-right p-1 items-center">
            <button
              class="btn btn-ghost hover:btn-warning btn-sm rounded-xl py-2 text-slate-400"
              data-step={stepName}
              on:click={addList}>+</button
            >
          </div>
        </div>
        <!-- ANCHOR 컨텐츠, 타이틀 태스크 리스트-->
        <div class="flex flex-col gap-2 [px-2]" data-sortable={stepName}>
          {#each stepIdxs as base, index}
            <div class="bg-slate-200 p-2 [rounded-xl]" data-title={kanban[base + index].title}>
              <div
                contenteditable="false"
                bind:textContent={kanban[base + index].index}
                class="indexNumber"
                data-title={kanban[base + index].title}
              />
              <div
                class="text-2xl title rounded-lg pb-1"
                contenteditable="false"
                bind:textContent={kanban[base + index].title}
              />
              {#if taskBlockExpand}
                <div class="bg-slate-300 shadow-inner rounded-lg" transition:slide>
                  {#each kanban[base + index].task as t}
                    <div contenteditable="false" bind:textContent={t} class="rounded-lg" />
                  {/each}
                </div>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
  개발자용 데스트 데이터
  {#each kanban as tasks}
    <div>
      {JSON.stringify(tasks)}
    </div>
  {/each}
{/if}

<h3>기능구현일지</h3>
<div>덱시를 통한 idb 접근</div>
<div>덱시의 라이브쿼리 사용한 경우 옵저버블을 처리하지 못해 라이브쿼리는 사용하지 않음</div>
<div>대신 프로미스를 이용해 가져온 데이터를 순차적으로 처리하게 하고 화면에 띄움</div>
<div>화면에 띄워진 정보가 있을때 sortablejs 컨테이너와 리스트를 등록</div>
<div>각 리스트가 이동할때마다 인덱스값이 변경되도록 onChange이벤트를 이용</div>
<div>하지만 바인딩된 데이터가 동기화가 안되는 문제 발생</div>
<div>dom은 스트링타입만 취급하는데 그 문제인가 싶어서 디비index 항목 타입을 스트링으로 변환</div>
<div>
  여전히 문제지속, 데이터 변경이 화면에서 변경되는게 아닌 코드상으로 변경되면 바인딩한 값이
  의미없어지는듯함
</div>
<div>결국 겉보기 인덱스와 객체데이터를 동기화시키는 함수를 작성,</div>
<div>태스크 문서 업로드 시에 한번만 발동하도록 하면 될듯.</div>
<h1>업데이트가 가능하게 하자.</h1>

<!-- 

{"step":"Todo","title":"todayWork","task":["1. task"],"index":4}
{"step":"Todo","title":"0.0.z","task":["1. task"],"index":3}
{"step":"Todo","title":"0.y.0","task":["1. task"],"index":2}
{"step":"Todo","title":"x.0.0","task":["1. task"],"index":1}
{"step":"Todo","title":"philosophy","task":["1. 자기경영을 위한 칸반도구","2. 팀경영을 위한 빌드업 칸반도구"],"index":0}
{"step":"Process","title":"getData with dexie","task":["1. 덱시를 통해 인덱스 디비에 저장된 데이터를 원하는 형태로 가져오기","2. 가져온 데이터를 반응 가능하게 화면에 뿌리기","3. 화면에 뿌려진 task를 수정하면 원래 소스에 반영하기"],"index":0}
{"step":"Complete","title":"sortablejs","task":["1. 리스트 이동시 인덱스값 변경할수 있게 수정","2. onChange메서드 이용"],"index":0}

 -->
