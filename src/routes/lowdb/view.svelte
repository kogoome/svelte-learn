<script context="module">
  export const load = async ({ fetch }) => {
    const { nodeArray, edgeJson } = await fetch('/api/lowdb', { method: 'GET' })
      .then((res) => res.json())
      .catch((err) => console.log(err))

    return {
      props: { nodeArray, edgeJson }
    }
  }
</script>

<script>
  import { fly, fade, slide } from 'svelte/transition'
  /** @type {{ name: string[]; description: string[]; _id:string }[]} */
  export let nodeArray
  export let edgeJson // 복사해서 아이디 검색한거 추가. 세이브는 원본에 아이디만 추가
  let states = { english: false, description: false, nodeVisible: false, edgeVisible: false }
  $: langIndex = !states.english ? 0 : 1 //#each 에서 사용
  let username = 'kogoome'
  let cloneEdgeJson = ((_edgeJson) => {
    const cloneEdgeJson = JSON.parse(JSON.stringify(_edgeJson))
    for (let edge in cloneEdgeJson) {
      cloneEdgeJson[edge] = cloneEdgeJson[edge].map((node) => {
        const includes = node.includes.map((includeId) => {
          return includeId ? findNodeById(includeId) : null
        })
        node = findNodeById(node._id)
        node['includes'] = includes
        return node
      })
    }
    return cloneEdgeJson
  })(edgeJson)

  function findNodeById(_id) {
    return nodeArray.find((node) => node._id === _id)
  }
  async function setAllNodes() {
    nodeArray = nodeArray.filter((node) => node.name.indexOf('') < 0)
    const { msg } = await fetch('/api/lowdb', {
      method: 'POST',
      body: JSON.stringify(nodeArray)
    })
      .then((res) => res.json())
      .catch((err) => console.log(err))
    console.log(msg)
  }
  async function addNode() {
    const voidObj = {
      name: ['한글노드이름', 'nodename'],
      description: ['한글노드설명', 'description']
    }
    nodeArray.unshift(voidObj)
    descrive('on')
    await editToggle('on')
    langIndex++
    langIndex--
  }
  function deleteNode(e) {
    const nodeName = e.target.getAttribute('data-index')
    nodeArray = nodeArray.filter((node) => node.name[langIndex] != nodeName)
    langIndex++
    langIndex--
  }
  async function editToggle(option) {
    // 중복코드 잘 보임  리팩토링 필요
    const edit = document.getElementById('edit')
    if (edit !== null) {
      if (option !== 'on') option = edit.innerText === 'EDIT-OFF' ? 'on' : 'off'
      switch (option) {
        case 'on':
          states.nodeVisible = true
          await descrive('on')
          let editDivArray1 = document.querySelectorAll('[contenteditable]')
          editDivArray1.forEach((element) => {
            element.setAttribute('contenteditable', 'true')
          })
          edit.innerText = 'edit-on'
          edit.classList.add('btn-warning')
          break
        case 'off':
          let editDivArray2 = document.querySelectorAll('[contenteditable]')
          editDivArray2.forEach((element) => {
            element.setAttribute('contenteditable', 'false')
          })
          edit.innerText = 'edit-off'
          edit.classList.remove('btn-warning')
          break
      }
    } else {
      console.log('button[#edit] is not found')
    }
  }
  async function descrive(option) {
    const desc = document.getElementById('desc')
    if (desc !== null) {
      if (option !== 'on') option = desc.innerText === 'DESCRIPTION-OFF' ? 'on' : 'off'
      console.log(option)
      switch (option) {
        case 'on':
          states.description = true
          desc.innerHTML = `DESCRIPTION-ON`
          desc.classList.add('btn-warning')
          break
        case 'off':
          states.description = false
          desc.innerHTML = `DESCRIPTION-OFF`
          desc.classList.remove('btn-warning')
          break
      }
    } else {
      console.log('button[#desc] is not found')
    }
  }
</script>

<!-- 상단 옵션 : 언어옵션 글로벌사용으로 전환시켜야함 -->
<div class="flex justify-end w-fit ml-auto gap-2">
  <button class="btn btn-xs" on:click={editToggle} id="edit">edit-off</button>
  <button class="btn btn-xs active:btn-error" on:click={setAllNodes}>all save</button>
  <label class="flex gap-2">
    {states.english ? 'english' : 'korean'}
    <input type="checkbox" class="toggle" bind:checked={states.english} />
  </label>
</div>

<label>
  <input type="checkbox" bind:checked={states.nodeVisible} class="hidden peer" />
  <div class="flex gap-1 items-center peer-checked:bg-slate-100 transition-all duration-500">
    <span class="text-2xl">all nodes</span>
    <button class="btn btn-xs active:btn-accent" on:click={addNode}>add-node</button>
    <button class="btn btn-xs" on:click={descrive} id="desc">description-off</button>
  </div>
</label>

<!-- 노드 -->
{#if states.nodeVisible}
  <div transition:slide>
    {#each nodeArray as node (node.description)}
      <div class="flex justify-start items-center gap-2" transition:fade>
        <div class="flex justify-start items-center">
          <div
            contenteditable="false"
            bind:textContent={node.name[langIndex]}
            class="tooltip tooltip-right tooltip-info"
            data-tip={node.description[langIndex]}
          />
          {#if !states.english}
            (
            <div contenteditable="false" bind:textContent={node.name[1]} />
            )
          {/if}
        </div>
        {#if states.description}
          <div class="flex justify-start items-center" transition:fade>
            <div contenteditable="false" bind:textContent={node.description[langIndex]} />
            {#if !states.english}
              (
              <div contenteditable="false" bind:textContent={node.description[1]} />
              )
            {/if}
          </div>
        {/if}
        <div class="ml-auto flex justify-end">
          <button class="btn btn-xs btn-ghost text-slate-400" data-index={node._id}
            >엣지로 등록</button
          >
          <button
            class="btn btn-xs btn-ghost text-slate-400"
            data-index={node.name[langIndex]}
            on:click={deleteNode}>삭제</button
          >
        </div>
      </div>
    {/each}
  </div>
{/if}

<label>
  <input type="checkbox" bind:checked={states.edgeVisible} class="hidden peer" />
  <div class="flex gap-1 items-center peer-checked:bg-slate-100 transition-all duration-500">
    <span class="text-2xl">all edges</span>
    <button class="btn btn-xs active:btn-accent">add-edge</button>
  </div>
</label>

{#if states.edgeVisible}
  <div transition:slide>
    <div transition:fade>
      <!-- 엣지 이름 하드코딩됨 -->
      <div class="text-lg">categories</div>
      {#each cloneEdgeJson.categories as category}
        <div class="tooltip tooltip-right tooltip-info" data-tip={category.description[langIndex]}>
          {category.name[langIndex]}{#if !states.english}({category.name[1]}){/if}
        </div>
        {#each category.includes as include}
          <div>{include}</div>
        {/each}
      {/each}
    </div>
  </div>
{/if}
