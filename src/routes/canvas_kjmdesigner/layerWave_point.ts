export class Point {
  fixedY: number
  cur: number
  max: number
  frameCycle: number
  constructor(
    public x: number,
    public y: number,
    private speed: number,
    index: number,
    latency: number,
    totalPoints: number
  ) {
    this.cur = (index + latency) * 10
    this.fixedY = y
    // 진폭
    this.max = 80 - Math.abs((index - (totalPoints + 1) / 2) * 15)
    this.frameCycle = (totalPoints + 1) * 10
  }
  update() {
    this.cur += this.speed
    this.y = this.fixedY + Math.sin((this.cur * 2 * Math.PI) / this.frameCycle) * this.max
    if (this.cur === this.frameCycle) this.cur = 0
  }
}
