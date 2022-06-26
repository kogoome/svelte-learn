import { WaveGroup } from './layerWave_waveGroup'
export class App {
  canvas: HTMLCanvasElement
  container: HTMLDivElement
  ctx: CanvasRenderingContext2D
  stageWidth = 0
  stageHeight = 0
  animate_on = false
  animationId = 0
  // wave: Wave
  waveGroup: WaveGroup
  constructor(totalPoints: number, totalWaves: number, speed: number) {
    // canvas, ctx 생성
    this.canvas = document.createElement('canvas') as HTMLCanvasElement
    this.canvas.classList.add('bg-slate-50')
    this.canvas.classList.add('rounded-lg')
    this.canvas.style.width = '100%'
    this.canvas.style.height = '100%'

    this.container = document.getElementById('container') as HTMLDivElement
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.container.appendChild(this.canvas)
    this.stageWidth = this.container.clientWidth
    this.stageHeight = this.container.clientHeight

    // make draw Object
    this.waveGroup = new WaveGroup(
      this.stageWidth,
      this.stageHeight,
      totalPoints,
      totalWaves,
      speed
    )

    // window 스크린 사이즈 가져와서 리사이즈 하기
    window.addEventListener('resize', this.resize.bind(this), false)
    this.resize()

    // this.waveGroup.resize()

    this.animate()
  }

  resize() {
    this.canvas.width = this.stageWidth * 2
    this.canvas.height = this.stageHeight * 2
    this.ctx.scale(2, 2)

    this.waveGroup.resize()
  }
  animate() {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)

    // draw
    console.log('animate...')
    // this.waveGroup.draw(this.ctx)
    // this.wave.draw(this.ctx)
    this.waveGroup.draw(this.ctx)

    this.animationId = requestAnimationFrame(this.animate.bind(this))
  }
}
