const Usuarios = require("../models/Usuarios");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const Estado = require("../models/Estado");
const Pedidos = require("../models/Pedidos");
const { validationResult } = require('express-validator')

exports.verRegistrarse = ( req, res ) => {
  res.render('/')
}

exports.crearUsuario = async (req, res) => {
    //validamos los campos con express-validator
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }

  const { nombre, email, password } = req.body;

  //hasheamos la password
  const passwordEncriptada = bcrypt.hashSync(password, 10);

  try {
    //chequiamos que no exista un usuario con ese email
    const usuarioDB = await Usuarios.findOne({ where: { email }});

    if( usuarioDB ){
      return res.status(400).json({
        errores: [
         {msg: 'El email ya esta registrado'}
        ],
      });
    }

    //guardamos el usuario en la DB
    await Usuarios.create({
      nombre,
      email,
      password: passwordEncriptada,
    });

    res.json({
      ok: true
    });
    
  } catch (error) {
    console.log(error);
    if (error) {
      return res.status(500).json({
        ok: false,
        msj: "Error interno",
        error,
      });
    }
  }
};

exports.actualizarUsuario = async (req, res) => {
  const id = req.params.id;

  try {
    //chequiamos que exista el usuario
    const usuario = await Usuarios.findOne({ where: { idusuario: id } });

    if (usuario === null){
      return res.status(401).render("paginaError", {
        status: 401,
        mensaje: "El usuario no existe",
      });
    }

    await Usuarios.update(req.body, {
      where: { idusuario: id },
    });

    res.redirect(`/usuario/perfil/${id}`);
  } catch (error) {
    if (error) {
      return res.status(500).json({
        error,
      });
    }
  }
};

exports.buscarUsuariosPorEmail = async (req, res) => {
  const palabra = req.params.data;

  try {
    //buscamos los usuarios que tengan la palabra en el email
    const usuarios = await Usuarios.findAll({
      attributes: { exclude: "password" },
      where: {
        [Op.and] : [
          { email: { [Op.substring]: palabra }},
          // Para que no muestre informacion de los admin
          { rol: { [Op.ne] : "ADMIN"}}
        ]
        
      },
    });

    res.json({
      usuarios: usuarios,
    });
  } catch (error) {
    console.log(error);
    if (error) {
      return res.status(500).json({
        ok: false,
        error,
      });
    }
  }
};

exports.obtenerPerfilUsuario = async (req, res) => {
  const idUsuario = req.usuario.idusuario;
  //Si no hay usuario loguiado
  if (idUsuario === undefined) {
    console.log(idUsuario);
    return res.status(401).render("paginaError", {
      status: 401,
      mensaje: "Requiere loguiarse",
    });
  }

  //buscamos los pedidos por el id del usuario loguiado
  const pedidos = await Pedidos.findAll({
    where: { usuario_id: idUsuario },
    order: [['fecha', 'DESC']],
    include: {
      model: Estado,
    },
  });

  res.render("cuentaUsuario", {
    usuario: req.usuario,
    pedidos,
  });
};

exports.mostrarTablaDeUsuarios = (req, res) => {
  res.render("tablaUsuarios", {
    usuario: req.usuario,
  });
};

exports.obtenerPerfilUsuarioPorId = async (req, res) => {
  const idUsuario = req.params.id;

  //buscamos el usuario
  const usuario = await Usuarios.findOne({where: { idusuario: idUsuario }});

  //buscamos los pedidos por el id del usuario en la URL
  const pedidos = await Pedidos.findAll({
    where: { usuario_id: idUsuario },
    order: [['fecha', 'DESC']],
    include: {
      model: Estado,
    },
  });

  res.render("cuentaUsuario", {
    usuario,
    pedidos,
  });
}