/* eslint-disable prefer-const */
import { writable, type Writable } from 'svelte/store'
import type { Kanban } from './renewDb'

export const storeTodo: Writable<Kanban[]> = writable([])
export const storeInprogress: Writable<Kanban[]> = writable([])
export const storeComplete: Writable<Kanban[]> = writable([])

