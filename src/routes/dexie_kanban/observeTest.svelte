<script>
  let list = ['first', 'second']

  function pushList() {
    list.push('new list')
    console.log(list)
  }
  function popList() {
    list.pop()
    console.log(list)
  }
  function assignment1List() {
    list[list.length] = 'new list'
    console.log(list)
  }
  function assignment2List() {
    list = [...list, 'new list']
    console.log(list)
  }
</script>

<button class="btn btn-sm btn-warning" on:click={pushList}>push list</button>
<button class="btn btn-sm btn-warning" on:click={popList}>pop list</button>
<button class="btn btn-sm btn-warning" on:click={assignment1List}>assignment 1 list</button>
<button class="btn btn-sm btn-warning" on:click={assignment2List}>assignment 2 list</button>

{JSON.stringify(list)}
