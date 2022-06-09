import { listUpload } from './kanbanFunctions'
/* 
! 키보드 이벤트
- keypress 
비 권장. 누를때만 이벤트 발생하며 특수키 지원 x

- keydown 
- keyup
눌럿을떼와 뗄때가 구분되어 누른상태를 배열값으로 만들수 있고
이때문에 동시입력이 가능하다.
단축키를 만들때 사용하면 매우 유용하다.

단 한글입력과 관련해서는 글자완성 상태를 잡아낼 수 없다.

- input
[isComposing:true] - 한글을 조합해주는 기능
input 이벤트를 이용하면 한글자가 완성될때를 기준으로 기능을 부여할 수 있다.
e.data = "ㅎ"
e.data = "하"
e.data = "한" 
[inputType: 'insertCompositionText', 'insertText' ... ]
키코드는 지원하지 않기때문에 동시입력을 사용할 수 없다.
블럭지정 또한 반응하지 않는다.

- change
입력된 값이 최종변경(엔터입력)되면 이벤트 발생. 

*/

const keys: {
  [key: number]: boolean
} = {}
export function keyUp(e: KeyboardEvent) {
  // console.log(e.keyCode)
  keys[e.keyCode] = false
}
export function titleKeyDown(e: KeyboardEvent) {
  keys[e.keyCode] = true
  const currentTitle = e.currentTarget as HTMLDivElement
  const parentDivOfTitleTask = currentTitle.parentElement as HTMLDivElement
  const process = currentTitle.getAttribute('data-origin-process') as string
  const processArr = ['Todo', 'InProgress', 'Complete']
  const i = processArr.findIndex((item) => item === process)
  const prevProcess = i === 0 ? processArr[2] : processArr[i - 1]
  const nextProcess = i === 2 ? processArr[0] : processArr[i + 1]
  const prevTitle = currentTitle.parentElement?.previousElementSibling?.firstChild as HTMLDivElement
  const nextTitle = currentTitle.parentElement?.nextElementSibling?.firstChild as HTMLDivElement
  const prevProcessTitle = document.querySelector(`[data-sortable="${prevProcess}"]`)
    ?.firstElementChild?.firstElementChild as HTMLDivElement
  const nextProcessTitle = document.querySelector(`[data-sortable="${nextProcess}"]`)
    ?.firstElementChild?.firstElementChild as HTMLDivElement
  const innerTask = currentTitle.nextElementSibling?.firstElementChild as HTMLDivElement
  if (keys[27] || (!keys[17] && keys[13])) {
    // esc
    esc_focusOut(currentTitle)
    listUpload()
  } else if ((keys[17] && keys[38]) || (keys[38] && keys[25])) {
    // ctrl + up || up + right ctrl
    ctrlUp_moveToTitle('prev')
  } else if ((keys[17] && keys[40]) || (keys[40] && keys[25])) {
    // ctrl + down || down + right ctrl
    ctrlUp_moveToTitle('next')
  } else if ((keys[17] && keys[37] && !keys[16]) || (keys[37] && keys[25])) {
    // ctrl + left + !shift || left + right ctrl
    moveCursorToProcessTitle('prev')
  } else if ((keys[17] && keys[39] && !keys[16]) || (keys[39] && keys[25])) {
    // ctrl + right + !shift || right + right ctrl
    moveCursorToProcessTitle('next')
  } else if (keys[40] || (keys[17] && keys[13])) {
    // down or ctrl enter
    moveToInnerTask()
  } else if (keys[16] && keys[46] && !keys[17]) {
    // shift + delete
    currentTitle.innerHTML = ''
  } else if (keys[17] && keys[16] && keys[46]) {
    // ctrl + shift + delete
    deleteElement()
  } else if (keys[17] && keys[16] && keys[37]) {
    // ctrl + shift + left
    moveDivToProcess('prev')
  } else if (keys[17] && keys[16] && keys[39]) {
    // ctrl + shift + right
    moveDivToProcess('next')
  } else if (keys[112]) {
    // F1 개발자용 키보드 이벤트
    e.preventDefault()
    console.log(JSON.stringify(keys))
    console.log(currentTitle)
  }
  function moveDivToProcess(direction: 'prev' | 'next') {
    e.preventDefault()
    // keys[17] = false
    // keys[16] = false
    keys[37] = false
    keys[39] = false
    switch (direction) {
      case 'prev':
        logic(prevProcess)
        break
      case 'next':
        logic(nextProcess)
        break
    }
    function logic(process: string) {
      parentDivOfTitleTask
      process
      const processDiv = document.querySelector(`[data-sortable="${process}"]`) as HTMLDivElement
      currentTitle.setAttribute('data-index', String(processDiv.childElementCount))
      currentTitle.setAttribute('data-origin-process', process)
      processDiv.insertBefore(parentDivOfTitleTask, processDiv.firstChild)
      currentTitle.focus()
    }
  }
  function deleteElement() {
    keys[17] = false
    keys[16] = false
    keys[46] = false
    e.preventDefault()
    if (!parentDivOfTitleTask) return false
    const trashBox = document.getElementById('trashBox')
    if (!trashBox) return false
    currentTitle.setAttribute('data-origin-process', 'trashBox')
    trashBox.appendChild(parentDivOfTitleTask)
    console.log(trashBox)
  }
  function ctrlUp_moveToTitle(direction: 'prev' | 'next') {
    e.preventDefault()
    e.stopPropagation()
    switch (direction) {
      case 'prev':
        MT_Logic(prevTitle)
        break
      case 'next':
        MT_Logic(nextTitle)
        break
    }
    function MT_Logic(prevOrNextTitleElement: HTMLDivElement) {
      if (prevOrNextTitleElement) {
        prevOrNextTitleElement.setAttribute('contenteditable', 'true')
        currentTitle.setAttribute('contenteditable', 'false')
        prevOrNextTitleElement.focus()
      }
    }
  }
  function moveCursorToProcessTitle(direction: 'prev' | 'next') {
    e.preventDefault()
    e.stopPropagation()
    switch (direction) {
      case 'prev':
        MPT_Logic(prevProcessTitle, nextProcessTitle, 'next')
        break
      default:
        MPT_Logic(nextProcessTitle, prevProcessTitle, 'prev')
        break
    }
    function MPT_Logic(
      prevOrNextProcessTitleElement: HTMLDivElement,
      negativeProcessTitleElement: HTMLDivElement,
      nagativeDirection: 'prev' | 'next'
    ) {
      if (prevOrNextProcessTitleElement) {
        prevOrNextProcessTitleElement.setAttribute('contenteditable', 'true')
        currentTitle.setAttribute('contenteditable', 'false')
        prevOrNextProcessTitleElement.focus()
      } else if (negativeProcessTitleElement) {
        moveCursorToProcessTitle(nagativeDirection)
      }
    }
  }
  function moveToInnerTask() {
    innerTask.setAttribute('contenteditable', 'true')
    currentTitle.setAttribute('contenteditable', 'false')
    keys[17] = false
    keys[40] = false
    keys[13] = false
    innerTask.focus()
  }
}

