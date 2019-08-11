import { Trainig } from './training'

export interface Round {
	id?: number
	parent?: number
	title?: string
	dur?: number, rest?: number
	durPass?: number, restPass?: number
	active?: boolean
}

export const assignRound = (props: Round) => {
	let init = {
		id: 0,
		parent: 0,
		title: '',
		dur: 0, rest: 0,
		durPass: 0, restPass: 0,
		active: false,
	}
	let round: Round = {...init, ...props}
	round.durPass = round.dur
	round.restPass = round.rest
	round.active = false
	return round
}

export const lastRoundId = (list: Trainig[]) => {
	let id = 0
	list.forEach(training => {
		training.rounds.forEach(round => {
			if (round.id > id) id = round.id
		})
	})
	return id
}