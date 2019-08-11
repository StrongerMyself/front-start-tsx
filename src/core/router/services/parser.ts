import { location, routing } from '../'

export const createRouting = (list: routing.Route[]) => {
	const config = getRouting(list)
	routing.set(config)
}

const getRouting = (list: routing.Route[], parent?: routing.Route) => {
	const config: routing.Route[] = []
	list.forEach(item => {
		const route = {...item, args: [], match: {}}
		delete route.children
		if (parent) {
			route.name = `${parent.name}.${route.name}`
			route.path = `${parent.path}${route.path}`
		}
		if (route.path.indexOf(':') > -1) {
			let path_words = route.path.split('/')
			path_words.forEach((word, index) => {
				if (word && word.indexOf(':') > -1) {
					route.args.push({ index, key: word })
				}
			})
		}
		if (item.children && item.children.length > 0) {
			const child_config = getRouting(item.children, route)
			config.push(...child_config)
		}
		config.push({...route})
	})
	return [...config]
}

export const getRoute = (_path = location.store.getState()) => {
	const config = routing.store.getState()
	let path = validPath(_path)
	const locs_w = path.split('/')
	let state: routing.Route = { path, name: '' }
	for (let i = 0; i < config.length; i++) {
		const route = {...config[i]}
		const routes_w = route.path.split('/')
		let counter = 0
		locs_w.forEach((loc_w, i) => {
			let route_w = routes_w[i]
			if (loc_w === route_w) counter++
			if (route.args.length > 0) {
				let arg_i = route.args.findIndex((arg) => arg.index === i)
				if (arg_i > -1) {
					route.args[arg_i].value = loc_w
					counter++
				}
			}
		})
		if (counter === routes_w.length) {
			const match = getMatch(route.args)
			state = { ...route, match, path }
			break
		}
	}
	return state
}

export const validPath = (_path) => {
	let path = _path.replace(location.baseUrl(), '')
	let lenLetter = path.length
	let lenIndex = lenLetter - 1
	if (lenLetter > 1 && path.lastIndexOf('/') === lenIndex) {
		path = path.slice(0, lenIndex)
	}
	return path
}

const getMatch = (args: routing.Arg[]) => {
	const match = {}
	args.forEach(arg => {
		const key = arg.key.replace(':', '')
		match[key] = arg.value
	})
	return match
}
