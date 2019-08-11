import { createStore, createEvent } from 'effector'

export const set = createEvent<string>('setLocation')
export const push = createEvent<string>('pushLocation')
export const replace = createEvent<string>('replaceLocation')
export const back = createEvent('backLocation')
export const forward = createEvent('forwardLocation')

export const baseUrl = () => {
	let path = document.querySelector('base').getAttribute('href')
	if (path === '/') {
		return ''
	}
	return path
}

export const store = createStore(window.location.pathname)
	.on(set, (s, p) => p)
	.on(push, (s, p) => {
		let pathname = `${baseUrl()}${p}`
		window.history.pushState({}, window.document.title, pathname)
		return window.location.pathname
	})
	.on(replace, (s, p) => {
		let pathname = `${baseUrl()}${p}`
		window.history.replaceState({}, window.document.title, pathname)
		return window.location.pathname
	})
	.on(back, () => {
		window.history.back()
		return window.location.pathname
	})
	.on(forward, () => {
		window.history.forward()
		return window.location.pathname
	})

window.addEventListener('popstate', () => set(window.location.pathname))

// push.watch(console.log)
// store.watch((state) => console.log('locationStore: ', state))
