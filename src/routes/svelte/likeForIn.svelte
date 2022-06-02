<script>
  let obj = {
    a: 1,
    b: 2,
    c: 3
  }
</script>

<div class="bg-teal-100 rounded-xl pt-1 pb-5 m-10 shadow-lg">
  <h2 class="bg-white pl-3 mb-5">
    #each
    <span class="text-emerald-700">
      Object.entries(
      <span class="text-teal-500">{JSON.stringify(obj)}</span>
      )
    </span>
    as [key, value], index
  </h2>
  <div class="flex justify-center items-center">
    {#each Object.entries(obj) as [key, value], index}
      index:<span class="text-red-500">{index}</span>
      <div class="bg-teal-200 m-2 p-2 rounded-lg text-cyan-800">
        <div>key:{key}</div>
        <div>value:{value}</div>
      </div>
    {/each}
  </div>
</div>
