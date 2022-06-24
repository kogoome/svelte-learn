<script lang="ts">
  import { onDestroy } from 'svelte'

  let canvas: HTMLCanvasElement
  let animationId: number
  let ctx: CanvasRenderingContext2D

  $: if (canvas) {
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    draw()
  }

  let r = 50
  let x = -r
  let countFrame = 0

  function draw() {
    if (x > canvas.width + r) x = -r
    let y = Math.sin((x * 2 * Math.PI) / 60) * 100 + canvas.height / 2

    if (frameRateFlag(60)) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.beginPath()
      ctx.arc(x, y, r, 0, 2 * Math.PI)
      ctx.fill()
    }

    x += 1
    countFrame += 1
    animationId = requestAnimationFrame(draw)
    console.log('drawing...')
  }
  function frameRateFlag(frame: number) {
    if (frame > 60) frame = 60
    if (frame < 1) frame = 1
    return countFrame % Math.round(60 / frame) === 0
  }
  function stopAnimation() {
    cancelAnimationFrame(animationId)
  }
  function startAnimation() {
    animationId = requestAnimationFrame(draw)
  }

  onDestroy(() => {
    stopAnimation()
  })
</script>

<svelte-head>
  <title>캔버스 튜토리얼</title>
</svelte-head>

<div class="w-screen flex justify-center">
  <div class="m-10">
    <div class="flex justify-center text-3xl">Move Circle</div>
    <canvas bind:this={canvas} class="bg-slate-300 rounded-md shadow-md" width="1000" height="500">
      이 브라우저는 캔버스를 지원하지 않습니다</canvas
    >
    <div class="my-10 flex gap-10">
      <button class="btn btn-outline btn-sm" on:click={stopAnimation}>stop animation</button>
      <button class="btn btn-outline btn-sm" on:click={startAnimation}>start animation</button>
    </div>
  </div>
</div>
