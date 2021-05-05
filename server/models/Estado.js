const db = require('../mysql/mysql');
const {DataTypes} = require('sequelize');

const Estado = db.define('estado', {
    idestado: {
        type: DataTypes.TINYINT,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    }
})

module.exports = Estado;