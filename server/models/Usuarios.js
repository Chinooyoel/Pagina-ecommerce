const { DataTypes } = require('sequelize');
const db = require('../mysql/mysql');

const Usuarios = db.define('usuarios', {
  idusuario: {
    type: DataTypes.MEDIUMINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  rol: {
    type: DataTypes.ENUM,
    values: ['USUARIO', 'ADMIN', 'ESPECTADOR'],
    defaultValue: 'USUARIO'
  },
  estado: {
    type: DataTypes.CHAR(1),
    defaultValue: 'A'
  }

});

module.exports = Usuarios;
