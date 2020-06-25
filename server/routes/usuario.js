const Usuario = require("../models/usuario");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const { verificarToken, verificarAdminRole } = require("../middleware/autenticacion");
const connection = require("../mysql/mysql");



app.get("/usuario" , (req, res) => {
    res.render("tablaUsuarios");
    /*
    Usuario.find({}, ( error, usuariosDB ) => {
        if( error ) {
            return res.status(500).json({
                message: "error interno",
                error
            })
        }

        res.render("tablaUsuarios");
    })
    */
})



app.post("/usuario/guardar", ( req, res ) => {
    let {nombre, apellido, email, password} = req.body;
    let passwordEncriptada = bcrypt.hashSync(password, 10);

    let query = `CALL InsertarUsuario("${ nombre }", "${ apellido }", "${ email }", "${ passwordEncriptada }");`;

    connection.query( query, ( error, results, fields) => {
        if( error ){
            res.status(500)
                .json({
                    ok: false,
                    msj: "Error interno"
                });
        }
        console.log(results);
        console.log(fields);
    });

})



app.post("/usuario/actualizar/:id", ( req, res ) => {
    let id = req.params.id;
    let body = req.body;
    let estado;

    if(body.estado === "activo"){
        estado = 'A';
    }else if(body.estado === "inactivo"){
        estado = 'I';
    }

    let sql = `CALL actualizarUsuario( ${ id }, '${ body.nombre }', '${ body.apellido }', '${ body.email }', '${ estado }', '${ body.nota }')`;

    connection.query( sql, (error) => {
        if ( error ) {
            return res.status(500)
                .json({
                    error
                })
        }

        let sql = `CALL buscarUsuarioPorId( ${ id })`; 
        connection.query( sql, ( error, results ) => {
            res.render("perfilUsuario", {
                usuarioDB : results[0][0]
            });
        })
    })
});
    /*
    
    Usuario.findOneAndUpdate({_id : id}, { estado: estado, nota: body.nota}, { new: true }, ( error, usuarioDB ) => {
        if ( error ) {
            res.status(500);
            res.json({
                error
            })
        }

        res.render("perfilUsuario", {
            usuarioDB
        })     
    })
    */




app.get("/usuario/buscar/:data", ( req, res ) => {
    let data = req.params.data;
    let expresionRegular = data + "+";

    let sql = `CALL buscarUsuarios("${ expresionRegular }")`;

    connection.query(sql, ( error, results ) => {
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
    /*
    Usuario.find({nombre: expresionRegular}, ( error, usuariosDB) => {
        if ( error ) {
            return res.status(500)
                .json({
                error
            })
        }

        res.json({
            usuariosDB
        });
    })
    */

    
})



app.get("/usuario/perfil/:id", ( req, res ) => {
    let id = req.params.id;

    let sql = `CALL buscarUsuarioPorId( ${ id } );`;

    connection.query( sql, ( error, results, fields ) => {
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
        
        res.render("perfilUsuario", {
            usuarioDB : usuariosDB[0]
        })
    })
})



module.exports = app;























/*
app.get("/usuario", verificarToken, (req, res ) => {
    let desde = req.query.desde || 0;
    let mostrar = req.query.mostrar || 10;
    desde = Number(desde);
    mostrar = Number(mostrar);

    Usuario.find({estado: true}, null, {skip: desde, limit: mostrar, runValidators: true, context: 'query' }, ( err, usuariosDB ) => {
        if (err) {
            res.status(400).json({
                message: "Ha ocurrido un error",
                err
            })
        }
        
        for(let i = 0; DB.length > i; i++ ){
            DB[i].password = "-";
        }

        Usuario.count({estado:true }, ( err, contador) => {
            res.json( {
                documentos: contador,
                usuariosDB
           })
        })

    })
})
*/

/*
app.post("/usuario/borrar/:id",[verificarToken, verificarAdminRole], ( req, res ) => {
    let id = req.params.id;

    Usuario.updateOne({ _id: id }, { estado: false }, ( errpr, data ) => {
        if( error ) {
            res.status(400);
            res.json({
                message: "Ha ocurrido un error al eliminarlo",
                err
            })
        }

        res.render("/admin/usuario");
    })
});
*/

/*
app.put("/usuario", [verificarToken, verificarAdminRole], ( req, res ) => {
    let body = req.body;

    if( body.password ) {
        body.password = bcrypt.hashSync(body.password, 10);
    }
    Usuario.update({email: body.email }, body, { new: true }, ( err, data ) => {
        if ( err ) {
            res.status(400);
            res.json({
                message: "Ha ocurrido un error al actualizar",
                err
            })
        }
        res.json({
            message:"Se ha actualizado con exito",
            usuarioActualizado: data
        })
    })
})

*/