const { DataTypes } = require('sequelize');
const db = require('../mysql/mysql');
const Productos = require('./Productos');

const Subcategorias = db.define('subcategorias', {
  idsubcategoria: {
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

// Establecemos la relacion 1(subcategoria) a muchos(productos)
Subcategorias.hasMany(Productos, {
  foreignKey: 'subcategoria_id'
});

Productos.belongsTo(Subcategorias, {
  foreignKey: 'subcategoria_id'
});

module.exports = Subcategorias;
