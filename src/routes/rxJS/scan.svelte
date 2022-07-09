<script lang="ts">
  import { fromEvent } from 'rxjs'
  import { scan } from 'rxjs/operators'

  const observable = fromEvent(document, 'click').pipe(scan((count, event, index) => index, 0))
  const observer = (count: number) => console.log(`Clicked ${count} times`)
  observable.subscribe(observer)
</script>

click anywhere :
