const express = require('express');
const router = express.Router();
const { loguearse } = require('../controller/loginController');
const { validarLogin } = require('../middleware/validaciones');

//Comprueba el usuario y el password y retorna el token
// /login
router.post('/', validarLogin, loguearse);

module.exports = router;