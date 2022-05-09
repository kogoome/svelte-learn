<script>
  // 사용자 입력 정규표현식
  const customRedgex = {id:"customName", regexStr:"input your regex"};
  function addRegex() {
    
    if (!regArray.find(regex => regex.id === customRedgex.id)) {
      const regex = new RegExp(customRedgex.regexStr)
      regArray.push({id:customRedgex.id, regex:regex})
      regArray[0].id += " "
    } else {
      alert("같은 이름이 존재합니다.")
    }
    customRedgex.id = "customName"
    customRedgex.regexStr = "input your regex"
  }
  // 정규표현식 리스트
  const regArray = [
    { id: "en", regex: /[a-zA-Z]/ },
    { id: "ko", regex: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/ },
    { id: "number", regex: /^[0-9]$/ },
    { id: "email", regex: /^[a-zA-Z0-9]{4,12}@[a-zA-Z0-9]{4,12}.[a-zA-Z0-9]{2,12}$/ },
    { id: "date", regex: /^[0-9]{4,12}-[0-9]{2,2}-[0-9]{2,2}$/ },
    { id: "time", regex: /^[0-9]{2,2}:[0-9]{2,2}:[0-9]{2,2}$/ },
    { id: "datetime", regex: /^[0-9]{4,4}-[0-9]{2,2}-[0-9]{2,2} [0-9]{2,2}:[0-9]{2,2}:[0-9]{2,2}$/ },
  ]
  // 정규표현식 테스팅
  let testedRegex = []
  function regTest(e) {
    const str = e.target.value
    testedRegex = regArray.map(regObj => {
      // if (regObj.regex.test(str)) return regObj.id
      return regObj.regex.test(str)?regObj.id:"null"
    })
    testedRegex=testedRegex.filter(regId => regId!=="null")
  }

</script>

<h3>정규표현식</h3>

<div class="flex bg-blue-100 gap-2">
  <div contenteditable="true" bind:textContent={customRedgex.id}/> : 
  <div contenteditable="true" bind:textContent={customRedgex.regexStr}/>
  <button class="btn btn-xs btn-ghost ml-auto text-slate-400" on:click={addRegex}>
    add regex
  </button>
</div>

{#each regArray as {id, regex} (id)}
  <div class="flex">
    {id} : {regex.source}
  </div>
{/each}

<h3>테스팅</h3>
<input type="text" class="peer input input-xs w-screen bg-blue-100" on:keyup={regTest} placeholder="regex testing"/>
{JSON.stringify(testedRegex)}
<!-- {#each testedRegex as obj}
  <div>
    {obj.id} : {obj.regex?.source}
  </div>
{/each} -->


