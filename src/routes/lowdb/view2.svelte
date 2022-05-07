<script lang="ts">
  type node = { [key: string]: {name:string[], type:string}, }
  type edge = { [key: string]: {name:string[]}, }
  interface nodeInfo {
    id : string,
    krName : string,
    type : "node"
  }
  interface edgeInfo {
    id : string,
    krName : string,
    type : "unary"|"binary"|"polynomial"
  }
  type set = { node:node, edge:edge }


  const set:set = {
    node:{},
    edge:{}
  }
  const {node, edge} = set

  function addNode(nodeInfo:nodeInfo|edgeInfo):void {
    const {id, krName, type }= nodeInfo
    if (id) {
      node[id] = {
        name: [krName],
        type
      }
    }
  }



  const mean : edgeInfo = {
    id: "meaning",
    krName: "의미",
    type: "unary"
  }

  const categories : edgeInfo = {
    id: "categories",
    krName: "카테고리",
    type: "polynomial"
  }

  const math : nodeInfo = {
    id: "math",
    krName: "수학",
    type: "node"
  }

  addNode(mean)
  addNode(categories)
  addNode(math)
  

  console.log(set)

</script>


<h2>all nodes</h2>
{#each Object.keys(node) as item}
<div>
  {node[item].name}({item})  
</div>
  
{/each}