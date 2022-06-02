<script lang="ts">
  import { Grid } from 'gridjs'
  import { onMount } from 'svelte'

  let div: HTMLDivElement | undefined
  const grid = new Grid({
    columns: ['Name', 'Email', 'Phone Number'],
    data: [
      ['John', 'john@example.com', '(353) 01 222 3333'],
      ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
      ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
      ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
      ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
      ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
      ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
      ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
      ['Jane', 'jane@gmail.com', '(01) 22 888 4444'],
      ['Jane', 'jane@gmail.com', '(01) 22 888 4444'],
      ['Jane', 'jane@gmail.com', '(01) 22 888 4444'],
      ['Jane', 'jane@gmail.com', '(01) 22 888 4444'],
      ['Jane', 'jane@gmail.com', '(01) 22 888 4444'],
      ['Jane', 'jane@gmail.com', '(01) 22 888 4444'],
      ['Jane', 'jane@gmail.com', '(01) 22 888 4444'],
      ['Jane', 'jane@gmail.com', '(01) 22 888 4444'],
      ['John', 'john@gmail.com', '(01) 22 888 4444']
    ],
    style: {
      header: {
        fontSize: '1.2em',
        fontWeight: 'bold',
        textAlign: 'center'
      },
      th: {
        borderBottom: '1px solid #ccc'
      },
      td: {
        border: '1px solid #ccc'
      },
      table: {
        'font-size': '15px'
      },
      footer: {
        fontSize: '1.2em',
        fontWeight: 'bold',
        textAlign: 'center'
      }
    },
    pagination: true
  })
  onMount(() => {
    console.log(div)
    if (!div) return
    grid.render(div)
  })
</script>

<div class="bg-slate-200 p-2 rounded-md m-10">
  <div bind:this={div} />
  그냥 그런데..
  <a href="https://gridjs.io/docs/config/style" class="text-rose-400">설명링크</a>
</div>
