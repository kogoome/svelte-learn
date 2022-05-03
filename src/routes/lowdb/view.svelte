<script context="module">
  export const load = async () => {
    const {nodeJson} = await fetch('/api/lowdb', {method: 'GET'})
    .then(res => res.json())
    .catch(err => console.log(err));
    return {
      props:{nodeJson}
    }
  }
</script>

<script>
  export let nodeJson
  $: english = false //#if 에서 사용
  $: description = false //#if 에서 사용
  $: langIndex = !english? 0 : 1 //#each 에서 사용
  let username = "kogoome"

  const setAllNodes = async () => {
    nodeJson = nodeJson.filter(node => node.name.indexOf("")<0)
    const {msg} = await fetch('/api/lowdb', {
      method: 'POST', 
      body: JSON.stringify(nodeJson)
    }).then(res => res.json())
    .catch(err => console.log(err));
    console.log(msg)
  }

  const addNode = async () => {
    const voidObj =  { "name": ["",""], "description": ["", ""] }
    nodeJson.unshift(voidObj)
    descrive("on")
    await editToggle("on") 
    langIndex ++
    langIndex --
  }

  const deleteNode = (e) => {
    const nodeName = e.target.getAttribute("data-index")
    nodeJson = nodeJson.filter(node => node.name[langIndex]!=nodeName)
    langIndex ++
    langIndex --
  }

  const editToggle = async (option) => {
    // 중복코드 잘 보임  리팩토링 필요
    const edit = document.getElementById('edit')
    if (edit!==null) {
      if (option!=="on") option = edit.innerText==="EDIT-OFF"? "on" : "off"
      switch(option) {
        case "on":
          await descrive("on")
          let editDivArray1 = document.querySelectorAll('[contenteditable]')
          editDivArray1.forEach(element => {element.setAttribute('contenteditable', "true")})
          edit.innerText = "edit-on"
          edit.classList.add('btn-warning')
          break;
        case "off":
          let editDivArray2 = document.querySelectorAll('[contenteditable]')
          editDivArray2.forEach(element => {element.setAttribute('contenteditable', "false")})
          edit.innerText = "edit-off"
          edit.classList.remove('btn-warning')
          break;
      }
    } else {
      console.log("button[#edit] is not found")
    }      
  }

  const descrive = async (option) => {
    const desc = document.getElementById('desc')
    console.log(option.length)
    if (desc!==null) {
      switch(option) {
        case "on":
          description = true
          desc.innerHTML = `describe-on`
          desc.classList.add('btn-warning')
          break;
        case "off":
          description = false
          desc.innerHTML = `describe-off`
          desc.classList.remove('btn-warning')
          break;
        default:
          description = !description
          desc.innerHTML = description ? `describe-off` : `describe-on`
          desc.classList.toggle('btn-warning')
      }
    }

  }
</script>

<!-- 언어옵션 글로벌사용으로 전환시켜야함 -->
<label class="flex justify-end w-fit ml-auto">
  english <input type="checkbox" class="toggle ml-1" bind:checked={english}>
</label>

<!-- 카테고리:노드 -->
<div class="items-center">
  <span class="text-2xl">all nodes</span>
  <button class="btn btn-xs active:btn-accent" on:click={addNode}>add-node</button>
  <button class="btn btn-xs" on:click={editToggle} id="edit" >edit-off</button>
  <button class="btn btn-xs" on:click={descrive} id="desc" >description-off</button>
  <button class="btn btn-xs active:btn-error" on:click={setAllNodes}>all save</button>
</div>

{#each nodeJson as node (node.description)}
  <div class="flex justify-start items-center gap-2">
    <div class="flex justify-start items-center">
      <div contenteditable="false" bind:textContent={node.name[langIndex]} placeholder="한글노드이름"/>
      {#if !english}
      (<div contenteditable="false" bind:textContent={node.name[1]} placeholder="nodeName"/>)
      {/if}
    </div>
    {#if description}
    <div class="flex justify-start items-center">
      <div contenteditable="false" bind:textContent={node.description[langIndex]} placeholder="한글설명"/>
      {#if !english}
      (<div contenteditable="false" bind:textContent={node.description[1]} placeholder="description"/>)
      {/if}
    </div>
    {/if}
    <button class="btn btn-xs ml-auto" data-index={node.name[langIndex]} on:click={deleteNode}>삭제</button>
  </div>
{/each}

<style>
  [contenteditable]:empty:before{
    content: attr(placeholder);
    color: #555;
    pointer-events: none;
    display: block; /* For Firefox */
  }
</style>