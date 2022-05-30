import { kanban, stepIndex, stepDataIndex } from '$lib/IDB/kanbanScheme'

let version = 1
let db: IDBDatabase
DBOpen()
export function DBOpen() {
  // need :stepIndex, kanban, !title
  const dbReq = indexedDB.open('kanban', version)
  dbReq.onsuccess = () => (db = dbReq.result)
  dbReq.onupgradeneeded = (e: IDBVersionChangeEvent) => {
    db = dbReq.result
    if (e.oldVersion < version)
      // 스텝명으로 테이블 생성, 키값으로 스텝타이틀인덱스 사용. 스텝타이틀인덱스 기반 순서 정렬.
      stepIndex.forEach((i) => db.createObjectStore(kanban[i].step, { keyPath: 'index' }))
    // db.createObjectStore(, { keyPath: 'index' })
    console.log('db opened!')
  }
}

export async function getAll(kan: kanban) {
  // need :stepIndex, kanban, !title
  const step = ['Todo', 'Process', 'Complete']
  step.forEach((title) => {
    getStepData(title)
  })
  async function getStepData(title: string) {
    const tx = await db.transaction(title, 'readonly')
    const store = await tx.objectStore(title)
    const request = await store.getAll()
    request.onsuccess = () => {
      const len = request.result.length
      kan.splice(0, len)
      kan.push(...request.result.sort((a, b) => b.index - a.index))
    }
  }
  return kan
}
export async function getTest() {
  const promise = new Promise((resolve) => {
    const idbKanban: kanban = []
    stepIndex.forEach((i) => {
      getStepData(kanban[i].step)
    })
    function getStepData(title: string) {
      const tx = db.transaction(title, 'readonly')
      const store = tx.objectStore(title)
      const request = store.getAll()
      request.onsuccess = () => {
        idbKanban.push(...request.result.sort((a, b) => b.index - a.index))
      }
    }
    resolve(idbKanban)
  })
  const res = await promise
  console.log('getTest()')
  console.log(res)
  return res
}

export function modifyAll(kanban: kanban) {
  // need :stepIndex, kanban, stepDataIndex
  const res = stepIndex.map((i) => {
    // 스텝 스토어 연결
    const title = kanban[i].step
    const store = db.transaction(title, 'readwrite').objectStore(title)
    // 스텝에 있는 모든 항목을 수정
    return stepDataIndex[title].map((idx) => {
      let result: IDBValidKey = 'ok'
      const putReq = store.put(kanban[idx])
      putReq.onsuccess = () => (result = putReq.result)
      return result
    })
  })
  // 변경된 인덱스 정보
  console.log(res)
}

export function versionUp() {
  version++
}
