import Dexie, { type Table } from 'dexie'

export type Kanban = {
  step: 'Todo' | 'Process' | 'Complete'
  title: string
  task: string[]
  index: string
}

export class KanbanDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  Todo!: Table<Kanban>
  Process!: Table<Kanban>
  Complete!: Table<Kanban>

  constructor() {
    super('kanban')
    this.version(1).stores({
      Todo: 'index, title' // Primary key and indexed props
    })
    this.version(1).stores({
      Process: 'index, title' // Primary key and indexed props
    })
    this.version(1).stores({
      Complete: 'index, title' // Primary key and indexed props
    })
  }
}

export const db = new KanbanDexie()
