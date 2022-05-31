export type kanban = {
  step: string
  title: string
  task: string[]
  index: number
}
export const kanban: kanban[] = [
  // 인덱스는 각 스텝 타이틀의 순서를 나타냄
  { step: 'Todo', title: 'todayWork', task: [], index: 4 },
  { step: 'Todo', title: '0.0.z', task: [], index: 3 },
  { step: 'Todo', title: '0.y.0', task: [], index: 2 },
  { step: 'Todo', title: 'x.0.0', task: [], index: 1 },
  { step: 'Todo', title: 'philosophy', task: [], index: 0 },
  { step: 'Process', title: 'IDB sync', task: [], index: 2 },
  { step: 'Process', title: 'add task', task: [], index: 1 },
  { step: 'Process', title: 'data setting', task: [], index: 0 },
  { step: 'Complete', title: '22/5/29', task: [], index: 0 }
]
// 자료 검색용 데이터
export const stepIndex = [
  kanban.findIndex((item) => item.step === 'Todo'),
  kanban.findIndex((item) => item.step === 'Process'),
  kanban.findIndex((item) => item.step === 'Complete')
] // [0,5,6] 여기서 각각 배열을 만들어야한다.
const kanbanIndex = Array.from({ length: kanban.length }, (v, i) => i) // 총 데이터 인덱스 정보
type stepDataIndex = { [key: string]: number[] }
export const stepDataIndex: stepDataIndex = {
  Todo: kanbanIndex.slice(stepIndex[0], stepIndex[1]),
  Process: kanbanIndex.slice(stepIndex[1], stepIndex[2]),
  Complete: kanbanIndex.slice(stepIndex[2], kanban.length)
} // 스텝별 인덱스 정보

// 배경색 정보
type color = {
  [key: string]: string
}
export const bgColor: color = {
  Todo: 'bg-slate-300',
  Process: 'bg-slate-400',
  Complete: 'bg-slate-500'
}
export const txtColor: color = {
  Todo: 'text-slate-700',
  Process: 'text-slate-900',
  Complete: 'text-slate-200'
}
// 이 데이터 처리는 레이아웃 페이지에서 할것.

export const IDBschema = [
  // 인덱스는 각 스텝 타이틀의 순서를 나타냄
  { id: 0, step: 'Todo', title: 'todayWork', index: 4 },
  { id: 1, step: 'Todo', title: '0.0.z', index: 3 },
  { id: 2, step: 'Todo', title: '0.y.0', index: 2 },
  { id: 3, step: 'Todo', title: 'x.0.0', index: 1 },
  { id: 4, step: 'Todo', title: 'philosophy', index: 0 },
  { id: 5, step: 'Process', title: 'IDB sync', index: 2 },
  { id: 6, step: 'Process', title: 'add task', index: 1 },
  { id: 7, step: 'Process', title: 'data setting', index: 0 },
  { id: 8, step: 'Complete', title: '22/5/29', index: 0 }
]
