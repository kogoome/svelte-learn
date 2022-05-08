<script>
	const types = ['node', 'unary', 'binary', 'polynomial'];
	let selectedType = 'none';
</script>

<div class="flex gap-1">
  라디오 버튼들 :
  {#each types as type}
		<label>
			<input type="radio" bind:group={selectedType} name="type" class="radio radio-sm peer hidden" value={type} />
			<div class="btn btn-xs btn-ghost peer-checked:btn-warning "> {type} </div>
		</label>
  {/each}
</div>

선택된 데이터 : {selectedType}
