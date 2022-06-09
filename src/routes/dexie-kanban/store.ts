/* eslint-disable prefer-const */
import { writable, type Writable } from 'svelte/store'
import type { Kanban } from './db'

export const storeTodo: Writable<Kanban[]> = writable([])
export const storeInprogress: Writable<Kanban[]> = writable([])
export const storeComplete: Writable<Kanban[]> = writable([])

export let taskBlockExpand = writable(true)
// export let pressKeys: Writable<{ [key: number]: boolean }> = writable({})
// 위같은 객체는 set()으로 어떻게 변경할지 모르겟다. key[keyCode] = true 이런식으로 써야하는데

