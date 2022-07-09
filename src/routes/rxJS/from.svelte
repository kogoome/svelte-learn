<script lang="ts">
  import { from } from 'rxjs'

  let str = 'count(!) from([0, 0, 0, 0, 0]) its array length : '

  const observable = from([0, 0, 0, 0, 0])
  const observer = () => (str += '!')
  observable.subscribe(observer)
</script>

<div contenteditable="false" bind:textContent={str} />
