const express = require("express");
const Producto = require("../models/producto");
let app = express();

app.get("/producto", ( req, res ) => {
    res.render("tablaProducto");
})
app.get("/product/save", ( req, res ) => {
    res.render("crearProducto");
})
app.post("/producto/buscar/:dato", ( req, res ) => {
    let dato = req.params.dato;
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

app.get("/product/profile/:id", ( req, res ) => {
    let id = req.params.id;

    Producto.findOne({ _id: id }, ( error, productoDB ) => {
        if( error ){
            res.status(500).json({
                ok: false,
                error
            })
        }

        res.render("perfilProducto", { 
            productoDB,
            precioLista: Math.round(productoDB.precio * 1.15)
         });
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
        marca: body.marca,
        garantia: body.garantia
    })

    producto.save(producto, ( error, productoDB ) => {
        if( error ) {
            return res.status(500).json({
                ok:false,
                error
            })
        }

        res.render("tablaProducto")
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

    let producto = {
        nombre: body.nombre,
        categoria: body.categoria,
        marca: body.marca,
        codigo: body.codigo,
        stock: body.stock, 
        precio: body.precio,
        descripcion: body.descripcion,
        garantia: body.garantia
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
app.get("/product/remove/:id", ( req, res ) => {
    let id = req.params.id;

    Producto.findOneAndRemove({ _id: id }, ( error, productoBorrado ) => {
        if( error ){
            res.status(500).json({
                ok: false,
                error
            })
        }

        res.redirect("/producto");
    } )
})
module.exports = app;