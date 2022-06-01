<script lang="ts">
  import { fromEvent, Observable, zip } from 'rxjs'
  import { map, pluck } from 'rxjs/operators'
  import mousePositionStore from './mousePosition'
  import { onMount } from 'svelte'

  const mousePosition = fromEvent(document, 'mousemove').pipe(
    map((event: MouseEvent) => ({ x: event.clientX, y: event.clientY }))
  )

  function toObservable(store) {
    return new Observable((observer) => {
      return store.subscribe((value) => observer.next(value))
    })
  }

  const x$ = toObservable(mousePositionStore).pipe(pluck('x'))
  const y$ = toObservable(mousePositionStore).pipe(pluck('y'))
  const sumOfXAnadY = zip(x$, y$).pipe(map(([x, y]) => x + y))
</script>

<div class="h-screen w-full bg-emerald-50 p-10 bg-em">
  <div class="bg-emerald-200 rounded-2xl p-3 shadow-lg">
    <div class="text-4xl font-medium flex justify-center">Mouse Position Observe</div>
    <div class="bg-lime-300 rounded-xl p-3 my-3">
      <div class="text-xl">clientX, clientY from MouseEvent.</div>
      <div class="bg-yellow-400 rounded-md px-3 text-white text-2xl">
        {JSON.stringify($mousePosition)}
      </div>
    </div>
    <div class="bg-cyan-300 rounded-xl p-3 my-3">
      <div class="text-xl">Sum of clientX, clientY</div>
      <div class="bg-sky-400 rounded-md px-3 text-white text-2xl">
        {$sumOfXAnadY}
      </div>
    </div>
  </div>
</div>
