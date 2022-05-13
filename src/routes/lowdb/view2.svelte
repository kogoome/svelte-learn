<script lang="ts">
  // 타입
  type node = { [key: string]: {name:string[], type:string}, }
  type edge = { [key: string]: {name:string[]}, }
  type nodeInfo = { id : string, krName : string, type : "node"|"void" }
  type edgeInfo = { id : string, krName : string, type : "unary"|"binary"|"polynary" }
  type db = { node:node, edge:edge }
  // 디비 대신 사용
  const db:db = { node:{}, edge:{} }
  const {node, edge} = db
  const mean : edgeInfo = { id: "meaning", krName: "의미", type: "unary" }
  const categories : edgeInfo = { id: "categories", krName: "카테고리들", type: "polynary" }
  const math : nodeInfo = { id: "math", krName: "수학", type: "node" }
  const memo : edgeInfo = { id: "memo", krName: "메모", type: "unary" }
  let voidInfo : nodeInfo|edgeInfo = { id: "void", krName: "비어있음", type: "void" }
  let langIndex = 0

  // 노드 추가 작동 함수
  function addNode(nodeInfo:nodeInfo|edgeInfo):void {
    const { id, krName, type } = nodeInfo
    if (id) node[id] = { name: [krName], type }
  }
  addNode(mean);addNode(categories);addNode(math);addNode(memo)

  // 노드 검색 추천어 배열 작성
  type nodeArray = { name: string[]; type: string; id: string; }[]
  let nodeArray = updateSearchNodeArray(node)
  function updateSearchNodeArray(node:node) {
    return Object.keys(node).map(id => { return {id, ...node[id]} }) 
  }

  // 유져 노드 작성
  const nodeTypes = [ "node", "unary", "binary", "polynary" ]
  function addUserNode():void { 
    const regex = /^[a-z]/
    if(voidInfo.id!=="void" && regex.test(voidInfo.id) && voidInfo.type!=="void") {
      voidInfo.id = voidInfo.id.toLowerCase()
      addNode(voidInfo)
      nodeArray = updateSearchNodeArray(node)
      voidInfo = { id: "void", krName: "비어있음", type: "void" }
    }
  }
  // 노드 한글이름 수정
  function modify(e:Event):void {
    const button = (<Element>e.target)
    let contenteditable = ""
    switch (button.innerHTML) {
      case "e-on" :
        button.innerHTML = "e-off"
        contenteditable = "false"
        break
      case "e-off" :
        button.innerHTML = "e-on"
        contenteditable = "true"
        break
    } 
    const parent = (<Element>e.target).parentElement
    const childs = parent?.querySelectorAll("div")
    if (!childs) { return }
    childs?.forEach(child => {
      child.setAttribute('contenteditable', contenteditable)
    })
    parent?.classList.toggle("bg-gray-100")
    button.classList.toggle("btn-ghost")
    button.classList.toggle("btn-warning")
    childs[0].focus()
  }
  function deleteNode(e:Event):void {
    const id = (<Element>e.target).getAttribute("data-id")
    if (!id) { return }
    delete node[id]
    langIndex ++
    langIndex --
  }

  // 노드 추가 되면 업데이트 안됨. 노드 추가시 업데이트 하는걸로 변경
  const edgeArray = Object.keys(edge).map(id => { return {id, ...edge[id]} })
  let autoCompleteNodeArr:nodeArray = []
  function search(e:Event) {
    let userInputText = (<HTMLInputElement>e.target).value
    let lang = langSelector(userInputText)
    switch (lang) {
      case "kr":
        autoCompleteNodeArr = nodeArray.filter(node => node.name.includes(userInputText))
        break
      default:
        autoCompleteNodeArr = nodeArray.filter(node => node.id.includes(userInputText))
        break
    }
    function langSelector(userInputText : string) {
      const krRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g
      const enRegex = /[a-z]/g
      const lang = userInputText.match(krRegex) ? "kr" : "en"
      return lang
    }
  }
</script>

<h2>all nodes</h2>
<!-- 노드 넣기 더미 -->
<div class="flex bg-slate-100" id="nodelist">
  <div contenteditable="true" bind:textContent={voidInfo.krName}/>
  (<div contenteditable="true" bind:textContent={voidInfo.id}/>)
  <div class="flex ml-auto gap-2">
    type :
    {#each nodeTypes as type, idx}
      <label class="flex items-center">
        <input type="radio" bind:group={voidInfo.type} name="type" class="radio radio-sm peer hidden" value={type}/>
        <div class="btn btn-xs btn-ghost peer-checked:btn-warning">
          {type}
        </div>
      </label>
    {/each}
  </div>
  <button class="btn btn-xs btn-primary ml-auto" on:click={addUserNode}>add</button>
</div>

{#each Object.keys(node) as item (item)}
  <div class="flex">
    <div contenteditable="false" bind:textContent={node[item].name[langIndex]}/>
    (<div contenteditable="false" bind:textContent={item}/>)
    <!-- 객체의 키값이 변경 안되는 문제가있음. 그냥둘지 해결할지? -->
    <!-- 만약 키값을 변경하고자 한다면, 엘리먼트 치환하고 텍스트 받아서 새로 객체 추가하고, 기존객체는 지우는 방식으로 사용 -->
    <button class="ml-auto btn btn-xs btn-ghost text-slate-400" on:click={modify}>e-off</button>
    <button class="btn btn-xs btn-ghost text-slate-400" data-id={item} on:click={deleteNode}>d</button>
  </div>
{/each}



<h2>all edges</h2>

<div class="flex flex-col">
  <input type="text" class="peer input input-xs w-screen bg-slate-50" on:keyup={search} placeholder="search nodename"/>
  <div class="relative invisible peer-focus:visible">
    <div class="absolute left-0 bg-blue-300 w-full">
      {#each autoCompleteNodeArr as node}
        <div class=" hover:btn-primary">
          {JSON.stringify(node)}
        </div>
      {/each}
    </div>
  </div>
</div>
아랫공간에있는 데이터