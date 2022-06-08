/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { taskBlockExpand, storeComplete, storeInprogress, storeTodo } from './store'
import Sortable from 'sortablejs'
import Swal from 'sweetalert2'
import { db, type Kanban } from './db'

let subscribe_taskBlockExpand: boolean // 읽기 전용
let subscribe_storeTodo: Kanban[]
let subscribe_storeInprogress: Kanban[]
let subscribe_storeComplete: Kanban[]
taskBlockExpand.subscribe((value) => (subscribe_taskBlockExpand = value))
storeTodo.subscribe((arrayKanban) => (subscribe_storeTodo = arrayKanban))
storeInprogress.subscribe((arrayKanban) => (subscribe_storeInprogress = arrayKanban))
storeComplete.subscribe((arrayKanban) => (subscribe_storeComplete = arrayKanban))

let trashBoxActive = false

export function addTask(e: Event) {
  const processName = (<HTMLButtonElement>e.target).getAttribute('data-btn-process')! as
    | 'Todo'
    | 'InProgress'
    | 'Complete'
  addTaskElement(processName)
  firstTitleFocus(processName)
}
export function addTaskElement(processName: 'Todo' | 'InProgress' | 'Complete') {
  switch (processName) {
    case 'Todo':
      storeTodo.set([
        { title: 'title', todos: ['todo:'], index: subscribe_storeTodo.length },
        ...subscribe_storeTodo
      ])
      break
    case 'InProgress':
      storeInprogress.set([
        { title: 'title', todos: ['todo'], index: subscribe_storeInprogress.length },
        ...subscribe_storeInprogress
      ])
      break
    case 'Complete':
      storeComplete.set([
        { title: 'title', todos: ['todo:'], index: subscribe_storeComplete.length },
        ...subscribe_storeComplete
      ])
      break
  }
}

export async function getDB() {
  const Todo = db.Todo.reverse().toArray()
  const InProgress = db.InProgress.reverse().toArray()
  const Complete = db.Complete.reverse().toArray()
  const result = await Promise.all([Todo, InProgress, Complete]).then(
    ([Todo, InProgress, Complete]) => {
      return { Todo, InProgress, Complete }
    }
  )
  return result
}

