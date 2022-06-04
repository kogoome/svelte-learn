<script lang="ts">
  import Sortable from 'sortablejs'
  import { db, type Kanban } from './db'
  import { slide, blur } from 'svelte/transition'

  // NOTE 겟 데이터
  type StepIndex = {
    Todo: number[]
    Process: number[]
    Complete: number[]
  }
  let stepIdxsArray: StepIndex = { Todo: [], Process: [], Complete: [] }
  let all = getDB()
  let awaitKanban = false
  let kanban = [] as Kanban[]
  async function getDB() {
    const Todo = db.Todo.reverse().toArray()
    const Process = db.Process.reverse().toArray()
    const Complete = db.Complete.reverse().toArray()
    const all = await Promise.all([Todo, Process, Complete]).then(([Todo, Process, Complete]) => {
      const kanban: Kanban[] = [...Todo, ...Process, ...Complete]
      const kanbanIndexArr = Array.from({ length: kanban.length }, (v, i) => i)
      stepIdxsArray['Todo'] = kanbanIndexArr.slice(0, Todo.length)
      stepIdxsArray['Process'] = kanbanIndexArr.slice(Todo.length, Todo.length + Process.length)
      stepIdxsArray['Complete'] = kanbanIndexArr.slice(Todo.length + Process.length)
      return kanban
    })
    return all
  }
  all
    .then((all) => {
      kanban = all
      awaitKanban = true
    })
    .then(() => {
      sortableOn()
    })

  // 솔터블 데이터
  type Containers = {
    [key: string]: HTMLElement
  }
  // let stepList = ['Todo', 'Process', 'Complete'] // Object.keys(stepIdxsArray) 로 대체 가능
  let containersObj: Containers = {}
  let expand = true

  function sortableOn() {
    Object.keys(containersObj).forEach((container) => {
      Sortable.create(containersObj[container], {
        group: {
          name: container,
          put: true
        },
        animation: 200,
        onChange: (e: any) => {
          // 현재 컨테이너 인덱스 정렬
          const sortableListTo = e.to.children
          let iTarget = sortableListTo.length - 1
          for (let child of sortableListTo) {
            child.firstChild.innerText = iTarget + ' '
            iTarget--
          }
        },
        onEnd: (e: any) => {
          // 이전 컨테이너 인덱스 정렬
          const sortableListTarget = e.target.children
          let iTo = sortableListTarget.length - 1
          for (let child of sortableListTarget) {
            child.firstChild.innerText = iTo + ' '
            iTo--
          }
          // 거치는 컨테이너 정렬 로직이 없음.
          // srcELement랑 target 이랑 차이가 안보임.
        }
      })
    })
  }

  // 디비 업데이트 전에 할 작업

  function editToggle() {
    // 중복코드 잘 보임  리팩토링 필요
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
  function listUpload() {
    dataChange()
    console.log(kanban)
    dbUpload()

    function dbUpload() {
      kanban.forEach((item) => {
        item.step
        switch (item.step) {
          case 'Todo':
            db.Todo.clear()
            db.Todo.put(item)
            break
          case 'Process':
            db.Process.clear()
            db.Process.put(item)
            break
          case 'Complete':
            db.Complete.clear()
            db.Complete.put(item)
            break
        }
      })
    }

    function dataChange() {
      let indexCollection = document.querySelectorAll(
        '.indexNumber'
      ) as NodeListOf<HTMLInputElement>

      for (let i = 0; i < indexCollection.length; i++) {
        const immutableTitle = indexCollection[i].nextElementSibling?.innerHTML
        const mutableIndex = indexCollection[i].innerText
        const mutableStep =
          indexCollection[i].parentElement?.parentElement?.previousElementSibling?.innerHTML
        // console.log(mutableStep, immutableTitle, mutableIndex)
        // kanban배열에서 title을 검색해서 인덱스 반환시키고, 인덱스로 객체 불러와서 데이터 변조하자.
        const kIndex = kanban.findIndex((item) => item.title === immutableTitle)

        kanban[kIndex].step = mutableStep as 'Todo' | 'Process' | 'Complete'
        kanban[kIndex].index = mutableIndex
      }
    }
  }

  function addList() {}
</script>

<div>
  <button class="btn btn-ghost btn-sm" on:click={listUpload}>list-upload</button>
  <button class="btn btn-ghost btn-sm" on:click={editToggle} id="edit">edit-off</button>
  <button
    class="btn btn-ghost btn-sm"
    on:click={() => {
      expand = !expand
    }}>list toggle</button
  >
</div>
{#if awaitKanban}
  <!-- await 블록을 사용하면 일부 데이터바인딩에서 오류가 발생. 상위 데이터에서 프로미스 덴을 이용하여 await블록을 회피할수 잇는 boolean 값으로 대체 -->
  <div class="flex gap-5 [bg-slate-200 shadow-md] p-1 m-5 rounded-3xl" transition:blur>
    {#each Object.entries(stepIdxsArray) as [stepName, stepIdxs]}
      <!-- 스텝 -->
      <div class="basis-1/3 bg-slate-100 rounded-lg drop-shadow-lg flex flex-col gap-2 py-5">
        <div class="bg-white flex justify-between items-center">
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
        <div bind:this={containersObj[stepName]} class="flex flex-col gap-2 [px-2]">
          {#each stepIdxs as titleIdx}
            <!-- 타이틀 -->
            <div class="bg-slate-200 p-2 [rounded-xl]">
              <div
                contenteditable="false"
                bind:textContent={kanban[titleIdx].index}
                class="indexNumber hidden"
              />
              <div
                class="text-2xl title rounded-lg pb-1"
                contenteditable="false"
                bind:textContent={kanban[titleIdx].title}
              />

              {#if expand}
                <div class="bg-slate-300 shadow-inner rounded-lg">
                  {#each kanban[titleIdx].task as t}
                    <div
                      contenteditable="false"
                      bind:textContent={t}
                      class="rounded-lg"
                      transition:slide
                    />
                  {/each}
                </div>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
  <!-- 개발자용 데스트 데이터
  {#each kanban as tasks}
    <div>
      {JSON.stringify(tasks)}
    </div>
  {/each} -->
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
