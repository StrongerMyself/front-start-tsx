export const gql = (...args: any) => args[0][0]

export const gqlParse = (str_gql: string) => {
	let { map, str_clean } = gqlMapInput(str_gql)
	return (arg_in = {}) => {
		let pos_offset = 0
		let str = str_clean
		map.forEach(({ pos, args_map }, i) => {
			pos += pos_offset
			let args = []
			args_map.forEach((arg, i) => {
				let [key, value] = arg
				let is_val_input = value.indexOf('$') === 0
				let is_val_valid = arg_in[key] !== undefined
				if (!is_val_input) {
					args.push([key, value])
				} else if (is_val_valid) {
					value = parseArgVal(arg_in[key], key)
					args.push([key, value])
				}
			})
			let arg_str = args.map(arg => arg.join(': ')).join(', ')
			if (arg_str) arg_str = `(${arg_str})`
			pos_offset += arg_str.length
			str = str.slice(0, pos) + arg_str + str.slice(pos)
		})
		return str.replace(/\t/g, ' ').replace(/\n/g, ' ').replace(/\s\s/g, ' ')
	}
}

const gqlMapInput = (str_gql = '') => {
	let str = str_gql
	let map = []
	if (str_gql) {
		let pos = -1
		while ((pos = str.indexOf('(', pos + 1)) !== -1) {
			let end = str.indexOf(')') + 1
			let args_str = str.slice(pos, end).replace(/\(/g, '').replace(/\)/g, '').replace(/\s/g, '')
			let args_arr = args_str.split(',')
			let args_map = args_arr.map((str) => str.split(':'))
			let str_clean = str.slice(0, pos) + str.slice(end)
			map.push({ pos, args_map })
			str = str_clean
		}
	}
	return { map, str_clean: str }
}

const parseArgVal = (obj, key) => {
	let res = ''
	if (key.indexOf('input') >= 0 && typeof obj === 'object') {
		const reducer = (accum, key) => {
			let field = `${key}: ${JSON.stringify(obj[key])}`
			accum.push(field)
			return accum
		}
		let reduceRes = Object.keys(obj).reduce(reducer, []).join(', ')
		res = `{${reduceRes}}`
	} else {
		res = JSON.stringify(obj)
	}
	return res
}
