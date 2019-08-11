import React, { FunctionComponent, useEffect } from 'react'

import { RootRouter } from './root.router'

const loader = document.querySelector('#loader')

export const Root: FunctionComponent = () => {
	useEffect(() => {
		setTimeout(() => {
			loader['style'].opacity = '0'
			loader['style'].visibility = 'hidden'
			setTimeout(() => {
				loader.remove()
			}, 500)
		}, 500)
	}, [])
	return (
		<RootRouter/>
	)
}

Root.displayName = 'Root'
