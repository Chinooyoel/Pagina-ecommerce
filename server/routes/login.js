const express = require('express');
const router = express.Router();
const { login } = require('../controller/loginController');
const { validateLogin } = require('../middleware/validaciones');

//Comprueba el usuario y el password y retorna el token
// /login
router.post('/', validateLogin, login);

module.exports = router;