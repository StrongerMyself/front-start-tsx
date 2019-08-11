export let config = {
	host: process.env.HOST || '',
	api_prefix: process.env.API_PREFIX || '/',
	dateView: 'DD.MM.YYYY',
	dateFormat: 'YYYY-MM-DD',
}

export const setConfig = (key, value) => {
	config[key] = value
}
