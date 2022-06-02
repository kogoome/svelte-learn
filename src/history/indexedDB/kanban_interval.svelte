<script lang="ts">
  import type { kanban } from './kanbanScheme'
  let kanbanSteps = ['Todo', 'Process', 'Complete']

  let version = 1
  let db: IDBDatabase
  const dbRequest = indexedDB.open('kanban', version)
  dbRequest.onsuccess = () => {
    db = dbRequest.result
    console.log('db opened')
  }
  dbRequest.onupgradeneeded = (e) => {
    db = dbRequest.result
    if (e.oldVersion < version) {
      kanbanSteps.forEach((step) => {
        db.createObjectStore(step, { keyPath: 'index' })
      })
    }
  }
  let kanbanData: kanban[] = []
  $: db
  $: kanbanData

  function getData() {
    let result: kanban[] = []
    kanbanSteps.forEach((step) => {
      getStepData(step, result)
    })
    console.log(result)
    const interval = setInterval(() => {
      if (result.length > 0) {
        clearInterval(interval)
        kanbanData = result
        console.log('load success')
      } else {
        console.log('loading...')
      }
    }, 50)
  }

  function getStepData(step: string, arr: kanban[]) {
    const tx = db.transaction(step, 'readonly')
    const store = tx.objectStore(step)
    const request = store.getAll()
    request.onsuccess = () => {
      // const len = request.result.length
      arr.push(...request.result.sort((a, b) => b.index - a.index))
    }
  }

  const interval = setInterval(() => {
    console.log('wait for db')
    if (db) {
      clearInterval(interval)
      getData()
    }
  }, 200)

  function makeDataStructure() {}
</script>

<div>
  {JSON.stringify(kanbanData)}
</div>
