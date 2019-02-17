import * as React from 'react'
import * as ReactDOM from 'react-dom'

import './style.sass'
import AppComponent from './app/app.component'

import moment from 'moment'
moment.locale('ru')

ReactDOM.render(
	<AppComponent/>,
	document.getElementById('root')
)
