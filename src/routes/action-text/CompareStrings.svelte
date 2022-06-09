<script lang="ts">
  export let beforeString: string = `동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라만세`
  export let afterString: string = `동해물과 저소나무 백두산이 마르고 하느님이 철갑산이 우리 기상일세 닳도록`
  let resultBefore: string
  let resultAfter: string
  $: beforeString, afterString
  $: resultBefore, resultAfter

  compareStrings()
  async function compareStrings() {
    let beforeArray: string[]
    let afterArray: string[]
    let wordState: any[][]
    await getArray()
    await wordAnalysis()
    await getAddWordsfromAfter()
    await getRemoveWordsFromBefore()

    async function getArray() {
      if (beforeString.length > 0) {
        beforeArray = beforeString.split(' ')
        afterArray = afterString.split(' ')
      } else {
        return false
      }
    }

    async function wordAnalysis() {
      wordState = [...getRemoveStateIdx(beforeArray, afterArray)]
    }

    async function getAddWordsfromAfter() {
      let beforeIdx = Array.from(
        new Set(
          wordState.map((item) => {
            return item[3]
          })
        )
      )
      resultAfter = afterArray
        .map((word, i) => {
          if (beforeIdx.includes(i)) {
            return word
          } else {
            return `<span class="bg-sky-200">${word}</span>`
          }
        })
        .join(' ')
    }

    async function getRemoveWordsFromBefore() {
      resultBefore = wordState
        .map((item) => {
          if (item[0] === 'same') {
            return item[1]
          } else if (item[0] === 'remove') {
            return `<span class="bg-rose-200">${item[1]}</span>`
          }
        })
        .join(' ')
    }

    function* getRemoveStateIdx(beforeArray: string[], afterArray: string[]) {
      let beforeIdx = 0
      let afterIdx = 0
      let afertIdxTemp: number = 0
      let removeOrSame: number = 1
      let sameMatchCycle = 4
      while (true) {
        if (!beforeArray[beforeIdx]) return null // before 배열 끝나면 종료
        if (beforeArray[beforeIdx] === afterArray[afterIdx]) { // 같은 단어가 존재하면
          afertIdxTemp = afterIdx // 애프터배열 인덱스 저장해놓고
          yield ['same', beforeArray[beforeIdx], beforeIdx++, afterIdx++] // 상태 리턴
        } else { // 단어가 다르면
          afterIdx++ // 애프터배열 인덱스 증가시키는데
          removeOrSame++ // 애프터 인덱스 리셋시키는 주기
          if (removeOrSame > sameMatchCycle) { // 4개 단어까지만 허용
            removeOrSame = 1 // 초기화
            afterIdx = afertIdxTemp - 1 // 4개 단어 사이에 같은 단어 못찾으면 
            yield ['remove', beforeArray[beforeIdx], beforeIdx++, ++afterIdx] // 이전 단어는 삭제됐다고 판단하여 상태값 리턴
          }
        }
      }
    }
  }

  function runKeydown(e: KeyboardEvent) {
    if (e.keyCode === 13) {
      e.preventDefault()
      compareStrings()
    }
  }
</script>

<div class="">
  <div
    contenteditable="true"
    bind:textContent={beforeString}
    class="bg-teal-100"
    on:keydown={runKeydown}
  />
  <div
    contenteditable="true"
    bind:textContent={afterString}
    class="bg-pink-100"
    on:keydown={runKeydown}
  />
</div>

<div>{@html resultBefore}</div>
<div>{@html resultAfter}</div>
