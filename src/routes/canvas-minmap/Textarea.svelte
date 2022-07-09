<script lang="ts">
  import { onMount } from 'svelte'
  export let content = ''
  let box: HTMLDivElement
  let text: HTMLDivElement
  $: if (text && text.scrollHeight) {
    box.style.height = text.scrollHeight + 'px'
  }
  onMount(() => {
    box.style.width = `176px`
    box.style.height = `80px`
    text = box.firstElementChild as HTMLDivElement
    text.style.fontSize = `50px`
  })

  function resize(e: MouseEvent) {
    const fontSize = Number(text.style.fontSize.replace('px', ''))
    const x = Number(box.style.width.replace('px', '')) + e.movementX * 0.83
    const y = fontSize * 1.5 + e.movementY * 0.83
    const f = fontSize + e.movementY * 0.6
    box.style.width = x + 'px'
    box.style.height = y + 'px'
    if (fontSize <= 120 && fontSize > 10) text.style.fontSize = f + 'px'
    else if (fontSize < 20) text.style.fontSize = `20px`
    else text.style.fontSize = `120px`
  }
  function stopResize() {
    box.classList.remove('z-100')
    document.removeEventListener('mousemove', resize, false)
    document.removeEventListener('mouseup', stopResize, false)
  }
  function resizer() {
    box.classList.add('z-100')
    console.log(box.style.width, box.style.height)
    document.addEventListener('mousemove', resize, false)
    document.addEventListener('mouseup', stopResize, false)
  }
  function keyResize(e: KeyboardEvent) {
    if (e.keyCode === 8) {
      const fontSize = Number(text.style.fontSize.replace('px', ''))
      box.style.height = fontSize * 1.5 + 'px'
    } else if (e.keyCode === 27) {
      text.setAttribute('contenteditable', 'false')
    }
    box.style.height = text.scrollHeight + 'px'
  }
  function remove() {
    const parent = box.parentElement as HTMLDivElement
    parent.remove()
  }
  function editable(e: MouseEvent) {
    ;(<HTMLDivElement>e.target).setAttribute('contenteditable', 'true')
    // document.addEventListener('mousedown', () => {
    //   text.setAttribute('contenteditable', 'false')
    // })
    // console.log(text)
  }

  function moveDiv(e: MouseEvent) {
    text.setAttribute('contenteditable', 'false')
    text.classList.add('select-none')
    document.addEventListener('mousemove', divMove, false)
    document.addEventListener('mouseup', mouseup, false)
    // document.addEventListener('mouseleave', stopMove, false)
  }
  function divMove(e: MouseEvent) {
    const panelContainer = text.parentElement?.parentElement as HTMLDivElement
    let t = Number(panelContainer.style.top.replace('px', ''))
    let l = Number(panelContainer.style.left.replace('px', ''))
    panelContainer.style.top = t + e.movementY * 0.83 + 'px'
    panelContainer.style.left = l + e.movementX * 0.83 + 'px'
    // console.log(panelContainer.style.top, panelContainer.style.left)
  }
  function stopMove() {
    text.focus()
    document.removeEventListener('mousemove', divMove, false)
    document.removeEventListener('mouseup', mouseup, false)
    // document.removeEventListener('mouseleave', stopMove, false)
  }
  function mouseup() {
    text.classList.remove('select-none')
    text.setAttribute('contenteditable', 'true')
    stopMove()
  }
  function mouseleave() {
    text.setAttribute('contenteditable', 'false')
    text.classList.add('select-none')
    stopMove
  }
</script>

<div class="w-44 h-20 relative outline-none" bind:this={box}>
  <div
    contenteditable="true"
    class="h-full w-full bg-amber-500 text-white overflow-hidden text-center rounded-md"
    data-ph="node"
    bind:textContent={content}
    on:mousedown|stopPropagation={moveDiv}
    on:mouseleave={mouseleave}
    on:keyup={keyResize}
  >
    text
  </div>
  <span
    class="absolute bottom-0 right-0 h-2 w-2  cursor-se-resize"
    on:mousedown|stopPropagation={resizer}
  />
  <span class="absolute top-1 left-1 w-2 h-2 rounded-full bg-rose-500" on:click={remove} />
</div>

<style>
  [contenteditable]:empty:not(:focus):before {
    content: attr(data-ph);
    color: grey;
    font-style: italic;
  }
</style>
