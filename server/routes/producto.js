const express = require("express");
const pool = require("../mysql/mysql");
const { validarFormularioProductos } = require("../middleware/validacion");
const { verificarRole, verificarAdminRole } = require("../middleware/autenticacion");
let app = express();

app.get("/producto", verificarRole, ( req, res ) => {
    res.render("tablaProducto",{
        usuario: req.usuario
    });
})
app.get("/product/save", verificarRole, ( req, res ) => {
    let sql = "CALL mostrarTablasCat_Subcat_Marca_Prov();"

    pool.query(sql, ( error, tablas ) => {
        if( error ) {
            res.status(500)
                .json({
                    ok:false,
                    error
                })
        }
        res.render("crearProducto", {
            categoriasDB: tablas[0],
            subcategoriasDB: tablas[1],
            marcasDB: tablas[2],
            proveedoresDB: tablas[3],
            usuario: req.usuario
        });

    })
})

app.get("/producto/admin/buscar/:dato", verificarRole, ( req, res ) => {
    let dato = req.params.dato;
    let sql = `CALL buscarProductos( ? );`

    pool.query(sql, [ `${ dato }` ], ( error, results ) => {
        if( error ) {
            res.status(500)
                .json({
                    ok:false,
                    error
                })
        }
        let productosDB = results[0];
        res.json({
            productosDB,
            usuario: req.usuario
        })
    })
})

app.get("/producto/buscar/palabra=:palabra/idcat=:idcat/idsub=:idsub/idmarca=:idmarca/orden=:orden/", ( req, res ) => {
    let palabra = traerValorParametro( req.params.palabra );
    let idCat = traerValorParametro( Number(req.params.idcat) );
    let idSub = traerValorParametro( Number(req.params.idsub) );
    let idMarca = traerValorParametro( Number(req.params.idmarca) );
    let Orden = Number(req.params.orden);

    //let sql = `CALL buscarProductosConFiltro("${ expresionRegular }", ${ idCat }, ${ idSub }, ${ idMarca}, ${ Orden } )`;
    let valores = [  palabra, idCat, idSub, idMarca, Orden ];
    let sql = `CALL buscarProductosConFiltro( ?, ?, ?, ?, ? )`;

    pool.query( sql, valores, ( error, tablas ) => {
        if( error ) {
            res.status(500)
                .json({
                    ok:false,
                    error
                })
        }
        res.render("articulo", {
            productosDB: tablas[0],
            categoriasDB: tablas[1],
            subcategoriasDB: tablas[2],
            marcasDB: tablas[3],
            URLidCat : req.params.idcat,
            URLidSub : req.params.idsub,
            URLPalabra : req.params.palabra,
            URLMarca: req.params.idmarca,
            usuario: req.usuario
        });

    })
});

app.get("/producto/buscar/json/palabra=:palabra/idcat=:idcat/idsub=:idsub/idmarca=:idmarca/orden=:orden/", ( req, res ) => {
    let palabra = traerValorParametro( req.params.palabra );
    let idCat = traerValorParametro( Number(req.params.idcat) );
    let idSub = traerValorParametro( Number(req.params.idsub) );
    let idMarca = traerValorParametro( Number(req.params.idmarca) );
    let Orden = Number(req.params.orden);

    //let sql = `CALL buscarProductosConFiltro("${ expresionRegular }", ${ idCat }, ${ idSub }, ${ idMarca}, ${ Orden } )`;
    let valores = [  palabra, idCat, idSub, idMarca, Orden ];
    let sql = `CALL buscarProductosConFiltro( ?, ?, ?, ?, ? )`;

    pool.query( sql, valores, ( error, tablas ) => {
        if( error ) {
            res.status(500)
                .json({
                    ok:false,
                    error
                })
        }
        res.json({
            productosDB: tablas[0],
        });
    })
});

app.get("/product/profile/:id", ( req, res ) => {
    let id = req.params.id;
    let sql = `CALL buscarProductoPorId(?)`;

    pool.query( sql, [ id ], ( error, results ) => {
        if( error ) {
            res.status(500)
                .json({
                    ok:false,
                    error
                })
        }
        let productoDB = results[0][0];
        let sql = `CALL buscarProductosRelacionados( ?, ?, 4)`
        pool.query( sql, [ id, `${ productoDB.Subcategoria }` ], ( error, resultadoSubcategorias ) => {
            if( error ) {
                res.status(500)
                    .json({
                        ok:false,
                        error
                    })
            }
            let productosRelacionados = resultadoSubcategorias[0];
            res.render("perfilProducto", {
                productoDB,
                productosRelacionados,
                usuario: req.usuario
            })
        })
    })
})

