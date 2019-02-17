import { combineReducers } from 'redux'

// Types
enum Types {
	USER_SET = 'USER_SET',
}

// Reducers
import { UserReducer } from './user.store'

const appReducer = combineReducers({
	user: UserReducer,
})

export { appReducer, Types }