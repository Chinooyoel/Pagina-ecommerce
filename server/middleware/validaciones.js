const { check } = require('express-validator');

exports.validarProducto = [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('stock', 'El stock es obligatorio').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('costo', 'El costo es obligatorio').not().isEmpty(),
    check('garantia', 'La garantia es obligatoria').not().isEmpty(),
    check('marca_id', 'La marca es obligatoria').not().isEmpty(),
    check('subcategoria_id', 'La subcategoria es obligatoria').not().isEmpty(),
    check('proveedor_id', 'El proveedor es obligatoria').not().isEmpty(),
    check('stock', 'El stock debe ser un numero').isNumeric(),
    check('costo', 'El costo debe ser un numero').isNumeric(),
    check('precio', 'El precio debe ser un numero').isNumeric(),
    check('marca_id', 'La marca debe ser un numero').isNumeric(),
    check('proveedor_id', 'El proveedor debe ser un numero').isNumeric(),
    check('subcategoria_id', 'La subcategoria debe ser un numero').isNumeric(),
    check('nombre', 'El nombre excede lo maximo de caracteres permitidos (200)').isLength({max: 200}),
    check('descripcion', 'La descripcion excede lo maximo de caracteres permitidos (1500)').isLength({max: 1500}),
    check('codigo', 'El codigo excede lo maximo de caracteres permitidos (45)').isLength({max: 45}),
    check('garantia', 'La garantia excede lo maximo de caracteres permitidos (45)').isLength({max: 45})
]

exports.validarLogin = [
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('password', 'La password es obligatoria').not().isEmpty(),
    check('email', 'El email no tiene formato de email').isEmail(),
    check('email', 'El email excede lo maximo de caracteres permitidos (50)').isLength({ max: 50}),
    check('password', 'La password excede lo maximo de caracteres permitidos (15)').isLength({ max: 15})
]

exports.validarRegistrarse = [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('password', 'La password es obligatoria').not().isEmpty(),
    check('email', 'El email no tiene formato de email').isEmail(),
    check('nombre', 'El nombre excede lo maximo de caracteres permitidos (50)').isLength({max: 50}),
    check('email', 'El email excede lo maximo de caracteres permitidos (50)').isLength({ max: 50}),
    check('password', 'La password excede lo maximo de caracteres permitidos (15)').isLength({ max: 15})
]