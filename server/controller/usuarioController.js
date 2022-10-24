const Usuarios = require('../models/Usuarios');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const Estado = require('../models/Estado');
const Pedidos = require('../models/Pedidos');
const { validationResult } = require('express-validator');

exports.verRegistrarse = (req, res) => {
  res.render('/');
};

exports.verCrearVendedor = (req, res) => {
  res.render('crearVendedor');
};
exports.crearUsuario = async (req, res) => {
  // validamos los campos con express-validator
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  // El rol de forma predeterminada va a ser un usuario
  let rol = 'USUARIO';

  // si el admin esta loguiado, quiere decir que no se esta registrando un usuario comun
  // sino que el admin esta registrando un vendedor
  if (req.usuario.Admin) {
    rol = 'ESPECTADOR';
  }

  const { nombre, email, password } = req.body;

  // hasheamos la password
  const passwordEncriptada = bcrypt.hashSync(password, 10);

  try {
    // chequiamos que no exista un usuario con ese email
    const usuarioDB = await Usuarios.findOne({ where: { email } });

    if (usuarioDB) {
      return res.status(400).json({
        errores: [
          { msg: 'El email ya esta registrado' }
        ]
      });
    }

    // guardamos el usuario en la DB
    await Usuarios.create({
      nombre,
      email,
      password: passwordEncriptada,
      rol
    });

    res.json({
      ok: true
    });
  } catch (error) {
    console.log(error);
    if (error) {
      return res.status(500).json({
        ok: false,
        msj: 'Error interno',
        error
      });
    }
  }
};

exports.actualizarUsuario = async (req, res) => {
  const id = req.params.id;

  try {
    // chequiamos que exista el usuario
    const usuario = await Usuarios.findOne({ where: { idusuario: id } });

    if (usuario === null) {
      return res.status(401).render('paginaError', {
        status: 401,
        mensaje: 'El usuario no existe'
      });
    }

    await Usuarios.update(req.body, {
      where: { idusuario: id }
    });

    res.redirect(`/usuario/perfil/${id}`);
  } catch (error) {
    if (error) {
      return res.status(500).json({
        error
      });
    }
  }
};

exports.actualizarRolUsuario = async (req, res) => {
  const idUsuarioActualizar = req.params.idusuario;
  const { rol } = req.body;

  // si el rol es invalido
  if (['ESPECTADOR', 'USUARIO'].indexOf(rol) === -1) {
    return res.status(401).render('paginaError', {
      status: 401,
      mensaje: 'El rol es invalido'
    });
  }

  try {
    // actualizamos el rol del usuario
    await Usuarios.update({ rol },
      { where: { idusuario: idUsuarioActualizar } });

    res.json({
      rolActualizado: rol
    });
  } catch (error) {
    console.log(error);
  }
};

exports.buscarUsuariosPorEmail = async (req, res) => {
  const palabra = req.params.data;

  try {
    // buscamos los usuarios que tengan la palabra en el email
    const usuarios = await Usuarios.findAll({
      attributes: { exclude: 'password' },
      where: {
        [Op.and]: [
          { email: { [Op.substring]: palabra } },
          // Para que no muestre informacion de los admin
          { rol: { [Op.ne]: 'ADMIN' } }
        ]

      }
    });

    res.json({
      usuarios
    });
  } catch (error) {
    console.log(error);
    if (error) {
      return res.status(500).json({
        ok: false,
        error
      });
    }
  }
};

exports.mostrarTablaDeUsuarios = (req, res) => {
  res.render('tablaUsuarios', {
    usuario: req.usuario
  });
};

exports.obtenerPerfilUsuarioPorId = async (req, res) => {
  const idUsuarioURL = req.params.id;
  const idUsuarioLoguiado = req.usuario.idusuario;

  // Si no hay usuario loguiado
  if (idUsuarioLoguiado === undefined) {
    return res.status(401).render('paginaError', {
      status: 401,
      mensaje: 'Requiere loguiarse'
    });
  }

  // si el usuario que esta loguiado no es el admin y tampoco coincide el id del usuario loguiado con el que quiere buscar
  // no va a tener permiso para ver el perfil
  if (!req.usuario.Admin && idUsuarioLoguiado != idUsuarioURL) {
    return res.status(401).render('paginaError', {
      status: 401,
      mensaje: 'No tienes permisos para ver este usuario'
    });
  }

  const usuarioPerfil = await Usuarios.findOne({
    where: { idusuario: idUsuarioURL },
    attributes: ['idusuario', 'nombre', 'email', 'rol']
  });

  // si el admin busca un usuario q no existe, lanzamos error
  if (!usuarioPerfil) {
    return res.status(401).render('paginaError', {
      status: 401,
      mensaje: 'No existe el usuario'
    });
  }

  // buscamos los pedidos por el id del usuario en la URL
  const pedidos = await Pedidos.findAll({
    where: { usuario_id: idUsuarioURL },
    order: [['fecha', 'DESC']],
    include: {
      model: Estado
    }
  });

  res.render('cuentaUsuario', {
    usuario: req.usuario,
    usuarioPerfil,
    pedidos
  });
};
