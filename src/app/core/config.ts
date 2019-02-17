let config = {
	api_url: process.env.API_URL || ''
}

export const setConfig = (key, value) => {
	config[key] = value
}

export default config
