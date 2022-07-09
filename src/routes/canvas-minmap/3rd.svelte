<script lang="ts">
  import Textarea from './Textarea.svelte'
  type panel = { t: string; l: string }
  let panels: panel[]
  $: panels = []
  //

  function makePanel(e: MouseEvent) {
    const t = `${e.clientY}px`
    const l = `${e.clientX}px`
    panels = [...panels, { t, l }]
    console.log(panels)
  }

  function editableFalse() {
    // const divs = document.querySelectorAll('[contenteditable="true"]')
    // divs.forEach((div) => {
    //   div.setAttribute('contenteditable', 'false')
    // })
  }
</script>

<div
  class="relative bg-white w-full h-[100vh]"
  on:dblclick={makePanel}
  on:click|stopPropagation={editableFalse}
  id="container"
>
  <!-- <div class="absolute flex top-[20px] left-14 hover:z-50">
    <Textarea />
  </div> -->
  {#each panels as panel}
    <div class="absolute flex hover:z-50" style="top:{panel.t}; left:{panel.l}">
      <Textarea />
    </div>
  {/each}
  <!-- <Textarea /> -->
</div>
