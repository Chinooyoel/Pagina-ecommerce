const express = require("express");
const app = express();
const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../mysql/mysql");
const usuario = require("../models/usuario");


app.post("/login", ( req, res ) => {
    let body = req.body;

    let sql = `CALL autenticacion( "${ body.email }" )`;

    connection.query( sql, ( error, results ) => {
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
            nombre: usuarioDB.nombre,
            email: usuarioDB.email,
            role: usuarioDB.role
        }, '123', { expiresIn: 60 * 60 * 24 * 30 } );
        
        res.json({
            message: "Credenciales validas",
            token
        })
    });
    /*
    Usuario.findOne({ email: body.email }, ( err , usuarioDB ) => {
        if (err) {
            return res.status(500).json({
                message: "Ha ocurrido un error",
                err
            })
        }

        if( !usuarioDB ){
            return res.status(400).json({
                message: "(Usuario) o contraseña invalidos",
            })
        }

        if( !bcrypt.compareSync(body.password, usuarioDB.password, 10) ) {
            return res.status(400).json({
                message: "Usuario o (contraseña) invalidos",
            })
        }

        let token = jwt.sign({
            usuario : {
                nombre : usuarioDB.nombre,
                email : usuarioDB.email,
                role : usuarioDB.role,
            }

        }, process.env.semillaToken, { expiresIn: 60 * 60 * 24 * 30 });

        res.json({
            message: "Credenciales validas",
            token
        })
    })
*/
})


module.exports = app;