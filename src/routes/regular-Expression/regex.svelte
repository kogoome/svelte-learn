<script lang="ts">
  import { slide } from 'svelte/transition'
  // 사용자 입력 정규표현식
  const customRedgex = { id: 'customName', regexStr: 'input your regex', msg: '' }
  function addRegex() {
    if (!regArray.find((regex) => regex.id === customRedgex.id)) {
      const regex = new RegExp(customRedgex.regexStr)
      regArray.push({ id: customRedgex.id, regex: regex })
      customRedgex.msg = '추가되었습니다.'
      regArray[0].id += ' '
    } else {
      customRedgex.msg = '같은 이름이 존재합니다.'
    }
    customRedgex.id = 'customName'
    customRedgex.regexStr = 'input your regex'
  }
  // 정규표현식 리스트
  const regArray = [
    { id: 'en', regex: /[a-zA-Z]/ },
    { id: 'ko', regex: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/ },
    { id: 'number', regex: /[0-9]/ },
    { id: 'email', regex: /^[a-zA-Z0-9]{4,12}@[a-zA-Z0-9]{4,12}.[a-zA-Z0-9]{2,12}$/ },
    { id: 'date', regex: /^[0-9]{4,12}-[0-9]{2,2}-[0-9]{2,2}$/ },
    { id: 'time', regex: /^[0-9]{2,2}:[0-9]{2,2}:[0-9]{2,2}$/ },
    { id: 'datetime', regex: /^[0-9]{4,4}-[0-9]{2,2}-[0-9]{2,2} [0-9]{2,2}:[0-9]{2,2}:[0-9]{2,2}$/ }
  ]
  // 정규표현식 테스팅
  let testedRegex: string[] = []
  function regTest(e: Event) {
    const str = (<HTMLInputElement>e.target).value
    testedRegex = regArray.map((regObj) => {
      // if (regObj.regex.test(str)) return regObj.id
      return regObj.regex.test(str) ? regObj.id : 'null'
    })
    testedRegex = testedRegex.filter((regId) => regId !== 'null')
  }
</script>

<div class="bg-fuchsia-200 m-10 pt-1 pb-3 rounded-xl shadow-lg">
  <div class="text-center bg-white ">
    <h1>Regular Expression</h1>
  </div>
  <div class="px-3 flex flex-col gap-1">
    <h3>custom regex</h3>
    <div class="flex bg-fuchsia-300 gap-2 rounded-md px-2 items-center">
      <div contenteditable="true" bind:textContent={customRedgex.id} class="rounded-md p-1" />
      :
      <div contenteditable="true" bind:textContent={customRedgex.regexStr} class="rounded-md p-1" />
      <div class="m-auto text-fuchsia-300">{customRedgex.msg}</div>
      <button class="btn btn-xs btn-error text-white" on:click={addRegex}> add regex </button>
    </div>
    <div class="bg-pink-300 rounded-md">
      {#each regArray as { id, regex } (id)}
        <div class="flex">
          {id} : {regex.source}
        </div>
      {/each}
    </div>
  </div>
  <div class="px-3">
    <h3>testing</h3>
    <input
      type="text"
      class="peer input input-sm w-full bg-rose-200 text-red-500 text-lg placeholder:text-red-500"
      on:keyup={regTest}
      placeholder="regex testing"
    />
    {#if testedRegex.length > 0}
      <div transition:slide>{JSON.stringify(testedRegex)}</div>
    {/if}
  </div>
</div>
