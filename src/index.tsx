import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './app/store'

import './style.sass'
import AppComponent from './app/app.component'

import moment from 'moment'
moment.locale('ru')

ReactDOM.render(
	<Provider store={store}>
		<AppComponent />
	</Provider>,
	document.getElementById('root')
)
