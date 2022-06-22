<script lang="ts">
  import { onDestroy } from 'svelte'

  let canvas: HTMLCanvasElement
  let animationId: number
  let ctx: CanvasRenderingContext2D
  let countFrame = 0
  let rectSize = 100
  let scaleValue = 1
  let rotateValue = 0
  let center = {
    x: 0,
    y: 0
  }
  $: if (canvas) {
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    console.log('캔버스 변화 로그')
    center = {
      x: canvas.width / 2,
      y: canvas.height / 2
    }
    ctx.fillStyle = 'rgb(167 139 250)'
    ctx.arc(100, 100, 50, 0, 2 * Math.PI)
    ctx.stroke()
    draw()
  }
  function draw() {
    // 커서 중앙으로 이동
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.translate(center.x, center.y)
    ctx.scale(scaleValue, scaleValue)
    ctx.rotate(rotateValue)

    ctx.fillRect(-rectSize / 2, -rectSize / 2, rectSize, rectSize)
    ctx.strokeRect(-rectSize / 2, -rectSize / 2, rectSize, rectSize)
    ctx.restore()

    scaleValue = Math.sin((countFrame * 2 * Math.PI) / 60) * 1 + 2
    rotateValue = Math.cos((countFrame * 2 * Math.PI) / 60) * Math.PI
    countFrame += 0.2
    if (countFrame === 60) countFrame = 0
    animationId = requestAnimationFrame(draw)
    console.log('onAnimationFrame...')
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

<div class="w-screen flex justify-center">
  <div class="m-10">
    <div class="flex justify-center text-3xl">Transform</div>
    <canvas bind:this={canvas} class="bg-slate-300 rounded-md shadow-md" width="1000" height="500">
      이 브라우저는 캔버스를 지원하지 않습니다</canvas
    >
    <div class="my-10 flex gap-10 justify-center">
      <button class="btn btn-outline btn-sm" on:click={stopAnimation}>stop animation</button>
      <button class="btn btn-outline btn-sm" on:click={startAnimation}>start animation</button>
    </div>
  </div>
</div>
