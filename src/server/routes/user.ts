// import AuthenticationMiddleware from '../middleware/authentication'
// import UsersController from '../controller/UsersController'

// const express = require('express')
// const router = express.Router()
// const {
// 	verificarAdminRole,
// 	verificarRole,
// 	obtenerUsuarioLoguiado,
// } = require('../middleware/authentication')
// const {
// 	crearUsuario,
// 	actualizarUsuario,
// 	buscarUsuariosPorEmail,
// 	mostrarTablaDeUsuarios,
// 	obtenerPerfilUsuarioPorId,
// 	actualizarRolUsuario,
// 	verCrearVendedor,
// } = require('../controller/usuarioController')
// const { validarRegistrarse } = require('../middleware/validations')

// // /usuario/
// router.get('/', verificarRole, mostrarTablaDeUsuarios)

// //registra vendedor
// // /usuario/
// router.get('/crear-vendedor', validarRegistrarse, verCrearVendedor)

// //Para buscar a los usuarios por el email
// // /usuario/buscar/:data
// router.get('/buscar/:data', verificarRole, UsersController.findUsersByEmail)

// //obtener perfil del usuario, loguiado como admin
// // /usuario/perfil.:id
// router.get('/perfil/:id', UsersController.findUserByIdWithTheirOrders)

// //registrarse
// // /usuario/crear
// router.post('/create', validateRegister, UsersController.createUser)

// //Para que el admin pueda actualizar al usuario del cliente
// // /usuario/actualizar/:id
// router.post(
// 	'/update/:id',
// 	AuthenticationMiddleware.verifyAdminRole,
// 	UsersController.updateUser,
// )

// //actualizar rol del usuario
// // /usuario/actualizar-rol/:idusuario
// router.post('/actualizar-rol/:idusuario', actualizarRolUsuario)

// module.exports = router
