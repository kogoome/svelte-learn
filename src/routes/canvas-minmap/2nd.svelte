<script lang="ts">
  let node: HTMLTextAreaElement
  let fontSize: number
  function getFontSize() {
    fontSize = Number(node.style.height.replace('px', ''))
    console.log(fontSize)
    if (fontSize < 100 && fontSize > 20) {
      node.style.fontSize = `${fontSize * 0.6}px`
    }
  }
  function resize() {
    node.style.height = `${node.scrollHeight}px`
  }
  function blur() {
    node.setAttribute('readonly', 'true')
    node.style.resize = 'none'
    resize()
  }
  function focus() {
    node.removeAttribute('readonly')
    node.style.resize = 'both'
    resize()
  }
</script>

<textarea
  class="outline-none"
  rows="1"
  bind:this={node}
  on:keyup={resize}
  on:blur={blur}
  on:click={focus}
  on:mousemove={getFontSize}
/>

<style>
  textarea {
    resize: both;
  }
</style>
