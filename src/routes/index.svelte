<script lang="ts">
  import { onMount } from 'svelte'
  import { categories, categoryItems } from '../frontend/navItems'
  import _ from 'lodash-es'

  let title = 'index'

  const contentsArr = categories
    .map((category) => {
      const aTag = categoryItems[category].map((item) => {
        return `<div><a href=${item.link}>${item.title}</a></div>`
      })
      const contents = [
        `<div class="p-2 text-white w-full ">
        <h3>${category}</h3>
      `,
        aTag.join(''),
        `</div>`
      ]
      return contents.join('')
    })
    .concat(Array(6).fill(''))

  const randomRgb = () => {
    let r = Math.floor(Math.random() * 206) + 50
    let g = Math.floor(Math.random() * 206) + 50
    let b = Math.floor(Math.random() * 206) + 50
    return `${r}, ${g}, ${b}`
  }
  onMount(() => {
    window.onresize = () => {
      startFocus()
      _.debounce(() => {
        location.reload()
      }, 300)()
    }
    let visivleDivIndex = [
      51, 68, 69, 70, 71, 88, 89, 90, 91, 109, 110, 111, 112, 129, 130, 131, 132, 150, 151, 152,
      153, 170, 171
    ]
    visivleDivIndex.forEach((cardIndex, i) => {
      let content = <HTMLDivElement>document.querySelector(`[data-index="${cardIndex}"]`)
      content.innerHTML = contentsArr[i]
      content.style.backgroundColor = `rgba(${randomRgb()},0.7)`
    })
    startFocus()
  })

  function startFocus() {
    let firstElement = document.querySelector('[data-index="51"]')
    firstElement!.scrollIntoView()
  }
</script>

<div class="rootbg w-full relative overflow-hidden">
  <div class="container flex flex-col absolute top-5 rotate-12 z-0">
    {#each Array(12).fill(0) as none, tendex}
      <div class="whitespace-nowrap">
        {#each Array(20).fill(0) as none, index}
          <div
            class="card h-96 w-48 rounded-2xl inline-block mx-2 my-1 shadow-xl px-2 whitespace-normal "
            data-index={tendex * 20 + index}
          />
        {/each}
      </div>
    {/each}
  </div>
  <div
    id="title"
    class="fixed top-10 h-24 w-full text-5xl font-medium px-5 z-20 pt-8 "
    on:click={startFocus}
  >
    {title}
  </div>
</div>

<style>
  .rootbg {
    height: 270vh;
    background: linear-gradient(-60deg, #ff66d4, #ffa3a3, #fcffd6, #c5ffc2, #c2fff9, #80ecff);
    width: 100vw;
    background-size: 100% 100%;
    /* 애니메이션은 cpu를 너무 먹어서 삭제 */
  }
  #title {
    color: white;
    text-shadow: rgba(0, 0, 0, 0.1) 1px 1px 2px;
    background-color: rgba(0, 0, 0, 0.04);
  }
  .card {
    background-color: rgba(255, 255, 255, 0.3);
  }
  .container {
    width: 800px;
    top: -20%;
    left: -16%;
  }
</style>
