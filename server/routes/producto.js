const express = require("express");
const Producto = require("../models/producto");
const connection = require("../mysql/mysql");
let app = express();

app.get("/producto", ( req, res ) => {
    res.render("tablaProducto");
})
app.get("/product/save", ( req, res ) => {

    connection.query("SELECT * FROM marca", ( error, marcasDB ) => {
        if( error ) {
            res.status(500)
                .json({
                    ok:false,
                    error
                })
        }


        connection.query("SELECT * FROM categoria", ( error, categoriasDB ) => {
            if( error ) {
                res.status(500)
                    .json({
                        ok:false,
                        error
                    })
            }

            connection.query("SELECT * FROM subcategoria", ( error, subcategoriasDB ) => {
                if( error ) {
                    res.status(500)
                        .json({
                            ok:false,
                            error
                        })
                }

                connection.query("SELECT * FROM proveedor", (error, proveedoresDB ) => {
                    if( error ) {
                        res.status(500)
                            .json({
                                ok:false,
                                error
                            })
                    }
    
                    res.render("crearProducto", {
                        marcasDB,
                        categoriasDB,
                        subcategoriasDB,
                        proveedoresDB
                    });
                })
            })
        })
    })

    
})
app.get("/producto/admin/buscar/:dato", ( req, res ) => {
    let dato = req.params.dato;
    let expresionRegular = dato + "+";

    let sql = `CALL buscarProductos("${ expresionRegular }");`

    connection.query(sql, ( error, results ) => {
        if( error ) {
            res.status(500)
                .json({
                    ok:false,
                    error
                })
        }

        let productosDB = results[0];

        res.json({
            productosDB
        })
    })
    /*
    Producto.find({$and: [{nombre: expresionRegular}/*,{estado: true}]}, (error, productosDB) => {
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
    */
})

app.get("/producto/buscar/:dato", ( req, res ) => {
    let dato = req.params.dato;
    let expresionRegular = dato + "+";


    let sql = `CALL buscarProductos("${ expresionRegular }");`

    connection.query(sql, ( error, results ) => {
        if( error ) {
            res.status(500)
                .json({
                    ok:false,
                    error
                })
        }

        let productosDB = results[0];

        res.render("articulo", {
            productosDB
        })
    })
    /*
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
    */
})

app.get("/product/profile/:id", ( req, res ) => {
    let id = req.params.id;

    let sql = `CALL buscarProductoPorId("${ id }")`;

    connection.query( sql, ( error, results ) => {
        if( error ) {
            res.status(500)
                .json({
                    ok:false,
                    error
                })
        }

        let productoDB = results[0][0];
        res.render("perfilProducto", {
            productoDB
        })
    })
    /*
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
    */
})

app.post("/product/save", ( req, res ) => {
    let body = req.body;

    let sql = `CALL crearProducto("${ body.nombre }","${ body.descripcion }","${ body.stock }", "${ body.garantia }", ${ body.precio }, ${ body.costo },${ body.marca }, ${ body.subcategoria }, ${ body.proveedor }");`;

    connection.query( sql, ( error, results ) => {
        if( error ) {
            res.status(500)
                .json({
                    ok:false,
                    error
                })
        }

        let sql = `CALL buscarProductoPorId(${ results.insertId })`;

        connection.query( sql, ( error, results ) => {
            let productoDB = results[0][0];
            res.render("perfilProducto", {
                productoDB
            })
        })

    })
    /*
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
    */
})

app.get("/product/update/:id", ( req, res )=> {
    let id = req.params.id;

    let sql = `CALL buscarProductoPorId(${ id })`;

    connection.query(sql, ( error, results ) => {
        if( error ) {
            res.status(500)
                .json({
                    ok:false,
                    error
                })
        }
        let productoDB = results[0][0];

        connection.query("SELECT * FROM marca", ( error, marcasDB ) => {
            if( error ) {
                res.status(500)
                    .json({
                        ok:false,
                        error
                    })
            }
    
    
    
            connection.query("SELECT * FROM subcategoria", ( error, subcategoriasDB ) => {
                if( error ) {
                    res.status(500)
                        .json({
                            ok:false,
                            error
                        })
                }
    
                connection.query("SELECT * FROM proveedor", (error, proveedoresDB ) => {
                    if( error ) {
                        res.status(500)
                            .json({
                                ok:false,
                                error
                            })
                    }
    
                    /*
                    A cada registro le vamos a agregar una propiedad objetivo que va a ser booleana
                    Si es true, es porque es la marca, subcategoria y proveedor del producto
                    y las false son las otras que no tienen nada que ver con el producto
                    */
                    marcasDB = ponerTrueAlElementoIgualALaPalabra( productoDB.marca, marcasDB );
                    subcategoriasDB = ponerTrueAlElementoIgualALaPalabra( productoDB.subcategoria, subcategoriasDB );
                    proveedoresDB = ponerTrueAlElementoIgualALaPalabra( productoDB.proveedor, proveedoresDB );


                    res.render("editarProducto", {
                        productoDB,
                        marcasDB,
                        subcategoriasDB,
                        proveedoresDB,
                    });
                })
            })
        })
        
    })
    /*
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
    */

})

app.post("/product/update/:id", ( req, res ) => {
    let id = req.params.id;
    let body = req.body;


    let sql = `CALL actualizarProducto(${ id }, "${body.nombre}", "${body.descripcion}", 
                ${body.stock}, "${body.garantia}", ${body.precio}, ${body.costo}, ${body.marca}, 
                ${body.subcategoria}, ${body.proveedor});`;

    connection.query(sql, ( error, result ) =>{
        if( error ){
            return res.status(500).json({
                ok: false,
                error
            })
        }
        let sql = `CALL buscarProductoPorId(${ id })`;
        connection.query(sql, ( error, results ) => {
            if( error ){
                return res.status(500).json({
                    ok: false,
                    error
                })
            }
            console.log("llego")
            let productoDB = results[0][0];
            res.render("perfilProducto", {
                productoDB
            })
        })
    })
    /*
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
         
        if( !req.files ){
            res.redirect(`/product/profile/${ productoDB._id }`)
        }else{
            res.redirect(307, `/upload/producto/${ productoDB._id }`)
        }
        

    })
    */
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


let ponerTrueAlElementoIgualALaPalabra = ( palabra, array ) => {
    for(let i = 0; i < array.length; i++) {
        if( array[i].Nombre === palabra) {
            array[i].objetivo = true;
        }else{
            array[i].objetivo = false;
        }
    }

    return array;
}
