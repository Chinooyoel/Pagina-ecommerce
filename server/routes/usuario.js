const express = require("express");
const router = express.Router();
const { verificarAdminRole, verificarRole } = require("../middleware/autenticacion");
const { crearUsuario, actualizarUsuario, buscarUsuariosPorEmail, obtenerPerfilUsuario, mostrarTablaDeUsuarios } = require("../controller/usuarioController");

// /usuario/
router.get("/" , verificarRole, mostrarTablaDeUsuarios)

//registrarse
// /usuario/crear
router.post('/crear', crearUsuario);

//Para que el admin pueda actualizar al usuario del cliente
// /usuario/actualizar/:id
router.post('/actualizar/:id', verificarAdminRole, actualizarUsuario)

//Para buscar a los usuarios por el email
// /usuario/buscar/:data
router.get("/buscar/:data", verificarRole , buscarUsuariosPorEmail)

//obtener perfil del usuario
// /usuario/perfil
router.get("/perfil", obtenerPerfilUsuario)


module.exports = router;
