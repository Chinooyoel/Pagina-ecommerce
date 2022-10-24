import express from 'express';

import AuthController from '../../modules/auth/authController';
import { validarLogin } from '../../middleware/validaciones';

const router = express.Router();

//Comprueba el usuario y el password y retorna el token
// /login
router.post('/', validarLogin, AuthController.login);

export default router;