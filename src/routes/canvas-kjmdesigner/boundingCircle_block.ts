export class Block {
  // x, y 박스 시작지점, maxX 박스 끝지점 x좌표
  maxX: number
  maxY: number
  xGap = 30
  yGap = 20
  constructor(public width: number, public height: number, public x: number, public y: number) {
    this.maxX = width + x
    this.maxY = height + y
  }
  drawBlock(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#ff384e'
    ctx.beginPath()
    ctx.rect(this.x, this.y, this.width, this.height)
    ctx.fill()

    ctx.fillStyle = '#9d0919'
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.x - this.xGap, this.y + this.yGap)
    ctx.lineTo(this.x - this.xGap, this.y + this.yGap + this.height)
    ctx.lineTo(this.x, this.maxY)
    ctx.fill()
  }
  drawShadow(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'rgb(30 41 59)'
    ctx.beginPath()
    ctx.moveTo(this.maxX, this.maxY)
    ctx.lineTo(this.maxX - this.xGap, this.maxY + this.yGap)
    ctx.lineTo(this.x - this.xGap, this.maxY + this.yGap)
    ctx.lineTo(this.x, this.maxY)
    ctx.fill()
  }
}
