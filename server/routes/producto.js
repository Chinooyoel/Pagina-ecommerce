const express = require('express');
const { verificarRole, verificarAdminRole } = require('../middleware/autenticacion');
const { crearProducto, obtenerPerfilDelProductoPorId, borrarProductoPorId, actulizarProductoPorId, mostrarFormularioCrearProducto, mostrarFormularioParaActualizarProducto, mostrarTablaDeProductos, buscarProductosPorPalabras, subirImagenDelProducto, buscarProductosConFiltros } = require('../controller/productoController');
const router = express.Router();
const { validarProducto } = require('../middleware/validaciones');

// Renderiza la vista del panel de productos para el administrador
// /producto/
router.get('/', verificarRole, mostrarTablaDeProductos);

// Renderiza la vista para crear el product
// /producto/crear
router.get('/crear', verificarRole, mostrarFormularioCrearProducto);

// Renderiza la vista con el perfil del producto
// /producto/perfil/:id
router.get('/perfil/:id', obtenerPerfilDelProductoPorId);

// Renderiza la vista para actualizar el producto
// /producto/actualizar/:id
router.get('/actualizar/:id', verificarRole, mostrarFormularioParaActualizarProducto);

// devuelve los productos buscados por palabras en formato JSON
// /producto/admin/buscar/:palabra
router.get('/admin/buscar/:palabra', verificarRole, buscarProductosPorPalabras);

// Renderiza las vista con productos buscados por filtros
// /producto/buscar/palabra=:palabra/idcat=:idcat/idsub=:idsub/idmarca=:idmarca/orden=:orden/
router.get('/buscar/palabra=:palabra/idcat=:idcat/idsub=:idsub/idmarca=:idmarca/orden=:orden/', buscarProductosConFiltros);

// Borra un producto por id
// /producto/borrar/:id
router.get('/borrar/:id', verificarAdminRole, borrarProductoPorId);

// Crea un producto
// /producto/crear
router.post('/crear', [verificarAdminRole, validarProducto], crearProducto);

// Actualiza un producto
// /producto/actualizar/:id
router.post('/actualizar/:id', [verificarAdminRole, validarProducto], actulizarProductoPorId);

// Sube una imagen del producto y actualiza el producto
// /producto/upload/:id
router.post('/upload/:id', verificarAdminRole, subirImagenDelProducto);

module.exports = router;
