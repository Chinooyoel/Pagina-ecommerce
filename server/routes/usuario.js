const express = require('express');
const router = express.Router();
const { verificarAdminRole, verificarRole, obtenerUsuarioLoguiado } = require('../middleware/autenticacion');
const { crearUsuario, actualizarUsuario, buscarUsuariosPorEmail, mostrarTablaDeUsuarios, obtenerPerfilUsuarioPorId, actualizarRolUsuario, verCrearVendedor } = require('../controller/usuarioController');
const { validarRegistrarse } = require('../middleware/validaciones');

// /usuario/
router.get('/' , verificarRole, mostrarTablaDeUsuarios);

//registra vendedor
// /usuario/
router.get('/crear-vendedor' , validarRegistrarse, verCrearVendedor);

//Para buscar a los usuarios por el email
// /usuario/buscar/:data
router.get('/buscar/:data', verificarRole , buscarUsuariosPorEmail);

//obtener perfil del usuario, loguiado como admin
// /usuario/perfil.:id
router.get('/perfil/:id', obtenerPerfilUsuarioPorId);

//registrarse
// /usuario/crear
router.post('/crear', validarRegistrarse, crearUsuario);

//Para que el admin pueda actualizar al usuario del cliente
// /usuario/actualizar/:id
router.post('/actualizar/:id', verificarAdminRole, actualizarUsuario);

//actualizar rol del usuario
// /usuario/actualizar-rol/:idusuario
router.post('/actualizar-rol/:idusuario', actualizarRolUsuario);


module.exports = router;
