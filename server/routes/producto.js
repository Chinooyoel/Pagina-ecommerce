const express = require("express");
const Producto = require("../models/producto");
let app = express();

app.get("/producto", ( req, res ) => {
    res.render("tablaProducto");
})
app.get("/product/save", ( req, res ) => {
    res.render("crearProducto");
})
app.get("/producto/admin/buscar/:dato", ( req, res ) => {
    let dato = req.params.dato;
    let expresionRegular = new RegExp(dato, "i")

    Producto.find({$and: [{nombre: expresionRegular}/*,{estado: true}*/]}, (error, productosDB) => {
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

app.get("/producto/buscar/:dato", ( req, res ) => {
    let dato = req.params.dato;
    let expresionRegular = new RegExp(dato, "i")

    Producto.find({ $or : [{nombre: expresionRegular},
                        {categoria: expresionRegular},
                        {marca: expresionRegular}] 
    }, (error, productosDB) => {
        if( error ) {
            return res.status(500).json({
                ok:false,
                error
            })
        }

        res.render("articulo", {
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

        Producto.find({ categoria: productoDB.categoria, _id: { $ne: productoDB._id } })
            .limit(4)
            .exec(( error, productosRelacionados ) => {
                
                res.render("perfilProducto", { 
                    productoDB,
                    productosRelacionados,
                    precioLista: Math.round(productoDB.precio * 1.15)
                 });

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

        if( !req.files ){
            res.render("perfilProducto", {
                productoDB
            })
        }else{
            res.redirect(307, `/upload/producto/${ productoDB._id }`);
        }
        
    })
})

app.get("/product/update/:id", ( req, res )=> {
    let id = req.params.id;

    Producto.findById(id, ( error, productoDB ) => {
        if( error ){
            res.status(500).json({
                ok: false,
                error
            })
        }
        res.render("editarProducto",{
            productoDB
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

    Producto.findByIdAndUpdate(id, producto,{new: true}, ( error, productoDB ) => {
        if( error ){
            res.status(500).json({
                ok: false,
                error
            })
        }

        /**
         * Si no se sube imagenes redireccionamos al perfil del producto, por que si no lo hacemos dara error en 
         * la ruta /upload/.... por que no se subio ninguna imagen
         */
        if( !req.files ){
            res.redirect(`/product/profile/${ productoDB._id }`)
        }else{
            res.redirect(307, `/upload/producto/${ productoDB._id }`)
        }


    })
})
app.get("/product/remove/:id", ( req, res ) => {
    let id = req.params.id;

    Producto.findOneAndUpdate({ _id: id },{ estado: false }, ( error, productoBorrado ) => {
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