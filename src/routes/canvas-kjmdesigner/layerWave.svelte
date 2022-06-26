<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { App } from './layerWave_app'
  let app: App
  let totalPoints = 7
  let totalWaves = 3
  let speed = 0.3
  onMount(() => {
    app = new App(totalPoints, totalWaves, speed)
  })
  function stopAnimation() {
    cancelAnimationFrame(app.animationId)
  }
  function startAnimation() {
    app.animationId = requestAnimationFrame(app.animate.bind(app))
  }
  function makeWaves() {
    const container = document.getElementById('container') as HTMLDivElement
    container.innerHTML = ''
    app = new App(totalPoints, totalWaves, speed)
  }
  onDestroy(() => {
    stopAnimation()
  })
</script>

<div class="flex flex-col justify-center p-10">
  <div class="flex justify-center text-3xl p-2">layer wave</div>
  <div id="container" class="w-full h-[80vh]  rounded-sm" />
  <div class="flex justify-center p-2 gap-2">
    <input type="number" class="input input-ghost w-16" bind:value={totalPoints} />
    <input type="number" class="input input-ghost w-16" bind:value={totalWaves} />
    <input type="number" class="input input-ghost w-16" bind:value={speed} />
    <button class="btn btn-outline btn-sm" on:click={makeWaves}>make wave</button>
  </div>
  <div class="flex justify-center p-2 gap-2">
    <button class="btn btn-outline btn-sm" on:click={stopAnimation}>stop animation</button>
    <button class="btn btn-outline btn-sm" on:click={startAnimation}>start animation</button>
  </div>
</div>
