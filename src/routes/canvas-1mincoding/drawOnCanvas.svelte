<script lang="ts">
  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D
  let countFrame = 0
  let animationId: number
  let drawMode = false
  let color: string = '#000'
  let r = 6
  $: if (canvas) {
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    canvas.onmousedown = () => {
      drawMode = true
    }
    canvas.onmouseup = () => {
      drawMode = false
    }
    canvas.onmousemove = (e: MouseEvent) => {
      if (drawMode) {
        ctx.beginPath()
        ctx.arc(e.offsetX, e.offsetY, r, 0, 2 * Math.PI)
        ctx.stroke()
        r = Math.sin((countFrame * 2 * Math.PI) / 60) * 3 + 6
        countFrame++
        if (countFrame === 60) countFrame = 0
      }
    }
  }

  function frameRateFlag(frame: number) {
    if (frame > 60) frame = 60
    if (frame < 1) frame = 1
    return countFrame % Math.round(60 / frame) === 0
  }

  function fillStrokeColor(color: string) {
    ctx.fillStyle = color
    ctx.strokeStyle = color
  }
</script>

<svelte-head>
  <title>캔버스 튜토리얼</title>
</svelte-head>

<div class="w-screen flex justify-center">
  <div class="m-10">
    <div class="flex justify-center text-3xl">Draw on canvas</div>
    <canvas bind:this={canvas} class="bg-slate-300 rounded-md shadow-md" width="1000" height="500">
      이 브라우저는 캔버스를 지원하지 않습니다</canvas
    >
    <div class="my-10 flex gap-10 justify-center">
      <button
        class="rounded-full w-6 h-6 bg-rose-400 active:bg-rose-600"
        on:click={() => {
          fillStrokeColor('rgb(251 113 133)')
        }}
      />
      <button
        class="rounded-full w-6 h-6 bg-sky-400 active:bg-sky-600"
        on:click={() => {
          fillStrokeColor('rgb(56 189 248)')
        }}
      />
      <button
        class="rounded-full w-6 h-6 bg-lime-400 active:bg-lime-600"
        on:click={() => {
          fillStrokeColor('rgb(163 230 53)')
        }}
      />
      <button
        class="rounded-full w-6 h-6 bg-violet-400 active:bg-violet-600"
        on:click={() => {
          fillStrokeColor('rgb(167 139 250)')
        }}
      />
    </div>
  </div>
</div>
