<script lang="ts">
  import { onMount } from 'svelte'

  const randomRgb = () => {
    let r = Math.floor(Math.random() * 206) + 50
    let g = Math.floor(Math.random() * 206) + 50
    let b = Math.floor(Math.random() * 206) + 50
    return `${r}, ${g}, ${b}`
  }

  function changeColor(e: Event) {
    let target = e.target as HTMLDivElement
    let color = randomRgb()
    // target.style.backgroundColor = `rgba(${color},0.5)`
    target.style.backgroundColor = `rgba(${randomRgb()},1)`
    setTimeout(() => {
      target.style.backgroundColor = `rgba(${randomRgb()},0.5)`
    }, 300)
    setTimeout(() => {
      target.style.backgroundColor = `rgba(${randomRgb()},0)`
    }, 600)
  }
  function colorAll() {
    let masks = document.querySelectorAll('.mask')

    let randonIndex = Array(20)
      .fill(0)
      .map((none, index) => Math.floor(Math.random() * 154))

    randonIndex.forEach((index) => {
      let target = masks[index] as HTMLDivElement
      target.style.backgroundColor = `rgba(${randomRgb()},0.5)`
      setTimeout(() => {
        target.style.backgroundColor = `rgba(${randomRgb()},0.0)`
      }, 1000)
    })
  }

  onMount(() => {
    setInterval(() => {
      colorAll()
    }, 1000)
  })
</script>

<div class="rootC mx-auto my-10 p-3 bg-black rounded-2xl overflow-hidden">
  <div class="relative w-full h-full rounded-xl overflow-hidden">
    <!-- 그림 -->
    <div class="content h-full w-full bg-white">
      <img
        src="https://t1.daumcdn.net/cfile/blog/117ADF4D4EF60C452C?original"
        alt=""
        class="w-full h-full object-cover"
      />
    </div>
    <!-- 마스크 -->
    <div class="absolute z-10 top-0 w-full h-full flex flex-col  rounded-xl">
      {#each Array(14).fill(0) as none, tendex}
        <div class="basis-auto flex h-full w-full">
          {#each Array(11).fill(0) as none, index}
            <div
              class="mask w-full inline-block whitespace-normal transition-all duration-1000 rounded-full"
              data-index={tendex * 20 + index}
              on:mouseenter={changeColor}
            />
          {/each}
        </div>
      {/each}
    </div>
    <div class="absolute z-20 top-0 text-6xl font-normal" on:click={colorAll}>title</div>
  </div>
</div>

<!-- style="background-color: rgba({randomRgb()},0.8);" -->
<style>
  .rootC {
    width: 1000px;
    height: 1214px;
  }
  .content {
  }
</style>
