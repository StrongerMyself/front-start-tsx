import { Types } from './_config'
import UserModel, { IUser } from '../models/user.model'

interface IState {
	user?: IUser
}

interface IAction extends IState {
	type: Types
}

const initialState: IState = {
	user: null
}

const UserReducer = (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case Types.USER_SET:
			return {
				...state,
				user: action.user
			}
		default:
			return state
	}
}

class UserAction {

	static set(user: IUser): IAction {
		return {
			type: Types.USER_SET,
			user: user ? new UserModel(user) : null
		}
	}

}

export { UserReducer }
export default UserAction