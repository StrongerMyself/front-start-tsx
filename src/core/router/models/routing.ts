import { createStore, createEvent } from 'effector'

export interface Route {
	name: string
	path: string
	children?: Route[]
	args?: Arg[]
	match?: any
}

export interface Arg {
	key: string
	index: number
	value?: string
}

export const set = createEvent<Route[]>('setRouter')

export const store = createStore<Route[]>([])
	.on(set, (state, payload) => [...payload])
