<script>
  import MiniSearch from 'minisearch'
  const documents = [
    {
      id: 1,
      title: 'Moby Dick',
      text: 'Call me Ishmael. Some years ago...',
      category: 'fiction'
    },
    {
      id: 2,
      title: 'Zen and the Art of Motorcycle Maintenance',
      text: 'I can see by my watch...',
      category: 'fiction'
    },
    {
      id: 3,
      title: 'Neuromancer',
      text: 'The sky above the port was...',
      category: 'fiction'
    },
    {
      id: 4,
      title: 'Zen and the Art of Archery',
      text: 'At first sight it must seem...',
      category: 'non-fiction'
    },
    // ...and more
  ]

  let miniSearch = new MiniSearch({
    fields: ['title', 'text'],
    // 검색할 속성
    storeFields: ['title', 'text', 'category']
    // 보여줄 속성
  })

  miniSearch.addAll(documents)
  miniSearch.search('moby')

  let input = ""
  let result = []
  function search() {
    result = miniSearch.search(input)
  }
</script>

<input type="text" bind:value={input} on:keyup={search} class="input input-sm input-secondary input-bordered w-full m-1">

{#each result as item}
<div>
  title: {item.title}
  text: {item.text}
  category: {item.category}
</div>

{/each}