export function taskKeyDown(e: KeyboardEvent) {
  keys[e.keyCode] = true
  const currentTask = <HTMLDivElement>e.target
  const prev = currentTask.previousElementSibling as HTMLDivElement | null
  const next = currentTask.nextElementSibling as HTMLDivElement | null
  const title = currentTask.parentElement?.previousElementSibling as HTMLDivElement | null

  if (keys[13]) {
    enter_addTaskDivElement()
  } else if (keys[27]) {
    esc_focusOut(currentTask)
    listUpload()
  } else if (keys[38] && !keys[17] && !keys[16]) {
    up_down_moveToTask(prev)
  } else if (keys[40] && !keys[17] && !keys[16]) {
    up_down_moveToTask(next)
  } else if (keys[8]) {
    backSpace_removeEmptyTaskElement()
  } else if (keys[17] && keys[38]) {
    // ctrl + up
    ctrlUp_moveToTitleFromTask()
    pressKeyCodeSync(17)
  } else if (keys[16] && keys[46]) {
    // shift + delete
    currentTask.innerHTML = ''
  }
  function backSpace_removeEmptyTaskElement() {
    if (currentTask.innerText.trim() === '') {
      e.preventDefault()
      e.stopPropagation()
      if (prev) {
        prev.setAttribute('contenteditable', 'true')
        currentTask.remove()
        prev.focus()
      } else {
        ctrlUp_moveToTitleFromTask()
      }
    }
  }
  function up_down_moveToTask(prevOrNextTaskElement: HTMLDivElement | null) {
    e.preventDefault()
    e.stopPropagation()
    if (prevOrNextTaskElement) {
      prevOrNextTaskElement.setAttribute('contenteditable', 'true')
      currentTask.setAttribute('contenteditable', 'false')
      prevOrNextTaskElement.focus()
    } else {
      ctrlUp_moveToTitleFromTask()
    }
  }
  function ctrlUp_moveToTitleFromTask() {
    keys[17] = false
    keys[38] = false
    keys[40] = false
    if (title) {
      title.setAttribute('contenteditable', 'true')
      currentTask.setAttribute('contenteditable', 'false')
      title.focus()
    }
  }
  function enter_addTaskDivElement() {
    // 키이벤트
    keys[13] = false
    e.preventDefault()
    e.stopPropagation()
    currentTask.setAttribute('contenteditable', 'false')
    // div제작
    const newDivStr = currentTask.outerHTML
    const newDiv = stringToElement(newDivStr) as HTMLDivElement
    newDiv.innerHTML = ''
    newDiv.setAttribute('contenteditable', 'true')
    newDiv.setAttribute('data-ph', 'Task')
    newDiv.addEventListener('keydown', taskKeyDown)
    newDiv.addEventListener('keyup', keyUp)
    newDiv.addEventListener('dblclick', contentDbClick)
    currentTask.parentElement?.appendChild(newDiv)
    newDiv.focus()
  }
  function stringToElement(htmlTagString: string) {
    const div = document.createElement('div')
    div.innerHTML = htmlTagString
    return div.firstChild
  }
}

export function esc_focusOut(currentDivElement: HTMLDivElement) {
  // NOTE 키업이벤트가 일어나지 않으므로 할당된 키코드 강제 할당제거
  keys[27] = false
  keys[13] = false
  currentDivElement.setAttribute('contenteditable', 'false')
  currentDivElement.blur()
  // listUpload()
}

export function contentDbClick(e: Event) {
  const currentDiv = <HTMLDivElement>e.target
  currentDiv.setAttribute('contenteditable', 'true')
  currentDiv.focus()
}

export function pressKeyCodeSync(keyCode: number) {
  keys[keyCode] = true
}
