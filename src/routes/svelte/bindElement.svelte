<script lang="ts">
  // element bind
  let button
  // function bind
  function addRocket(e: Event) {
    ;(<HTMLButtonElement>e.target).innerHTML += '🚀'
  }
  // value bind
  let str = 'hey guys'
  let num = 5
  // div bind
  let div = 'hello world'

  // 문서 제목 삽입용 ---------------------
  let fnName = '{functionName}'
  let btn = '{buttonElement}'
</script>

<div class="bg-slate-200 rounded-xl py-1 pb-3 m-10 shadow-lg">
  <h1 class="bg-white px-3 mb-3">
    bind:<span class="text-emerald-500">keyword</span>
  </h1>
  <div class="mx-3 flex flex-col gap-3">
    <div class="bg-slate-300 rounded-xl p-3">
      <h3>EVENT-FN on:click=<span class="text-teal-500">{fnName}</span></h3>
      <button type="text" bind:this={button} on:click={addRocket} class="btn btn-sm"
        >fn addRocket</button
      >
      <h3>bind:this=<span class="text-cyan-500">{btn}</span></h3>
      <div>{button}</div>
    </div>
    <div class="bg-slate-300 rounded-xl p-3">
      <h3>str value 바인딩:</h3>
      <input type="text" bind:value={str} class="input input-sm" />
      <div>{str}: {typeof str}</div>
    </div>
    <div class="bg-slate-300 rounded-xl p-3">
      <h3>num value 바인딩</h3>
      <input type="number" bind:value={num} class="input input-sm" />
      <div>{num}: {typeof num}</div>
    </div>
    <div class="bg-slate-300 rounded-xl p-3">
      <h3>div 바인딩</h3>
      <div>string 타입만 가능</div>
      <div contenteditable="true" bind:textContent={div} class="bg-white w-fit rounded-lg p-1" />
      <div>{div}</div>
    </div>
  </div>
</div>
