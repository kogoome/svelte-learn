<script lang="ts">
  import { gridHelp, Grid } from 'svelte-grid-ts'
  import { categories, categoryItems } from '../../frontend/navItems'
  let fillFree = true

  const id = () => '_' + Math.random().toString(36).substr(2, 9)
  const randomHexColorCode = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16)
    return '#' + n.slice(0, 6)
  }

  const contentsArr = categories.map((category) => {
    const aTag = categoryItems[category].map((item) => {
      return `<div><a href=${item.link}>${item.title}</a></div>`
    })
    const contents = [
      `<div class="p-2 text-white">
        <h3>${category}</h3>
      `,
      aTag.join(''),
      `</div>`
    ]
    return contents.join('')
  })

  function generateLayout(col: number) {
    return new Array(15).fill(null).map(function (item, i) {
      const x = Math.ceil(Math.random() * 4) + 2
      const y = Math.ceil(Math.random() * 3) + 1
      return {
        16: gridHelp.item({ x: (i * 2) % col, y: Math.floor(i / 6) * y, w: 4, h: y }),
        id: id(),
        data: { start: randomHexColorCode(), end: randomHexColorCode() },
        content: contentsArr[i]
      }
    })
  }

  let cols = [[1287, 16]]
  let items = gridHelp.adjust(generateLayout(16), 16)
</script>

<svelte:head>
  <title>Svelte-grid</title>
</svelte:head>

<div class="bg-slate-200 rounded-xl m-10 py-3 shadow-lg">
  <div class="bg-white text-center mb-3">
    <h1>Svelte-grid</h1>
  </div>
  <Grid bind:items {cols} rowHeight={100} let:dataItem fillSpace={fillFree}>
    <div
      class="h-full w-full rounded-lg opacity-80 shadow-md"
      style="background-image: linear-gradient({dataItem.data.start}, {dataItem.data.end});"
    >
      {@html dataItem.content}
    </div>
  </Grid>
</div>
