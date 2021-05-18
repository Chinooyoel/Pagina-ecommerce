const { DataTypes, Sequelize } = require('sequelize');
const db = require('../mysql/mysql');
const Productos = require('./Productos');

const PedidosDetalle = db.define('pedidosdetalle', {
    idpedidodetalle: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    preciounitario: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    cantidad: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
})

PedidosDetalle.belongsTo(Productos, {
    foreignKey: 'producto_id'
})

Productos.hasMany(PedidosDetalle, {
    foreignKey: 'producto_id'
})



module.exports = PedidosDetalle;