export function sortableOn() {
  const stbCollection = document.querySelectorAll('[data-sortable]') as NodeListOf<HTMLElement>
  for (const stbItem of stbCollection) {
    Sortable.create(stbItem, {
      group: {
        name: stbItem.getAttribute('data-sortable') as string,
        put: true
      },
      animation: 200,
      // delay: 100,
      swapThreshold: 0.35,
      easing: 'cubic-bezier(1, 0, 0, 1)',
      // ghostClass: 'blue-background-class',
      onStart: () => {
        taskExpand('off')
        trashBox('on')
      },
      onEnd: async () => {
        taskExpand('on')
        if (!trashBoxActive) trashBox('off')
        // 드롭한 시점에서 뷰의 정보구조를 읽어오고
        const addresses: {
          [key: string]: {
            newProcessAdr: HTMLElement | null | undefined
            indexNProcessAdr: HTMLDivElement
          }[]
        } = await dataFarmingAdr()
        // 카테고리별 랭스를 통해 인덱스 값을 찾아서
        let lastIndexTodo = addresses.todoAddress.length - 1
        let lastIndexInprogress = addresses.inprogressAddress.length - 1
        let lastIndexComplete = addresses.completeAddress.length - 1
        for (const processAdr in addresses) {
          // 인덱스만 변경해보자.
          addresses[processAdr].forEach((adrObj) => {
            switch (processAdr) {
              case 'todoAddress':
                adrObj.indexNProcessAdr.setAttribute('data-index', `${lastIndexTodo--}`)
                break
              case 'inprogressAddress':
                adrObj.indexNProcessAdr.setAttribute('data-index', `${lastIndexInprogress--}`)
                break
              case 'completeAddress':
                adrObj.indexNProcessAdr.setAttribute('data-index', `${lastIndexComplete--}`)
                break
            }
          })
        }
        listUpload()
      }
    })
  }
}
export async function listUpload() {
  taskExpand('on')
  const dataSet = dataFarming()
  console.log(dataSet)
  dbClear()
    .then(async () => bundleBulkUpload(await dataSet))
    .then(() =>
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        icon: 'success',
        title: 'Your tasks has been saved',
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
    )
    .catch((e) => {
      console.log(e)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${e}`,
        footer: '<a href="/">Why do I have this issue?</a>'
      })
    })
  async function dbClear() {
    // 이 방식은 너무 리스키하다. 대안을 찾자.
    if (subscribe_taskBlockExpand == false) return new Error('태스크 블록이 없습니다')
    await Promise.all([db.Todo.clear(), db.InProgress.clear(), db.Complete.clear()])
      .then(() => {
        console.log('db clear')
      })
      .catch((e) => {
        console.log(e)
      })
    // 휴지통을 운영하니까 휴지통에 있는 객체를 가져와서 삭제하는 방식은 어떤가?
    // 그럼 스텝이동된 경우
  }
  async function bundleBulkUpload(dataSet: { [key: string]: Kanban[] }) {
    const { todoStore, inprogressStore, completeStore } = dataSet
    Promise.all([
      db.Todo.bulkAdd(todoStore),
      db.InProgress.bulkAdd(inprogressStore),
      db.Complete.bulkAdd(completeStore)
    ])
      .then(() => console.log('Upload Complete'))
      .catch((e) => e)
  }
  async function dataFarming() {
    const address: {
      [key: string]: {
        newProcessAdr: HTMLElement | null | undefined
        indexNProcessAdr: HTMLDivElement
      }[]
    } = await dataFarmingAdr()

    const todoStore: Kanban[] = []
    const inprogressStore: Kanban[] = []
    const completeStore: Kanban[] = []
    for (const processAddr in address) {
      address[processAddr].forEach((obj) => {
        const process = obj.newProcessAdr!.getAttribute('data-sortable')!
        const index = obj.indexNProcessAdr.getAttribute('data-index')! as string
        const title = obj.indexNProcessAdr.innerText
        const todos = Array.from(obj.indexNProcessAdr.nextElementSibling!.children).map(
          (task) => task.innerHTML
        )
        const item = { title, todos, index: Number(index) }
        switch (process) {
          case 'Todo':
            todoStore.push(item)
            break
          case 'InProgress':
            inprogressStore.push(item)
            break
          case 'Complete':
            completeStore.push(item)
            break
        }
      })
    }
    console.log('data farming complete')
    return { todoStore, inprogressStore, completeStore }
  }
}
async function dataFarmingAdr() {
  const divCollector = document.querySelectorAll('[data-index]') as NodeListOf<HTMLDivElement>
  const todoAddress = []
  const inprogressAddress = []
  const completeAddress = []
  const historyAddress = []
  for (const divItem of divCollector) {
    const newProcessAdr = divItem.parentElement?.parentElement
    const indexNProcessAdr = divItem
    const newProcessValue = divItem.parentElement!.parentElement!.getAttribute('data-sortable')!
    const item = { newProcessAdr, indexNProcessAdr }
    switch (newProcessValue) {
      case 'Todo':
        todoAddress.push(item)
        break
      case 'InProgress':
        inprogressAddress.push(item)
        break
      case 'Complete':
        completeAddress.push(item)
        break
      case 'History':
        historyAddress.push(item)
        break
    }
  }
  return { todoAddress, inprogressAddress, completeAddress }
}
export function f1_tutorial() {
  Swal.fire({
    title: '<strong>keyboard shortcut</strong>',
    html: `
<div class="flex flex-col justify-center gap-2 p-2">
  <div class="bg-slate-100 rounded-md px-10 pb-2 flex flex-col gap-1 text-left">
    <div class="text-xl font-medium text-teal-600 text-center">MAIN FOCUSOUT</div>
    <div>
      <span class="font-medium">
        <span class="border-2 border-solid rounded-lg px-1 bg-slate-300">ctrl</span> +
        <span class="border-2 border-solid rounded-lg px-1 bg-slate-300">F1</span>
      </span>
      : this
    </div>
    <div>
      <span class="font-medium">
        <span class="border-2 border-solid rounded-lg px-1 bg-slate-300">ctrl</span> +
        <span class="border-2 border-solid rounded-lg px-1 bg-slate-300">shift</span> +
        <span class="border-2 border-solid rounded-lg px-1 bg-slate-300">s</span>
      </span>
      : save
    </div>
    <div>
      <span class="font-medium">
        <span class="border-2 border-solid rounded-lg px-1 bg-slate-300">ctrl</span> +
        <span class="border-2 border-solid rounded-lg px-1 bg-slate-300">shift</span> +
        <span class="border-2 border-solid rounded-lg px-1 bg-slate-300">space</span>
      </span>
      : add task in Todo
    </div>
  </div>
  <div class="bg-slate-100 rounded-md px-10 pb-2 flex flex-col gap-1 text-left">
    <div class="text-xl font-medium text-orange-600 text-center">TITLE FOCUS</div>
    <div>
      <span class="font-medium">
        <span class="border-2 border-solid rounded-lg px-1 bg-slate-300">ctrl</span> +
        <span class="border-2 border-solid rounded-lg px-1 bg-slate-300">arrow key</span>
      </span>
      : move title
    </div>
    <div>
      <span class="font-medium">
        <span class="border-2 border-solid rounded-lg px-1 bg-slate-300">ctrl</span> +
        <span class="border-2 border-solid rounded-lg px-1 bg-slate-300">enter</span>,
        <span class="border-2 border-solid rounded-lg px-1 bg-slate-300">arrow down</span>
      </span>
      : move task
    </div>
    <div>
      <span class="font-medium">
        <span class="border-2 border-solid rounded-lg px-1 bg-slate-300">esc</span>,
        <span class="border-2 border-solid rounded-lg px-1 bg-slate-300">enter</span>
      </span>
      : editing close and save
    </div>
  </div>
  <div class="bg-slate-100 rounded-md px-10 pb-2 flex flex-col gap-1 text-left">
    <div class="text-xl font-medium text-lime-600 text-center">TASK FOCUS</div>
    <div>
      <span class="font-medium">
        <span class="border-2 border-solid rounded-lg px-1 bg-slate-300">ctrl</span> +
        <span class="border-2 border-solid rounded-lg px-1 bg-slate-300">arrow up</span>
      </span>
      : move to title
    </div>
    <div>
      <span class="font-medium">
        <span class="border-2 border-solid rounded-lg px-1 bg-slate-300">arrow up</span>,
        <span class="border-2 border-solid rounded-lg px-1 bg-slate-300">arrow down</span>
      </span>
      : move to task
    </div>
    <div>
      <span class="font-medium">
        <span class="border-2 border-solid rounded-lg px-1 bg-slate-300">enter</span>
      </span>
      : add task 
    </div>
    <div>
      <span class="font-medium">
        <span class="border-2 border-solid rounded-lg px-1 bg-slate-300">esc</span>
      </span>
      : editing close and save
    </div>
  </div>
</div>
        `,
    // showCloseButton: true,
    // showCancelButton: true,
    heightAuto: true,
    focusConfirm: true,
    confirmButtonText: '<i class="fa fa-thumbs-up"></i> Enter close!'
    // confirmButtonAriaLabel: 'Thumbs up, great!'
  })
}
export function trashBox(option?: string) {
  if (!option) option = 'toggle'
  const trashBox = document.querySelector('#trashBox') as HTMLDivElement
  switch (option) {
    case 'on':
      trashBox.classList.remove('opacity-0')
      break
    case 'off':
      trashBox.classList.add('opacity-0')
      break
    default:
      trashBoxActive = !trashBoxActive
      trashBox.classList.toggle('opacity-0')
      break
  }
}

export function taskExpand(option?: string) {
  if (!option) option = 'toggle'
  switch (option) {
    case 'on':
      taskBlockExpand.set(true)
      break
    case 'off':
      taskBlockExpand.set(false)
      break
    default:
      taskBlockExpand.set(!subscribe_taskBlockExpand)
      break
  }
}

export function firstTitleFocus(option?: 'Todo' | 'InProgress' | 'Complete') {
  setTimeout(handler, 100)
  function handler() {
    if (!option) option = 'Todo'
    const selector = `[data-origin-process="${option}"]`
    const firstTitle = document.querySelector(selector) as HTMLDivElement
    console.log(firstTitle)
    firstTitle.setAttribute('contenteditable', 'true')
    firstTitle.focus()
    taskExpand('on')
  }
}
