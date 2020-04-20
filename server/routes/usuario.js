const Usuario = require("../models/usuario");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const { verificarToken, verificarAdminRole } = require("../middleware/autenticacion");



app.get("/usuario" , (req, res) => {
    Usuario.find({}, ( error, usuariosDB ) => {
        if( error ) {
            return res.status(500).json({
                message: "error interno",
                error
            })
        }

        res.render("tablaUsuarios");
    })
})



app.post("/usuario/guardar", ( req, res ) => {
    let {nombre, apellido, telefono, documento, email, password} = req.body;
    let passwordEncriptada = bcrypt.hashSync(password, 10);

    let usuario = new Usuario({
        nombre,
        apellido,
        telefono,
        documento,
        email,
        password: passwordEncriptada
    });

    usuario.save( ( err, usuario ) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        res.render("index");
    })
})



app.post("/usuario/actualizar/:id", ( req, res ) => {
    let id = req.params.id;
    let body = req.body;
    let estado;

    if(body.estado === "activo"){
        estado = true;
    }else if(body.estado === "inactivo"){
        estado = false;
    }

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
});



app.post("/usuario/buscar/:data", ( req, res ) => {
    let data = req.params.data;
    let expresionRegular = new RegExp(data, "i");

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
})



app.get("/usuario/perfil/:id", ( req, res ) => {
    let id = req.params.id;

    Usuario.findOne({_id:id}, ( error, usuarioDB ) => {
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