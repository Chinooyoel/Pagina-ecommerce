const Usuarios = require("../models/Usuarios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { semilla } = require("../config/config");
const { validationResult } = require("express-validator");

exports.loguearse = async (req, res) => {
  //validamos los campos con express-validator
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  
  const { email, password } = req.body;

  try {
    //buscamos el usuario
    const usuario = await Usuarios.findOne({ where: { email } });

    //comprobamos que existe el usuario
    if (usuario === null) {
      return res.status(400).json({
        errores: [
          { msg: "Los datos ingresados son invalidos" }
        ]
      });
    }

    //comprobamos si el usuario esta bloqueado
    // if( usuarioDB.estado === 'I' ){
    //     return res.status(400)
    //     .json({
    //         message: "Usuario bloqueado",
    //     })
    // }

    //comparamos las password
    if (!bcrypt.compareSync(password, usuario.password, 10)) {
      return res.status(400).json({
        errores: [
          { msg: "Los datos ingresados son invalidos" }
        ]
      });
    }

    //creamos el token
    let token = jwt.sign(
      {
        email: usuario.email,
        role: usuario.rol,
      },
      semilla,
      { expiresIn: 60 * 60 * 24 * 30 }
    );

    res.json({
      message: "Credenciales validas",
      token,
    });
  } catch (error) {
    console.log(error);
  }
};
