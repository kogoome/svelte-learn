<script lang="ts">
  import { onMount } from "svelte";
  onMount(() => {
      const set = {
      node:[],
      edge:[]
    }
    const node = set["node"]
    const edge = set["edge"]

    function addNode(nodeInfo:nodeInfo):void {
      const {id, krName, enDescription, krDescription, type }= nodeInfo
      if (id) {
        node[id] = {
          name: [krName],
          description: [enDescription, krDescription],
          type
        }
      }
    }

    interface nodeInfo {
      id : string,
      krName : string,
      enDescription : string,
      krDescription : string,
      type : "unary"|"binary"|"polynomial"
    }

    const mean : nodeInfo = {
      id: "meaning",
      krName: "의미",
      enDescription: "context meaning",
      krDescription: "문맥상의 의미",
      type: "unary"
    }
    addNode(mean)
    console.log(set)
  }


</script>

{JSON.stringify(set)}

