import { Point } from './layerWave_point'

export class Wave {
  centerX = 0
  centerY = 0
  point: Point | null = null
  points: Point[] = []
  pointGap = 0
  color: string = this.randomRgba(0.4)
  constructor(
    private stageWidth: number,
    private stageHeight: number,
    private totalPoints: number,
    private latency: number,
    private speed: number
  ) {}

  resize() {
    this.centerX = this.stageWidth / 2
    this.centerY = this.stageHeight / 2

    this.pointGap = this.stageWidth / (this.totalPoints + 1)
    this.init()
  }

  init() {
    for (let i = 0; i < this.totalPoints; i++) {
      const point = new Point(
        this.centerX - this.pointGap * (i - (this.totalPoints - 1) / 2),
        this.centerY,
        this.speed,
        i + 1,
        this.latency,
        this.totalPoints
      )
      this.points[i] = point
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color

    let prevX = this.stageWidth
    let prevY = this.centerY
    ctx.moveTo(prevX, prevY)
    ctx.beginPath()

    for (let i = 0; i < this.points.length; i++) {
      const point = this.points[i] as Point
      point.update()
      // ctx.arc(point.x, point.y, 20, 0, Math.PI * 2, false)
      // ctx.fill()
      const cx = (prevX + this.points[i].x) / 2
      const cy = (prevY + this.points[i].y) / 2
      ctx.quadraticCurveTo(prevX, prevY, cx, cy)

      prevX = point.x
      prevY = point.y
    }
    ctx.quadraticCurveTo(prevX, prevY, (0 + prevX) / 2, (this.centerY + prevY) / 2)
    ctx.lineTo(0, this.centerY)
    ctx.lineTo(0, this.stageHeight)
    ctx.lineTo(this.stageWidth, this.stageHeight)
    ctx.lineTo(this.stageWidth, this.centerY)
    ctx.fill()
    ctx.closePath()
  }

  randomRgba(opacity: number) {
    const randomBetween = (min: number, max: number) =>
      min + Math.floor(Math.random() * (max - min + 1))

    const r = randomBetween(0, 255)
    const g = randomBetween(0, 255)
    const b = randomBetween(0, 255)
    const rgba = `rgba(${r},${g},${b},${opacity})`
    return rgba
  }
}
