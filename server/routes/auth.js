const express = require('express');
const router = express.Router();
const AuthController = require('../modules/auth/authController');
const { validateLogin } = require('../middleware/validaciones');

//Comprueba el usuario y el password y retorna el token
// /auth/login
router.post('/login', validateLogin, AuthController.login);

module.exports = router;