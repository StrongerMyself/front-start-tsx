import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './app/store'

import './style.sass'
import Root from './app/root'

import moment from 'moment'
moment.locale('ru')

ReactDOM.render(
	<Provider store={store}>
		<Root/>
	</Provider>,
	document.getElementById('root')
)
