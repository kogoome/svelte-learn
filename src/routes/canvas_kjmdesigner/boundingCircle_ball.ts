import type { Block } from './boundingCircle_block'

export class Ball {
  x: number
  y: number
  constructor(
    stageWidth: number,
    stageHeight: number,
    public radius: number,
    public vx: number,
    public vy: number
  ) {
    const diameter = this.radius * 2
    this.x = this.radius + Math.random() * (stageWidth - diameter)
    this.y = this.radius + Math.random() * (stageHeight - diameter)
  }

  draw(ctx: CanvasRenderingContext2D, stageWidth: number, stageHeight: number, block: Block) {
    this.x += this.vx
    this.y += this.vy

    this.bounceWindow(stageWidth, stageHeight)
    this.bounceBlock(block)

    ctx.fillStyle = '#fdd700'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
  }

  bounceWindow(stageWidth: number, stageHeight: number) {
    const minX = this.radius
    const maxX = stageWidth - this.radius
    const minY = this.radius
    const maxY = stageHeight - this.radius

    if (this.x <= minX || this.x >= maxX) {
      this.vx *= -1
      this.x += this.vx
    }
    if (this.y <= minY || this.y >= maxY) {
      this.vy *= -1
      this.y += this.vy
    }
  }

  bounceBlock(block: Block) {
    // 부딫히는 박슷 좌표
    const minX = block.x - block.xGap / 2 - this.radius
    const maxX = block.maxX - block.xGap / 2 + this.radius
    const minY = block.y + block.yGap / 2 - this.radius
    const maxY = block.maxY + block.yGap / 2 + this.radius

    if (this.x > minX && this.x < maxX && this.y > minY && this.y < maxY) {
      // 각 지점별 공의 중심과의 거리
      const x1 = Math.abs(minX - this.x)
      const x2 = Math.abs(maxX - this.x)
      const y1 = Math.abs(minY - this.y)
      const y2 = Math.abs(maxY - this.y)
      const min1 = Math.min(x1, x2)
      const min2 = Math.min(y1, y2)
      const min = Math.min(min1, min2)
      if (min == min1) {
        this.vx *= -1
        this.x += this.vx
      }
      if (min == min2) {
        this.vy *= -1
        this.y += this.vy
      }
    }
  }
}