app.post("/product/save", verificarAdminRole, ( req, res ) => {
    let body = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        stock: Number( req.body.stock ),
        garantia: req.body.garantia,
        codigo: req.body.codigo,
        precio: Number( req.body.precio ),
        costo: Number( req.body.costo ),
        marca: Number( req.body.marca ),
        subcategoria: Number( req.body.subcategoria ),
        proveedor: Number( req.body.proveedor )
    };

    validarFormularioProductos( body );

    let sql = `CALL crearProducto( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    let valores = [ `${ body.nombre }`, `${ body.descripcion }`, body.stock, `${ body.garantia }`, `${ body.codigo }`, 
                    body.precio, body.costo, body.marca, body.subcategoria, body.proveedor,]

    pool.query( sql, valores, ( error, results ) => {
        if( error ) {
            res.status(500)
                .json({
                    ok:false,
                    error
                })
        }
        let productoDB = results[0][0];
        if( !req.files ) {
            res.redirect(`/product/profile/${ productoDB.IdProducto }`)
        }else{
            res.redirect(307, `/upload/producto/${ productoDB.IdProducto }`)
        }

    })
})

app.get("/product/update/:id", verificarRole, ( req, res )=> {
    let id = req.params.id;
    let sql = `CALL buscarProductoPorId( ? )`;

    pool.query(sql, [ id ], ( error, results ) => {
        if( error ) {
            res.status(500)
                .json({
                    ok:false,
                    error
                })
        }
        let productoDB = results[0][0];
        let sql = "CALL mostrarTablasCat_Subcat_Marca_Prov();"
        pool.query(sql, ( error, tablas ) => {
            if( error ) {
                res.status(500)
                    .json({
                        ok:false,
                        error
                    })
            }
            let categoriasDB = tablas[0];
            let subcategoriasDB = tablas[1];
            let marcasDB = tablas[2];
            let proveedoresDB = tablas[3];
            /*
            A cada registro le vamos a agregar una propiedad objetivo que va a ser booleana
            Si es true, es porque es la marca, subcategoria y proveedor del producto
            y las false son las otras que no tienen nada que ver con el producto
            */
            marcasDB = ponerTrueAlElementoIgualALaPalabra( productoDB.Marca, marcasDB );
            categoriasDB = ponerTrueAlElementoIgualALaPalabra( productoDB.Categoria, categoriasDB );
            subcategoriasDB = ponerTrueAlElementoIgualALaPalabra( productoDB.Subcategoria, subcategoriasDB );
            proveedoresDB = ponerTrueAlElementoIgualALaPalabra( productoDB.Proveedor, proveedoresDB );
            res.render("editarProducto", {
                productoDB,
                marcasDB,
                categoriasDB,
                subcategoriasDB,
                proveedoresDB,
                usuario: req.usuario
            });
        });
    })
})

app.post("/product/update/:id", verificarAdminRole, ( req, res ) => {
    let id = req.params.id;
    let body = req.body;
    let sql = `CALL actualizarProducto(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    let valores = [ id, `${body.nombre}`, `${body.descripcion}`, body.stock, `${body.garantia}`, `${ body.codigo }`, 
                    body.precio, body.costo, body.marca, body.subcategoria, body.proveedor]

    pool.query(sql, valores,  ( error, results ) =>{
        if( error ){
            return res.status(500).json({
                ok: false,
                error
            })
        }
        let productoDB = results[0][0];
        /*
         * Si no se sube imagenes redireccionamos al perfil del producto, por que si no lo hacemos dara error en 
         * la ruta /upload/.... por que no se subio ninguna imagen
         */
        if( !req.files ) {
            res.redirect(`/product/profile/${ id }`);   
        }else{
            res.redirect(307, `/upload/producto/${ productoDB.IdProducto }`);
        }
    })
})
app.get("/product/remove/:id", verificarAdminRole, ( req, res ) => {
    let id = req.params.id;
    let sql = `CALL borrarProducto( ? )`;

    pool.query(sql, [ id ], ( error ) => {
        if( error ){
            return res.status(500).json({
                ok: false,
                error
            })
        }
        res.redirect("/producto",{
            usuario: req.usuario
        });
    })
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


function traerValorParametro( parametro ) {
    let valor = parametro;
    if( valor == -1 ){
        return valor = null;
    }else{
        return valor;
    }
}

