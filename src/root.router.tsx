import React, { FunctionComponent } from 'react'
import { createRouting, useRouter, location } from 'src/core/router'

import { HomeScreen } from 'src/views'

createRouting([
	{ name: 'home', path: '/' },
])

export const RootRouter: FunctionComponent = () => {
	const router = useRouter()
	switch (router.name.split('.')[0]) {
		case 'home':
			return <HomeScreen/>
		default:
			location.replace('/')
			return null
	}
}

RootRouter.displayName = 'RootRouter'
