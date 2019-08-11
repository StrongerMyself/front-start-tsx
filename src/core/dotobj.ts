const _setDotObj = (obj, path, val) => {
	if (typeof val !== 'undefined') {
		let keys = path.split('.')
		keys.forEach((key, i) => {
			if (i === (keys.length - 1)) {
				obj[key] = val
			} else if (!obj.hasOwnProperty(key)) {
				obj[key] = !isNaN(keys[i + 1]) ? [] : {}
			}
			obj = obj[key]
		})
	}
}

export const setDotObj = (obj, path, val) => {
	let _obj = {...obj}
	_setDotObj(path, val, _obj)
	return _obj
}

export const getDotObj = (obj, path) => {
	return path.split('.').reduce((o, i) => o[i], obj)
}
