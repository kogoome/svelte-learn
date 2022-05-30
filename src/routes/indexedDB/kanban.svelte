<script lang="ts">
  import {
    kanban as k,
    type kanban,
    stepIndex,
    stepDataIndex,
    bgColor,
    txtColor
  } from '$lib/IDB/kanbanScheme'
  import _ from 'lodash-es'
  import { DBOpen, getAll, modifyAll, versionUp } from '$lib/IDB/IDBMethod'

  DBOpen()
  let kanban = _.cloneDeep(k)

  // getAll().then((data) =>
  //   setTimeout(() => {
  //     kanban = data
  //   }, 100)
  // )

  readIDB()

  let readCount = 0
  function readIDB() {
    getAll(kanban).then((data) => {
      const interver = setInterval(() => {
        console.log('interver ... ')
        if (data[4].task.length > 0) {
          clearInterval(interver)
          kanban = data
          console.log('load success')
          listToggle()
        } else {
          console.log('load fail')
          readCount++
          if (readCount > 10) {
            clearInterval(interver)
            console.log('load fail')
            readIDB()
          }
        }
      }, 200)
    })
  }

  async function modifyWarp() {
    await modifyAll(kanban)
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
  function listToggle() {
    const list = document.getElementById('list')
    if (list == null) throw new Error('list button is null')
    let option = list.innerText === 'LIST-OFF' ? 'on' : 'off'
    let editDivArray = document.querySelectorAll('[type="checkbox"]')
    switch (option) {
      case 'on':
        editDivArray.forEach((element) => {
          element.setAttribute('checked', 'checked')
        })
        list.innerText = 'list-on'
        list.classList.remove('btn-ghost')
        list.classList.add('btn-warning')
        break
      case 'off':
        editDivArray.forEach((element) => {
          element.removeAttribute('checked')
        })
        list.innerText = 'list-off'
        list.classList.add('btn-ghost')
        list.classList.remove('btn-warning')
        break
    }
  }
</script>

<svelte:head>
  <title>Todo</title>
</svelte:head>

<div class="flex justify-between items-end">
  <div class="flex-col">
    <div class="basis-1/12" on:click={readIDB}>readIDB</div>
    <div class="basis-1/12" on:click={modifyWarp}>IDBputAll</div>
  </div>
  <!-- <button class="btn btn-ghost btn-sm" on:click={editToggle} id="edit">edit-off</button> -->
  <h1 class="basis-10/12 text-center">업무 진행용 TODO 칸반 제작</h1>
  <div class="flex-col">
    <button class="basis-1/12 btn btn-ghost btn-sm" on:click={listToggle} id="list">list-off</button
    >
    <button class="basis-1/12 btn btn-ghost btn-sm" on:click={editToggle} id="edit">edit-off</button
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
  {#each stepIndex as i}
    <!-- {i} 인덱스 보기 -->
    <div class="basis-1/3 w-full {bgColor[kanban[i].step]} rounded-md pb-8" id={kanban[i].step}>
      <!-- 스텝 -->
      <h1 class="text-center bg-white">{kanban[i].step}</h1>
      {#each stepDataIndex[kanban[i].step] as i}
        <!-- {i} 인덱스보기 -->
        <div class="px-3">
          <input id={kanban[i].title} type="checkbox" class="hidden peer" />
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

{#each Array.from({ length: kanban.length }, (v, i) => i) as i}
  <div>
    {JSON.stringify(kanban[i])}
  </div>
{/each}
