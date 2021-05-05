const jwt = require("jsonwebtoken");
const { semilla } = require("../config/config");
const Usuarios = require("../models/Usuarios");

let verificarToken = (req, res, next) => {
  // obtenemos el token de las cookies
  const token = req.cookies.token;

  //si no existe token, no hay ningun usuario loguiado
  if (!token) {
    req.usuario = { Logueado: false };
    next();
  } else {
    //veriamos el token
    jwt.verify(token, semilla, (err, decodificado) => {
      if (err) {
        req.usuario = { logueado: false };
        return res.status(400).json({
          message: "Token invalido",
        });
      }

      //guardamos el email y el rol en la peticion
      req.usuario = {
        Email: decodificado.email,
        Role: decodificado.role,
        Logueado: true,
      };

      next();
    });
  }
};

let verificarRole = (req, res, next) => {
  let rol = req.usuario.rol;

  if (rol != "ADMIN" && rol != "ESPECTADOR") {

    return res.status(401).render("paginaError", {
      status: 401,
      mensaje: "Requiere permisos de administrador",
    });

  }
  next();
};

let verificarAdminRole = (req, res, next) => {
  let rol = req.usuario.rol;

  if (rol != "ADMIN") {
    return res.status(401).render("paginaError", {
      mensaje: "Requiere permisos de administrador",
    });
  }
  next();
};

let obtenerUsuarioLoguiado = async (req, res, next) => {
  if (req.usuario.Logueado) {
    try {
      //buscamos al usuario por el email
      const usuario = await Usuarios.findOne({ 
        attributes: { exclude: 'password'},
        where: { email: req.usuario.Email } });

      req.usuario = usuario;
      req.usuario.Logueado = true;
      req.usuario.Admin = esAdminOTest(req.usuario.rol);
      next();
    } catch (error) {
      if (error) {
        return res.status(500).json({
          ok: false,
          error,
        });
      }
    }
  } else {
    req.usuario.Admin = false;
    next();
  }
};

module.exports = {
  verificarToken,
  verificarRole,
  verificarAdminRole,
  obtenerUsuarioLoguiado,
};

let esAdminOTest = (rol) => {
  if (rol === "ADMIN" || rol === "ESPECTADOR") {
    return true;
  }
  return false;
};
