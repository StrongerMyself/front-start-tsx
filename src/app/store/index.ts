import { createStore } from 'redux'
import { appReducer } from './_config'

const store = createStore(appReducer)

export default store