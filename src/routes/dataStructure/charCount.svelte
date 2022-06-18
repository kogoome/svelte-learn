<script lang="ts">
  import { onMount } from 'svelte'

  $: analysisString = 'str'
  let charCountObj: { [key: string]: number } = {}
  function charCount(str: string) {
    let loStr = str.toLocaleLowerCase().replaceAll(' ', '')
    charCountObj = {}
    for (let i = 0; i < loStr.length; i++) {
      if (charCountObj[loStr[i]]) {
        charCountObj[loStr[i]]++
      } else {
        charCountObj[loStr[i]] = 1
      }
    }
  }
  let functionStr = `function charCount(str: string) {
  let charCount: { [key: string]: number } = {}
  for (let i = 0; i < str.length; i++) {
    if (charCount[str[i]]) {
      charCount[str[i]]++
    } else {
      charCount[str[i]] = 1
    }
  }
}`
  onMount(() => {
    charCount(analysisString)
  })
</script>

<div class="bg-amber-600 rounded-xl m-10 py-3 shadow-lg">
  <h2 class="bg-black pl-3 flex text-white">
    charCount(
    <div
      class="text-rose-400"
      contenteditable="true"
      bind:textContent={analysisString}
      on:keyup={() => {
        charCount(analysisString)
      }}
    />
    : string)
  </h2>
  <div class="bg-amber-500 rounded-lg p-3 mt-3 mx-3 text-white">
    <pre>{functionStr}</pre>
  </div>
  <div class="bg-amber-500 rounded-lg p-3 mt-3 mx-3 text-white">
    {#each Object.keys(charCountObj) as key, index}
      <div>
        charCountObj[{index}] = {key}:
        <span class="text-rose-500"> {charCountObj[key]} </span>
      </div>
    {/each}
  </div>
</div>
