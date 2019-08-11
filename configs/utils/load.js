const { config } = require('dotenv')
const { resolve } = require('path')

const load = () => {
	const { NODE_ENV = 'development' } = process.env
	const fileNameEnv = getFileNameEnv(NODE_ENV)
	const path = resolve(__dirname, '../', fileNameEnv)
	let result = config({ path })
	if (!result.error) {
		console.log(`ENV is connect: ${NODE_ENV}`)
	} else {
		console.log(`ENV is not connect`, result.error)
	}
}

const getFileNameEnv = (NODE_ENV) => {
	switch (NODE_ENV) {
		case 'development':
			return '.env'
		case 'test':
			return '.env.test'
		case 'production':
			return  '.env.production'
		default:
			return '.env'
	}
}

module.exports = load
