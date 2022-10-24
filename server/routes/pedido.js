const express = require('express');
const { crearPedido, obtenerPedido, obtenerPedidosJSON, verTablaPedidos, actualizarEstadoPedido } = require('../controller/pedidoController');
const { verificarRole, verificarAdminRole } = require('../middleware/autenticacion');
const router = express.Router();

// /pedido/ver-tabla
router.get('/ver-tabla', verTablaPedidos);

// /pedido/admin
router.get('/obtener', verificarRole, obtenerPedidosJSON);

// /pedido/:id
router.get('/:id', obtenerPedido);

// /pedido/crear
router.post('/crear', crearPedido);

// /pedido/actualizar-estado
router.post('/actualizar-estado/:idpedido', verificarAdminRole, actualizarEstadoPedido);

module.exports = router;
