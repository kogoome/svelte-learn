import Dexie, { type Table } from 'dexie'

export type Kanban = {
  title: string
  todos: string[]
  index: number
}

export class KanbanDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  Todo!: Table<Kanban>
  InProgress!: Table<Kanban>
  Complete!: Table<Kanban>

  constructor() {
    super('renewKanban')
    this.version(1).stores({
      Todo: 'index, title' // Primary key and indexed props
    })
    this.version(1).stores({
      InProgress: 'index, title' // Primary key and indexed props
    })
    this.version(1).stores({
      Complete: 'index, title' // Primary key and indexed props
    })
  }
}

export const db = new KanbanDexie()



