<script lang="ts">
  import { openDB } from 'idb'
  import type { kanban } from './kanbanScheme'
  import { Jellyfish } from 'svelte-loading-spinners'
  let kanbanSteps = ['Todo', 'Process', 'Complete']
  let kanban: kanban[] = []
  type stepTaskIndex = { [key: string]: number[] }
  let stepTaskIndex: stepTaskIndex
  let loading = true
  $: kanban, stepTaskIndex, loading


  // idb는 기존의 indexedDB를 가독성 좋게 래핑되어있다. 
  // 기존형식을 그대로 사용하고 있기 때문에
  // 
  async function idbOpen() {
    const db = await openDB('kanban', 1, {
      upgrade(db) {
        kanbanSteps.forEach((step) => {
          db.createObjectStore(step, { keyPath: 'index' })
        })
      }
    })
    console.log('db opened')
    db.close()
  }

  async function getAll(arr: kanban[]) {
    const db = await openDB('kanban', 1)
    kanbanSteps.forEach((step) => {
      db.getAll(step).then((data) => {
        arr.push(...data.sort((a, b) => b.index - a.index))
      })
    })
    db.close()
  }

  async function starter() {
    let result: kanban[] = []
    await getAll(result)
    const interval = setInterval(() => {
      if (result.length > 0) {
        clearInterval(interval)
        console.log('load success')
        loading = false
        kanban = result
        stepTaskIndex = makeDataStructure(kanban)
      } else {
        loading = true
      }
    }, 50)
  }

  starter()

  function makeDataStructure(kanban: kanban[]) {
    const stepIndex = [
      kanban.findIndex((item) => item.step === kanbanSteps[0]),
      kanban.findIndex((item) => item.step === kanbanSteps[1]),
      kanban.findIndex((item) => item.step === kanbanSteps[2])
    ]
    const totalTaskIndex = Array.from({ length: kanban.length }, (v, i) => i) // 총 데이터 인덱스 정보

    const stepTaskIndex: stepTaskIndex = {
      Todo: totalTaskIndex.slice(stepIndex[0], stepIndex[1]),
      Process: totalTaskIndex.slice(stepIndex[1], stepIndex[2]),
      Complete: totalTaskIndex.slice(stepIndex[2], kanban.length)
    }
    return stepTaskIndex
  }

  type color = {
    [key: string]: string
  }
  export const bgColor: color = {
    Todo: 'bg-slate-300',
    Process: 'bg-slate-400',
    Complete: 'bg-slate-500'
  }
  export const txtColor: color = {
    Todo: 'text-slate-700',
    Process: 'text-slate-900',
    Complete: 'text-slate-200'
  }

  function editToggle() {
    // 중복코드 잘 보임  리팩토링 필요
    const edit = document.getElementById('edit')
    if (edit == null) throw new Error('edit button is null')
    let option = edit.innerText === 'EDIT-OFF' ? 'on' : 'off'
    let editDivArray = document.querySelectorAll('[contenteditable]')
    switch (option) {
      case 'on':
        editDivArray.forEach((element) => {
          element.setAttribute('contenteditable', 'true')
        })
        edit.innerText = 'edit-on'
        edit.classList.remove('btn-ghost')
        edit.classList.add('btn-warning')
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
</script>

<svelte:head>
  <title>Todo</title>
</svelte:head>

{#if loading}
  <div class="h-screen flex justify-center items-center">
    <Jellyfish size="200" color="#FF3E00" unit="px" duration="1s" />
  </div>
{:else}

  {#await kanban}
    <p>...waiting</p>
  {:then kanban}
    <div class="flex justify-between items-end">
      <div class="flex-col">
        <div class="basis-1/12">saveAll</div>
      </div>
      <h1 class="basis-10/12 text-center">업무 진행용 TODO 칸반 제작</h1>
      <div class="flex-col">
        <button class="basis-1/12 btn btn-ghost btn-sm" on:click={editToggle} id="edit"
          >edit-off</button
        >
      </div>
    </div>

    <div class="flex rounded-xl bg-slate-200 p-3 m-3 justify-between gap-3">
      <div class="basis-1/3 w-full bg-slate-300 rounded-md pb-8" style="display:none;" id="clock">
        <h1 class="text-center bg-white">clock</h1>
        <div class="px-3 todayWork">
          <input id="clockWork" type="checkbox" class="hidden peer" />
          <label for="clockWork"><h1>todayWork</h1></label>
          <ul
            class="h-0 -translate-y-3 opacity-0 overflow-hidden peer-checked:h-fit peer-checked:opacity-100 peer-checked:transform-none transition-all duration-300"
          >
            <div>task</div>
          </ul>
        </div>
        <!-- 뽀모도로 시계 만들기 -->
      </div>
      {#each kanbanSteps as stepName}
        <!-- {i} 인덱스 보기 -->
        <div class="basis-1/3 w-full {bgColor[stepName]} rounded-md pb-8" id={stepName}>
          <!-- 스텝 -->
          <h1 class="text-center bg-white">{stepName}</h1>
          {#each stepTaskIndex[stepName] as i}
            <!-- {i} 인덱스보기 -->
            <div class="px-3">
              <input id={kanban[i].title} type="checkbox" class="hidden peer" checked />
              <label for={kanban[i].title}>
                <!-- 타이틀 -->
                <h1 class={txtColor[kanban[i].step]}>{kanban[i].title}</h1>
              </label>
              <ul
                class="h-0 -translate-y-3 opacity-0 overflow-hidden peer-checked:h-fit peer-checked:opacity-100 peer-checked:transform-none transition-all duration-300"
              >
                {#each kanban[i].task as list}
                  <!-- 할일 리스트 -->
                  <div
                    contenteditable="false"
                    class={txtColor[kanban[i].step]}
                    bind:textContent={list}
                  />
                {/each}
              </ul>
            </div>
          {/each}
        </div>
      {/each}
    </div>

    개발 참고용 데이터
    {#each Array.from({ length: kanban.length }, (v, i) => i) as i}
      <div>
        {JSON.stringify(kanban[i])}
      </div>
    {/each}

    
  {:catch error}
    <p style="color: red">{error}</p>
  {/await}
{/if}
