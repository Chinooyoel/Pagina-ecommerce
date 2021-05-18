const express = require("express");
const { crearPedido, obtenerPedido } = require("../controller/pedidoController");
let router = express.Router();

// /pedido/crear
router.post('/crear', crearPedido)

// /pedido/:id
router.get('/:id', obtenerPedido);

module.exports = router;
