interface Mode {
	[x: string]: any
}

export const cn = (block: string, elem?: string) => (mode?: Mode) => {
	let str = block
	if (elem) {
		str += `__${elem}`
	}
	if (mode) {
		let modeStr = ''
		Object.keys(mode).forEach(key => {
			modeStr += ` ${str}-${key}--${mode[key]}`
		})
		str += modeStr
	}
	return str
}

export const mCn = (...strs: string[]) => {
	let str = ''
	strs.forEach(item => str += !str ? item : item ? ` ${item}` : '')
	return str
}

export const hCn = (block: string) => (elem?: string) => (mode?: Mode) => {
	return cn(block, elem)(mode)
}
