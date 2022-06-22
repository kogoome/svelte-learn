<script lang="ts">
  import { onDestroy } from 'svelte'

  let canvas: HTMLCanvasElement
  let animationId: number
  let ctx: CanvasRenderingContext2D
  let countFrame = 0
  let rectSize = 100
  let center = {
    x: 0,
    y: 0
  }
  let boxs: Box[] = []
  $: if (canvas) {
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    console.log('캔버스태그 바인딩 완료')
    center = {
      x: canvas.width / 2,
      y: canvas.height / 2
    }
    ctx.fillStyle = 'rgb(167 139 250)'
    ctx.strokeStyle = 'rgb(167 139 250)'
    ctx.font = '20px sans-serif'
    drawBoxs()
    render()
  }
  function drawBoxs() {
    boxs = Array.from({ length: 30 }, (v, i) => i).map((i) => {
      const speed = Math.random() * 3.5 + 1
      const b = new Box(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        rectSize,
        i,
        speed
      )
      b.drawBox()
      return b
    })
    canvas.onclick = (e) => {
      const x = e.offsetX
      const y = e.offsetY
      let selectedBox: Box | undefined
      boxs.forEach((b) => b.isClicked(x, y) && (selectedBox = b))
      if (selectedBox) {
        console.log('clicked!!', selectedBox.index)

        selectedBox.speed === 0 ? selectedBox.loadSpeed() : selectedBox.saveSpeed()
      }
    }
  }
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    boxs.forEach((b) => {
      b.x += b.speed
      if (b.x > canvas.width) {
        b.x = 0 - b.width
      }
      b.drawBox()
    })
    animationId = requestAnimationFrame(render)
    console.log('drawing...')
  }

  function stopAnimation() {
    cancelAnimationFrame(animationId)
  }
  function startAnimation() {
    animationId = requestAnimationFrame(drawBoxs)
  }

  class Box {
    x: number
    y: number
    width: number
    height: number
    color: string
    // strokeColor: string
    index: number
    speed: number
    spdTemp: number = 0
    constructor(x: number, y: number, rectSize: number, index: number, speed: number) {
      this.x = x
      this.y = y
      this.width = rectSize
      this.height = rectSize
      //random color
      this.color = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)},0.9)`
      this.index = index
      this.speed = speed
    }
    drawBox() {
      ctx.fillStyle = this.color
      ctx.fillRect(this.x, this.y, this.width, this.height)
      ctx.fillStyle = '#fff'
      ctx.fillText(this.index.toString(), this.x + this.width / 6, this.y + this.height / 3)
    }
    isClicked(mouseX: number, mouseY: number) {
      return (
        mouseX > this.x &&
        mouseX < this.x + this.width &&
        mouseY > this.y &&
        mouseY < this.y + this.height
      )
    }
    saveSpeed() {
      this.spdTemp = this.speed
      this.speed = 0
    }
    loadSpeed() {
      this.speed = this.spdTemp
    }
  }

  onDestroy(() => {
    cancelAnimationFrame(animationId)
  })
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
