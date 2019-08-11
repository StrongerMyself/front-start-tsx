import { Timer } from './timer'
import { Trainig, TrainingStore, TrainingApi } from './training'
import { Round } from './round'

type TypeTime = ('round' | 'rest')

export const toggle = (id, active?: boolean) => {
	let T = TrainingStore.getState().find(el => el.id === id)
	if (!T) return
	T.active = active !== undefined ? active : !T.active
	T = TrainingApi.update(T)
	if (!T.timer && T.active) {
		start(T)
	} else if (T.active) {
		let R = T.rounds.find(el => el.active === true)
		if (R) {
			let duration = R.durPass <= R.dur ? R.durPass : R.restPass
			T.timer.start(duration, 'backward')
		} else {
			T.timer.start()
		}
	} else {
		T.timer.stop()
	}
}

export const replay = (id: number, index: number = -1) => {
	let T = TrainingStore.getState().find(el => el.id === id)
	if (!T) return
	T.timer.stop()
	T.rounds = resetRounds(T.rounds, index)
	T.active = true
	T = TrainingApi.update(T)
	run(T)
}

export const stop = (id: number) => {
	let T = TrainingStore.getState().find(el => el.id === id)
	if (!T) return
	T.timer.stop()
	finish(T)
}

const resetRounds = (rounds: Round[], index = -1) => {
	return rounds.map((r, i) => {
		if (i >= index || index < 0) {
			return { ...r, durPass: r.dur, restPass: r.rest, active: false }
		}
		return { ...r }
	})
}

const start = (T: Trainig) => {
	T.active = true
	T.timer = new Timer()
	T = TrainingApi.update(T)
	run(T)
}

const run = (T: Trainig, index: number = 0, type: TypeTime = 'round') => {
	let R = T.rounds[index]
	if (!R) return
	R.active = true
	let duration = type === 'round' ? R.dur : R.rest
	T.timer.sideLoop = loop(T, index, type)
	T.timer.sideEndLoop = endLoop(T, index, type)
	T = TrainingApi.update(T)
	T.timer.start(duration, 'backward')
}

const loop = (T: Trainig, index: number, type: TypeTime) => (timer: Timer) => {
	let R = T.rounds[index]
	if (type === 'round') {
		R.durPass = timer.duration
	} else {
		R.restPass = timer.duration
	}
	T = TrainingApi.update(T)
}

const endLoop = (T: Trainig, index: number, type: TypeTime) => (timer: Timer) => {
	if (type === 'round') {
		run(T, index, 'rest')
	} else {
		let R = T.rounds[index]
		R.active = false
		if (index < T.rounds.length - 1) {
			run(T, ++index)
		} else {
			finish(T)
		}
	}
}

const finish = (T: Trainig) => {
	T.timer = null
	T.active = false
	T.rounds = resetRounds(T.rounds)
	T = TrainingApi.update(T)
}
