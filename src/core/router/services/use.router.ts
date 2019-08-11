import { useState, useEffect } from 'react'
import { location, getRoute, routing } from '..'

export const useRouter = () => {
	const [state, setState] = useState<routing.Route>(getRoute())

	useEffect(() => location.store.watch(onWatch), [])

	const onWatch = (location: string) => {
		const newState = getRoute(location)
		setState(newState)
	}

	return state
}
