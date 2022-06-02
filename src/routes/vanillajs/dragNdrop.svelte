<script lang="ts">
  import { dNd } from './dnd'
  // 사용하기 위해 container, draggable 클래스를 html에 작성해야 한다.
  let items = ['🦊', '🐸', '🐶', '🐱', '🥞', '🥣']
  let indexes = [0, 2, 4]
</script>

<button class="btn btn-primary" on:click={dNd}>DragNdrop start</button>

<div class="text-3xl transition-all">
  {#each indexes as i}
    <div
      class="container bg-slate-300 rounded-md w-fit text-center h-fit p-3 flex-col justify-center gap-3 m-1"
    >
      <button class="draggable bg-slate-200 rounded-md h-16 w-16" draggable="true"
        >{items[i]}</button
      >
      <button class="draggable bg-slate-200 rounded-md h-16 w-16 cursor-move" draggable="true"
        >{items[i + 1]}</button
      >
    </div>
  {/each}
</div>
