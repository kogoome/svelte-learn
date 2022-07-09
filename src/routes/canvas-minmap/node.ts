export class Node {
  constructor(public x: number, public y: number, public text: string) {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#ff0000'

    const fontSize = 50
    const boxWidth = 200
    const boxHeight = fontSize + 10
    const startXY = {
      x: this.x - boxWidth / 2,
      y: this.y - boxHeight / 2
    }
    ctx.fillRect(startXY.x, startXY.y, boxWidth, boxHeight)

    ctx.font = `${fontSize}px Noto Sans Korean `
    ctx.fillStyle = '#ffffff'
    ctx.fillText(this.text, startXY.x, startXY.y + fontSize)
  }
}
