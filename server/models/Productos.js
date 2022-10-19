const { DataTypes } = require('sequelize');
const db = require('../mysql/mysql');

const Productos = db.define('productos', {
	//definimos los atributos del modelo
	idproducto: {
		type: DataTypes.SMALLINT.UNSIGNED,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	nombre: {
		type: DataTypes.STRING(200),
		allowNull: false,
	},
	descripcion: {
		type: DataTypes.STRING(1500),
		allowNull: true,
	},
	stock: {
		type: DataTypes.TINYINT.UNSIGNED,
		allowNull: false,
	},
	garantia: {
		type: DataTypes.STRING(45),
		allowNull: false,
	},
	codigo: {
		type: DataTypes.STRING(45),
		allowNull: true,
	},
	precio: {
		type: DataTypes.DECIMAL(10, 2).UNSIGNED,
		allowNull: false,
	},
	costo: {
		type: DataTypes.DECIMAL(10, 2).UNSIGNED,
		allowNull: false,
	},
	img: {
		type: DataTypes.STRING(100),
		allowNull: false,
		//Ponemos por defecto el nombre de una imagen estandar
		defaultValue: 'no-imagen.jpg'
	},
	/*
    Describe el estado del producto: A (Activo), D (Desactivado), B (Borrado)
  */
	estado: {
		type: DataTypes.CHAR(1),
		allowNull: false,
		defaultValue: 'A'
	}
});

module.exports = Productos;
