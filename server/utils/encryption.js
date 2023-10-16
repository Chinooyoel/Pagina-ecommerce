const bcrypt = require('bcrypt');

class Encryption {
  static encrypt (body, durationHours) {
  }

  static isValid (password, passwordToValidate) {
    return bcrypt.compareSync(password, bcrypt.hashSync(passwordToValidate, 10));
  }
}

module.exports = Encryption;
