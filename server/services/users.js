const UsersRepository = require('../repository/users');

class UsersService {

	static async findByEmail (email) {
		return await UsersRepository.findByEmail(email);
	}
}


module.exports = UsersService;