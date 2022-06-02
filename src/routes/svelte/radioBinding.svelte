<script>
  let str = '{selectedType}'

  const types = ['node', 'unary', 'binary', 'polynomial']
  let selectedType = 'none'
</script>

<div class="bg-rose-100 rounded-xl m-10 py-3 shadow-lg">
  <h2 class="bg-white pl-3">
    bind:group=
    <span class="text-rose-500">
      {str}
    </span>
  </h2>
  <div class="bg-rose-200 rounded-lg p-3 mt-3 mx-3">
    <div class="flex gap-3">
      라디오 버튼들 :
      {#each types as type}
        <label class="flex items-center">
          <input
            type="radio"
            bind:group={selectedType}
            name="type"
            class="radio radio-sm peer hidden"
            value={type}
          />
          <div class="btn btn-xs btn-ghost peer-checked:btn-error ">{type}</div>
        </label>
      {/each}
    </div>
    <div>
      선택된 데이터 :
      <span class="text-orange-500">
        {selectedType}
      </span>
    </div>
  </div>
</div>
