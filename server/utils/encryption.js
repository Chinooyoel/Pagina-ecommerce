const bcrypt = require('bcrypt');

class Encryption {
  static encrypt (body, durationHours) {
  }

  static isValid (password, passwordToValidate) {
    return bcrypt.compareSync(password, passwordToValidate, 10);
  }
}

exports.module = Encryption;
