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
    return new Array(categories.length).fill(null).map(function (item, i) {
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
  <title>index page</title>
</svelte:head>
<div class="flex justify-center">
  <div class="container rounded-xl m-10 py-3 shadow-lg text-center ">
    <div class="bg-white text-center mb-3">
      <h1>Feature index page</h1>
      with svelte-grid
    </div>
    <div class="gridbox m-auto">
      <Grid bind:items {cols} rowHeight={100} let:dataItem fillSpace={fillFree}>
        <div
          class="h-full w-full rounded-lg opacity-80 shadow-md"
          style="background-image: linear-gradient({dataItem.data.start}, {dataItem.data.end});"
        >
          {@html dataItem.content}
        </div>
      </Grid>
    </div>
  </div>
</div>

<style>
  @-webkit-keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @-moz-keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @-o-keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .container {
    background: linear-gradient(
      -85deg,
      #ffd6d6,
      #c2fff9,
      #fcffd6,
      #c5ffc2,
      #d6e3ff,
      #f3c2ff,
      #ffd6ef,
      #c2daff
    );
    background-size: 400% 400%;
    animation: AnimationName 30s ease infinite;
  }
  .gridbox {
    width: 800px;
  }
</style>
