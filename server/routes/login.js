const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../mysql/mysql");
const { validarEmail } = require("../middleware/validacion");


app.post("/login", ( req, res ) => {
    let body = req.body;

    validarEmail( body.email, "Email" )

    let sql = `CALL autenticacion( ? )`;

    connection.query( sql, [ `${ body.email }` ], ( error, results ) => {
        if( error ){
            return res.status(500)
                .json({
                    ok: false,
                    error
                })
        }

        if( results[0].length === 0 ) {
            return res.status(400)
                .json({
                    message: "(Usuario) o contraseña invalidos",
                })
        }

        let usuarioDB = results[0][0];

        if( usuarioDB.estado === 'I' ){
            return res.status(400)
            .json({
                message: "Usuario bloqueado",
            })
        }

        if( !bcrypt.compareSync( body.password, usuarioDB.password, 10) ) {
            return res.status(400).json({
                message: "Usuario o (contraseña) invalidos",
            })
        }

        let token = jwt.sign({
            email: usuarioDB.email,
            role: usuarioDB.role
        }, process.env.semilla, { expiresIn: 60 * 60 * 24 * 30 } );
        
        res.json({
            message: "Credenciales validas",
            token
        })
    });
})


module.exports = app;