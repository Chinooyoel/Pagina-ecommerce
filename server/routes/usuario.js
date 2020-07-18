const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const { verificarAdminRole, verificarRole } = require("../middleware/autenticacion");
const connection = require("../mysql/mysql");
const { validarFormularioUsuarios, validarEstado } = require("../middleware/validacion");



app.get("/usuario" , verificarRole, (req, res) => {
    res.render("tablaUsuarios",{
        usuario: req.usuario
    });
})



app.post("/usuario/guardar", ( req, res ) => {
    let body = req.body;
    body.telefono = Number(body.telefono);
    body.documento = Number(body.documento);

    validarFormularioUsuarios( body );
    let passwordEncriptada = bcrypt.hashSync(body.password, 10);

    let valor = [`${ body.nombre }`,`${ body.apellido }`,`${ body.email }`,`${ passwordEncriptada }`, `${ body.documento}`, `${ body.telefono }`]
    let sql = `CALL InsertarUsuario(?, ?, ?, ?, ?, ?);`;

    connection.query( sql, valor, ( error, results, fields) => {
        if( error ){
            res.status(500)
                .json({
                    ok: false,
                    msj: "Error interno",
                    error
                });
        }
        res.redirect("/");
    });

})



app.post("/usuario/actualizar/:id",verificarAdminRole, ( req, res ) => {
    let id = req.params.id;
    let body = req.body;
    body.telefono = Number(body.telefono);
    body.documento = Number(body.documento)

    validarFormularioUsuarios( body );
    validarEstado( body.estado );

    let valor = [ `${ id }`, `${ body.nombre }`,`${ body.apellido }`,`${ body.email }`, `${ body.estado }`, `${ body.nota }`, `${ body.documento}`, `${ body.telefono }`]
    let sql = `CALL actualizarUsuario( ?, ?, ?, ?, ?, ?, ?, ? )`;

    connection.query( sql, valor, (error) => {
        if ( error ) {
            return res.status(500)
                .json({
                    error
                })
        }

        res.redirect(`/usuario/perfil/${ id }`);
    })
});



app.get("/usuario/buscar/:data", verificarRole , ( req, res ) => {
    let data = req.params.data;
    let expresionRegular = data + "+";

    let sql = `CALL buscarUsuarios( ? )`;

    connection.query(sql, [`${ expresionRegular }`], ( error, results ) => {
        if( error ){
            return res.status(500)
                .json({
                    ok: false,
                    error
                })
        }
        res.json({
            usuariosDB : results[0]
        })
    })
})



app.get("/usuario/perfil/:id", verificarRole, ( req, res ) => {
    let id = req.params.id;

    let sql = `CALL buscarUsuarioPorId( ? );`;

    connection.query( sql, [ id ], ( error, results, fields ) => {
        if ( error ) {
            return res.status(500)
                .json({
                error
            })
        }
        let usuariosDB = results[0];

        if( usuariosDB.length === 0 ){
            return res.status(400)
                .json({
                    ok:false,
                    msj: "No se encontro el usuario"
                });
        }
        if( usuariosDB[0].estado == 'A'){
            usuariosDB[0].estado = "ACTIVADO"
        }else{
            usuariosDB[0].estado = "DESACTIVADO"
        }
        res.render("perfilUsuario", {
            usuarioDB : usuariosDB[0],
            usuario: req.usuario
        })
    })
})



module.exports = app;



