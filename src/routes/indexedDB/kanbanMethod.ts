export let clockView = false
export function clockSwitch(e: Event) {
  const todo = document.getElementById('Todo') as HTMLDivElement
  const button = <HTMLDivElement>e.target
  const clock = <HTMLDivElement>todo.previousElementSibling
  if (button.innerHTML === 'Todo') {
    todo.style.display = 'none'
    clock.style.display = 'block'
    clockView = true
  } else {
    clock.style.display = 'none'
    todo.style.display = 'block'
    clockView = false
  }
  // TODO 1. 디비에 저장 2. 클락워크에서 디비 읽어오기 3. 클락워크 문서에 삽입
  // function todayWorkCopy() {
  //   // button.innerHTML === 'Todo' 일때만 호출함수 슬라이드시 주의
  // }
  // TODO 클락 뽀모도로 만들기
}
