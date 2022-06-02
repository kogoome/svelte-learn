<script>
  import { slide, fade } from 'svelte/transition'

  let count = 0
</script>

<div class="text-center text-2xl py-5 bg-amber-100 rounded-2xl m-10 shadow-xl">
  <div class="text-3xl font-medium bg-white py-1 mb-2">
    <div class="m-auto">
      #key <span class="text-orange-500">count</span>
    </div>
  </div>
  <div class="flex items-center justify-center mb-3">
    키 블럭을 이용하면 키값의 변경에 따라 트랜지션 작동
    <button
      class="btn btn-sm btn-warning"
      on:click={() => {
        count++
      }}>count++</button
    >
  </div>
  <div>
    {#key count}
      <div class="text-3xl font-semibold bg-white w-20 rounded-xl m-auto  " transition:slide>
        {count}
      </div>
    {/key}
  </div>
</div>
