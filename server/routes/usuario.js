const Usuario = require("../models/usuario");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const { verificarToken, verificarAdminRole } = require("../middleware/autenticacion");

app.get("/usuario", verificarToken, (req, res ) => {
    let desde = req.query.desde || 0;
    let mostrar = req.query.mostrar || 10;
    desde = Number(desde);
    mostrar = Number(mostrar);

    Usuario.find({estado: true}, null, {skip: desde, limit: mostrar, runValidators: true, context: 'query' }, ( err, DB ) => {
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
                DB
           })
        })

    })
})

app.post("/usuario", [verificarToken, verificarAdminRole], ( req, res ) => {
    
    let body = req.body;

    let passwordEncriptada = bcrypt.hashSync(body.password, 10);

    let usuario = new Usuario({
        nombre : body.nombre,
        apellido : body.apellido,
        email : body.email,
        password : passwordEncriptada
    });



    usuario.save( ( err, usuario ) => {
        if (err) {
            return res.status(400).json({
                message: "Ha ocurrido un error",
                err
            })
        }

        res.json( {
            message: "Usuario creado exitosamente",
            usuarioCreado: usuario 
        });
    })
})

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

app.delete("/usuario",[verificarToken, verificarAdminRole], ( req, res ) => {
    let body = req.body;

    Usuario.update({ email: body.email }, { estado: false }, {new : true}, 
    ( err, data ) => {
        if( err ) {
            res.status(400);
            res.json({
                message: "Ha ocurrido un error al actualizar",
                err
            })
        }

        res.json({
            message:"Se ha actualizado con exito",
            usuarioEliminado: data
        })
    });
});

module.exports = app;
