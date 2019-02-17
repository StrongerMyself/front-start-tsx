import * as React from 'react'
import { Router as BaseRouter, Redirect, Switch, Route } from 'react-router-dom'
import { history } from './core/history'

import Layoutpage from './components/layout/page/layout.page'
import HomeScreen from './screens/home.screen'

interface Props {}

interface State {}

class Root extends React.Component<Props, State> {
	render() {
		return (
			<BaseRouter history={history}>
				<Layoutpage>
					<Switch>
						<Route exact path="/" component={HomeScreen}/>
						<Route path="*">
							<Redirect to="/"/>
						</Route>
					</Switch>
				</Layoutpage>
			</BaseRouter>
		)
	}
}

export default Root