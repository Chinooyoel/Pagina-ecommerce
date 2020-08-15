const express = require("express");
const app = express();
const { verificarRole } = require("../middleware/autenticacion");
const pool = require("../mysql/mysql");

app.get("/", ( req, res ) => {
    let sql = "call buscarProductosMasVendidos( ? )"
    pool.query(sql, [ 4 ], ( error, resultado ) => {
        if( error ){
            return res.status(500)
                .json({
                    ok: false,
                    error
                })
        }
        res.render("index",{
            usuario: req.usuario,
            productosDB : resultado[0]
        });
    })

})
app.get("/ayuda", ( req, res ) => {

    res.render("ayuda",{
        usuario: req.usuario
    });

})
app.get("/ubicacion", ( req, res ) => {

    res.render("ubicacion",{
        usuario: req.usuario
    });

})
app.get("/articulo", ( req, res ) => {

    res.render("articulo",{
        usuario: req.usuario
    });


})
app.get("/user", ( req, res ) => {
    
    res.render("usuario",{
        usuario: req.usuario
    });
    
})
app.get("/admin", [ verificarRole ], ( req, res ) => {

    res.render("admin",{
        usuario: req.usuario
    });
})
app.get("/armar", ( req, res )=> {

    res.render("armarPc",{
        usuario: req.usuario
    });
})
app.get("/carrito", ( req, res )=> {

    res.render("carrito",{
        usuario: req.usuario
    });
})
module.exports = app;