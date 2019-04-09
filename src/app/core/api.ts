import axios, { AxiosInstance } from 'axios'
import Qs from 'qs'

import config from './config'

const paramsSerializer = (params = {}) => Qs.stringify(params, { arrayFormat: 'brackets', skipNulls: true })

class Api {

	client: AxiosInstance

	constructor(baseURL: string = config.host + config.api_prefix, headers: any = {}) {
		headers['Accept'] = 'application/json'
		headers['Content-Type'] = 'application/json'
		this.client = axios.create({baseURL, headers})
	}

	public get = async (path: string, params = {}) => {
		try {
			const response = await this.client.get(path, { params, paramsSerializer })
			return { success: true, data: response.data }
		} catch (error) {
			return { success: false, error: error.response.data }
		}
	}

	public post = async (path: string, body = {}, headers = {}) => {
		try {
			const response = await this.client.post(path, body, headers)
			return { success: true, data: response.data }
		} catch (error) {
			return { success: false, error: error.response.data }
		}
	}

	public put = async (path: string, body = {}, headers = {}) => {
		try {
			const response = await this.client.put(path, body, headers)
			return { success: true, data: response.data }
		} catch (error) {
			return { success: false, error: error.response.data }
		}
	}

	public patch = async (path: string, body = {}) => {
		try {
			const response = await this.client.patch(path, body)
			return { success: true, data: response.data }
		} catch (error) {
			return { success: false, error: error.response.data }
		}
	}

	public delete = async (path) => {
		try {
			const response = await this.client.delete(path)
			return { success: true, data: response.data }
		} catch (error) {
			return { success: false, error: error.response.data }
		}
	}
}

export default Api
