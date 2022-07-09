import { Node } from './node'

export class App {
  canvas: HTMLCanvasElement
  container: HTMLDivElement
  ctx: CanvasRenderingContext2D
  stageWidth:number
  stageHeight:number
  centerX :number
  centerY :number
  animate_on = false
  animationId = 0
  node: Node
  constructor() {
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
    this.centerX = this.stageWidth / 2
    this.centerY = this.stageHeight / 2

    // make draw Object
    this.node = new Node(this.centerX, this.centerY, '안녕하세요')

    // make clickEvent
    this.canvas.addEventListener('click', this.clickBox.bind(this))

    // window 스크린 사이즈 가져와서 리사이즈 하기
    window.addEventListener('resize', this.resize.bind(this), false)
    this.resize()

    this.animate()
  }

  resize() {
    this.canvas.width = this.stageWidth * 2
    this.canvas.height = this.stageHeight * 2
    this.ctx.scale(2, 2)
  }
  animate() {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)

    // draw
    this.node.draw(this.ctx)
    console.log('animate...')
    // this.waveGroup.draw(this.ctx)
    // this.wave.draw(this.ctx)

    // this.animationId = requestAnimationFrame(this.animate.bind(this))
  }

  clickBox(e: MouseEvent) {
    const newNode = new Node(e.offsetX, e.offsetY, '안녕하세요')
    newNode.draw(this.ctx)
  }
}
