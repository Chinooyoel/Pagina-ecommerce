const { DataTypes, Sequelize } = require('sequelize');
const db = require('../mysql/mysql');
const Estado = require('./Estado');
const PedidosDetalle = require('./PedidosDetalle');
const Usuarios = require('./Usuarios')

const Pedidos = db.define('pedidos', {
    idpedido: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    total: {
        type: DataTypes.DECIMAL(10,2),
        defaultValue: 0
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
})

Pedidos.hasMany(PedidosDetalle, {
    foreignKey: 'pedido_id'
})

PedidosDetalle.belongsTo(Pedidos, {
    foreignKey: 'pedido_id'
})

Estado.hasMany(Pedidos, {
    foreignKey: 'estado_id'
})

Pedidos.belongsTo(Estado, {
    foreignKey: 'estado_id'
})

Usuarios.hasMany(Pedidos, {
    foreignKey: 'usuario_id'
})
Pedidos.belongsTo(Usuarios, {
    foreignKey: 'usuario_id'
})

module.exports = Pedidos;