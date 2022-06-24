import { Ball } from './boundingCircle_ball'
import { Block } from './boundingCircle_block'
export class App {
  canvas: HTMLCanvasElement
  container: HTMLDivElement
  ctx: CanvasRenderingContext2D
  stageWidth = 0
  stageHeight = 0
  eOn = false
  ball: Ball
  block: Block
  animationId = 0
  constructor() {
    // canvas, ctx 생성
    this.canvas = document.createElement('canvas') as HTMLCanvasElement
    this.canvas.classList.add('bg-slate-700')
    this.canvas.classList.add('rounded-lg')
    this.canvas.style.width = '100%'
    this.canvas.style.height = '100%'

    this.container = document.getElementById('container') as HTMLDivElement
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.container.appendChild(this.canvas)

    // window 스크린 사이즈 가져와서 리사이즈 하기
    window.addEventListener('resize', this.resize.bind(this), false)
    this.resize()
    // this.event()

    this.ball = new Ball(this.stageWidth, this.stageHeight, 20, 5, 3)
    this.block = new Block(this.stageWidth / 3, 10, 150, 100)

    requestAnimationFrame(this.animate.bind(this))
  }

  resize() {
    this.stageWidth = this.container.clientWidth
    this.stageHeight = this.container.clientHeight
    this.canvas.width = this.stageWidth * 2
    this.canvas.height = this.stageHeight * 2
    this.ctx.scale(2, 2)
  }
  animate() {
    console.log('animate...')
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)
    this.block.drawShadow(this.ctx)
    this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.block)
    this.block.drawBlock(this.ctx)
    this.animationId = requestAnimationFrame(this.animate.bind(this))
  }
}
