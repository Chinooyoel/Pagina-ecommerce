const { DataTypes } = require('sequelize');
const db = require('../mysql/mysql');
const Subcategorias = require('../models/Subcategorias');

const Categorias = db.define('categorias', {
    idcategoria: {
        type: DataTypes.TINYINT,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    }
})

//establecemos la relacion 1(categorias) a muchos(subcategorias)
Categorias.hasMany(Subcategorias, {
    foreignKey: 'categoria_id'
})


module.exports = Categorias;