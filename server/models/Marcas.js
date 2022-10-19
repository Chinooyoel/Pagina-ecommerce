const { DataTypes } = require('sequelize');
const db = require('../mysql/mysql');
const Productos = require('./Productos');

const Marcas = db.define('marcas', {
	idmarca: {
		type: DataTypes.TINYINT,
		autoIncrement: true,
		primaryKey: true
	},
	nombre: {
		type: DataTypes.STRING(50),
		allowNull: false,
		unique: true
	}
});

//establecemos la relacion 1(marcas) a muchos(productos)
Marcas.hasMany(Productos, {
	foreignKey: 'marca_id'
});

Productos.belongsTo(Marcas,{
	foreignKey: 'marca_id'
});
module.exports = Marcas;