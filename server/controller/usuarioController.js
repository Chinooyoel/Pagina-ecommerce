const Usuarios = require("../models/Usuarios");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const Estado = require("../models/Estado");
const Pedidos = require("../models/Pedidos");

exports.crearUsuario = async (req, res) => {
  const { nombre, email, password } = req.body;

  //hasheamos la password
  const passwordEncriptada = bcrypt.hashSync(password, 10);

  try {
    //guardamos el usuario en la DB
    await Usuarios.create({
      nombre,
      email,
      password: passwordEncriptada,
    });

    res.redirect("/");
  } catch (error) {
    console.log(error);
    if (error) {
      res.status(500).json({
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
        email: { [Op.substring]: palabra },
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
  let idUsuario = req.usuario.idusuario;
  //Si no hay usuario loguiado
  if (idUsuario === undefined) {
    console.log(idUsuario);
    return res.status(401).render("paginaError", {
      mensaje: "Requiere loguiarse",
    });
  }

  //buscamos los pedidos por el id del usuario loguiado
  const pedidos = await Pedidos.findAll({
    where: { usuario_id: idUsuario },
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
