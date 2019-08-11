import { createStore, createApi } from 'effector'
import { useState, useEffect } from 'react'
import data from './data'
import { Timer } from './timer'
import { Round, assignRound, lastRoundId } from './round'

export interface Trainig {
	id?: number
	title?: string
	datetime?: string
	rounds?: Round[]
	active?: boolean
	timer?: Timer
}

export const TrainingStore = createStore<Trainig[]>(data)
export const TrainingApi = createApi(TrainingStore, {
	set: (s, p) => [...p],
	create: (s, p: Trainig) => {
		let training = assignTraining(p)
		training.id = lastTrainingId(s) + 1
		let roundId = lastRoundId(s)
		training.rounds = training.rounds.map(round => {
			roundId += 1
			return assignRound({...round, id: roundId, parent: training.id})
		})
		return [...s, training]
	},
	update: (s, p: Trainig) => {
		let index = s.findIndex(el => el.id === p.id)
		if (index > -1) {
			s[index] = { ...s[index], ...p }
		}
		return [...s]
	},
	addRound: (s, p: Round[]) => {
		p.forEach(round => {
			let index = s.findIndex(el => el.id === round.parent)
			if (index > -1) {
				round = assignRound(round)
				let roundId = lastRoundId(s) + 1
				round.id = roundId
				round.parent = s[index].id
				s[index].rounds.push(round)
			}
		})
		return [...s]
	}
})

const assignTraining = (props: Trainig) => {
	let init = {
		id: 0,
		title: '',
		datetime: '',
		rounds: [],
		active: false,
		timer: null,
	}
	let training: Trainig = { ...init, ...props }
	training.active = false
	return training
}

const lastTrainingId = (list: Trainig[]) => {
	let id = 0
	list.forEach(el => {
		if (el.id > id) id = el.id
	})
	return id
}

export const useTrainings = () => {
	const [state, setState] = useState<Trainig[]>([])
	useEffect(() => TrainingStore.watch(setState), [])
	return state
}

export const useTraining = (id) => {
	const [state, setState] = useState<Trainig>(null)
	useEffect(() => TrainingStore.watch(onSetState), [])
	const onSetState = (list) => {
		let item = list.find(el => el.id === id)
		setState(item)
	}
	return state
}

// @ts-ignore
window.TrainingStore = TrainingStore
// @ts-ignore
window.TrainingApi = TrainingApi
