const Generics = require('../repository/generics');
const Users = require('../models/Usuarios');

class UsersService {

	static async  findByEmail (email) {
		return await Generics.findOne(Users, {email});
	}
}


module.export = UsersService;