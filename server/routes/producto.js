const express = require("express");
const Producto = require("../models/producto");
let app = express();

app.get("/producto", ( req, res ) => {
    res.render("tablaProducto");
})
app.post("/producto/buscar/:dato", ( req, res ) => {

    let dato = req.params.dato;
    console.log(dato)
    let expresionRegular = new RegExp(dato, "i")


    Producto.find({nombre: expresionRegular}, (error, productosDB) => {
        if( error ) {
            return res.status(500).json({
                ok:false,
                error
            })
        }

        res.json({
            productosDB
        })
    })
})


app.post("/product/save", ( req, res ) => {
    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        categoria: body.categoria,
        stock: body.stock,
        precio: body.precio,
        descripcion:  body.descripcion,
        codigo: body.codigo,
        marca: body.marca
    })

    producto.save(producto, ( error, productoDB ) => {
        if( error ) {
            return res.status(500).json({
                ok:false,
                error
            })
        }

        res.json({
            productoDB
        })
    })
})

app.get("/product/update/:id", ( req, res )=> {
    let id = req.params.id;

    Producto.findById(id, ( error, usuarioDB ) => {
        if( error ){
            res.status(500).json({
                ok: false,
                error
            })
        }
        res.render("editarProducto",{
            usuarioDB
        });
    })

})

app.post("/product/update/:id", ( req, res ) => {
    let id = req.params.id;
    let body = req.body;
    console.log(body.descripcion)

    let producto = {
        nombre: body.nombre,
        categoria: body.categoria,
        marca: body.marca,
        codigo: body.codigo,
        stock: body.stock, 
        precio: body.precio,
        descripcion: body.descripcion
    }

    Producto.findByIdAndUpdate(id, producto,{new: true}, ( error, usuarioDB ) => {
        if( error ){
            res.status(500).json({
                ok: false,
                error
            })
        }

        res.redirect(`/product/update/${ usuarioDB._id }`)

    })
})

module.exports = app;