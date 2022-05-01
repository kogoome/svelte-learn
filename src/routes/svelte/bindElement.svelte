<script >
  // dom bind
  let node
  const click = (e)=>{
    e.target.innerHTML+="🚀"
  }

  // value bind
  let value='init string'
  $: console.log(value)
  
  // node bind
</script>
<!-- html document 바인딩 -->

<div class="contentRoot">
  
  <button type="text" bind:this={node} on:click={click} class="btn" > 돔 테스트</button>
  
  <br>
  인풋벨류 테스트 <input type="text" bind:value={value}>
  
</div>