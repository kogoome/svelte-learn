/* eslint-disable prefer-const */
import { writable, type Writable } from 'svelte/store'
import type { Kanban } from './db'

export const storeTodo: Writable<Kanban[]> = writable([])
export const storeInprogress: Writable<Kanban[]> = writable([])
export const storeComplete: Writable<Kanban[]> = writable([])

export let taskBlockExpand = writable(true)