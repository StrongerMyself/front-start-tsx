import axios, { AxiosInstance } from 'axios'
import config from './config'

class Api {

	client: AxiosInstance

	constructor(baseURL: string = config.api_url, headers: any = {}) {
		headers['Accept'] = 'application/json'
		headers['Content-Type'] = 'application/json'
		this.client = axios.create({baseURL, headers})
	}

	public get = async (path: string, params = {}) => {
		return await this.client.get(path, {params})
	}

	public post = async (path: string, body = {}) => {
		return await this.client.post(path, body)
	}

	public put = async (path: string, body = {}) => {
		return await this.client.put(path, body)
	}

	public patch = async (path: string, body = {}) => {
		return await this.client.patch(path, body)
	}

	public delete = async (path) => {
		return await this.client.delete(path)
	}
}

export default Api
