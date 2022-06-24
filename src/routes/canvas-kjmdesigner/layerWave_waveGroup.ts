import { Wave } from './layerWave_wave'

export class WaveGroup {
  waves: Wave[] = []
  totalWaveArr: number[]
  constructor(
    private stageWidth: number,
    private stageHeight: number,
    private totalPoints: number,
    private totalWaves: number,
    private speed: number
  ) {
    this.totalWaveArr = Array.from({ length: totalWaves }, (v, i) => i)

    this.totalWaveArr.forEach((i) => {
      const wave = new Wave(
        stageWidth,
        stageHeight,
        totalPoints,
        i * ((totalPoints - 1) / totalWaves),
        speed
      )
      this.waves[i] = wave
    })
  }

  resize() {
    this.totalWaveArr.forEach((i) => {
      this.waves[i].resize()
    })
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.totalWaveArr.forEach((i) => {
      this.waves[i].draw(ctx)
    })
  }
}
