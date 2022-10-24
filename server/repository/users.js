const Users = require('../models/Usuarios');

class UsersRepository {
  static async findByEmail (email) {
    return await Users.findOne({ where: { email } });
  }
}

module.exports = UsersRepository;