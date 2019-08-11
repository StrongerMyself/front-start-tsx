import { useState, useEffect, useRef } from 'react'
import { Store, Event } from 'effector'
import { config } from '../config'

export const gqlQuery = async (query: string, path = '') => {
	let res = await fetch(`${config.host}${path}`, {
		method: 'POST',
		body: JSON.stringify({ query }),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
	return res.json()
}

export function useGqlData<Data, Arg = any>(
	initialData: Data,
	getGqlStr = (arg: Arg) => '',
	parseRes = (res: any) => res.data.data,
	initialArg?,
	path = '/graphql',
) {
	const [data, setData] = useState<Data>(initialData)
	const [loading, setLoading] = useState(false)
	const [arg, setArg] = useState(initialArg)
	const ref = useRef(null)

	useEffect(() => () => clearTimeout(ref.current), [])
	useEffect(() => onRequest(), [arg])

	const request = async (
		_getGqlStr = getGqlStr,
		_parseRes = parseRes,
		_arg = arg,
	) => {
		if (loading === false) {
			setLoading(true)
			const query = _getGqlStr(_arg)
			const res = await gqlQuery(query, path)
			const resData = _parseRes(res)
			setData(resData)
			setLoading(false)
		}
	}

	const onRequest = () => {
		clearTimeout(ref.current)
		ref.current = setTimeout(() => {
			request()
		})
	}

	return { data, setData, loading, setLoading, arg, setArg, request, onRequest }
}
