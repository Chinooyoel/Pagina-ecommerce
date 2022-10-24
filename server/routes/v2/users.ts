import express from 'express';

import { verificarAdminRole, verificarRole } from '../../middleware/autenticacion';
import UsersController from '../../modules/users/UsersController';
import { validarRegistrarse } from '../../middleware/validaciones';

const router = express.Router();

//Para buscar a los usuarios por el email
// /usuario/buscar/:data
router.get('/buscar/:data', verificarRole , UsersController.findUsersByEmail);

//obtener perfil del usuario, loguiado como admin
// /usuario/perfil.:id
router.get('/perfil/:id', UsersController.findUserByIdWithTheirOrders);

//registrarse
// /usuario/crear
router.post('/crear', validarRegistrarse, UsersController.createUser);

//Para que el admin pueda actualizar al usuario del cliente
// /usuario/actualizar/:id
router.post('/actualizar/:id', verificarAdminRole, UsersController.updateUser);


export default router;
