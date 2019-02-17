class UserModel implements IUser {

	name = '-'
	role = RoleList.client

	constructor(data?: IUser) {
		if (data) {
			Object.assign(this, data)
		}
	}
}

interface IUser {
	name: string
	role: RoleList
}

enum RoleList {
	admin = 'admin',
	client = 'client',
}

export { IUser, RoleList }
export default UserModel