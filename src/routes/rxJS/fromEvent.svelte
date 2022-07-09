<script lang="ts">
  import { fromEvent } from 'rxjs'

  let str = 'click anywhere : '

  const observable = fromEvent(document, 'click')
  const observer = () => (str += '!')
  observable.subscribe(observer)
</script>

<div>
  {str}
</div>
