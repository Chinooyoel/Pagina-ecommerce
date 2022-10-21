const bcrypt = require('bcrypt');

class Encryption{

	static encrypt(password) {
		return bcrypt.hashSync(password, 10);
	}

	static isValid(password, passwordToValidate) {
		return bcrypt.compareSync(password, passwordToValidate, 10);
	}
}

exports.module = Encryption;