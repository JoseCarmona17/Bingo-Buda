const bcrypt = require('bcrypt');

class User {
  constructor(username, password) {
    this.setUsername(username);
    this.setPassword(password);
  }

  setUsername(username) {
    this.username = username;
  }

  setPassword(password) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    this.password = hashedPassword;
  }

  validatePassword(password) {
    return bcrypt.compareSync(password, this.password);
  }

  toObject() {
    return {
      username: this.username,
      // Omitir la contraseña al devolver el objeto del usuario
    };
  }
}

module.exports = User;
