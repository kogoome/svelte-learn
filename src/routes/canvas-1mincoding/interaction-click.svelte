<script lang="ts">
  let canvas: HTMLCanvasElement
  let animationId: number
  let ctx: CanvasRenderingContext2D
  let countFrame = 0
  let rectSize = 100
  let center = {
    x: 0,
    y: 0
  }
  $: if (canvas) {
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    console.log('캔버스태그 바인딩 완료')
    center = {
      x: canvas.width / 2,
      y: canvas.height / 2
    }
    ctx.fillStyle = 'rgb(167 139 250)'
    ctx.strokeStyle = 'rgb(167 139 250)'
    canvas.onclick = (e: MouseEvent) => {
      console.log(e.offsetX, e.offsetY)
      const x = e.offsetX
      const y = e.offsetY
      if (
        x >= center.x - rectSize / 2 &&
        x <= center.x + rectSize / 2 &&
        y >= center.y - rectSize / 2 &&
        y <= center.y + rectSize / 2
      ) {
        console.log('사각형 선택')
      }
    }
    draw()
  }
  function draw() {
    // 커서 중앙으로 이동
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.translate(center.x, center.y)

    ctx.fillRect(-rectSize / 2, -rectSize / 2, rectSize, rectSize)
    ctx.restore()
  }

  function stopAnimation() {
    cancelAnimationFrame(animationId)
  }
  function startAnimation() {
    animationId = requestAnimationFrame(draw)
  }
</script>

<div class="w-screen flex justify-center">
  <div class="m-10">
    <div class="flex justify-center text-3xl">Interaction</div>
    <canvas bind:this={canvas} class="bg-slate-300 rounded-md shadow-md" width="1000" height="500">
      이 브라우저는 캔버스를 지원하지 않습니다</canvas
    >
    <div class="my-10 flex gap-10 justify-center">
      <button class="btn btn-outline btn-sm" on:click={stopAnimation}>stop animation</button>
      <button class="btn btn-outline btn-sm" on:click={startAnimation}>start animation</button>
    </div>
  </div>
</div>
