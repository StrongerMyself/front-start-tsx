let config = {
	host: process.env.HOST || '',
	api_prefix: process.env.API_PREFIX || '/',
}

export const setConfig = (key, value) => {
	config[key] = value
}

export default config
