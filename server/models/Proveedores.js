const { DataTypes } = require('sequelize');
const db = require('../mysql/mysql');
const Productos = require('../models/Productos');

const Proveedores = db.define('proveedores', {
	idproveedor: {
		type: DataTypes.TINYINT,
		autoIncrement: true,
		primaryKey: true
	},
	nombre: {
		type: DataTypes.STRING(50),
		unique: true,
		allowNull: false
	}
});

//Establecemos la relacion 1(proveedor) a muchos(productos)
Proveedores.hasMany(Productos, {
	foreignKey: 'proveedor_id'
});

Productos.belongsTo(Proveedores, {
	foreignKey: 'proveedor_id'
});
module.exports = Proveedores;