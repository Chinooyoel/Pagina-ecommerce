const express = require("express");
const app = express();
const fs = require("fs");
const connection = require("../mysql/mysql");

app.post("/upload/:tipo/:id", ( req, res ) => {
    if(!req.files){
        return res.status(400).json({
            ok: false,
            msj: "No se subio nada"
        });
    }
    let id = req.params.id;
    let tipo = req.params.tipo;
    let archivoImagen = req.files.imagen;
    
    if( tipo == "producto"){
        let sql = `CALL buscarProductoPorId(${ id })`;
        connection.query(sql, ( error, results ) => {
            if( error ) {
                return res.status(500).json({
                    ok: false,
                    error
                });
            }
            let productoDB = results[0][0];
            if( productoDB.length === 0 ) {
                return res.status(400).json({
                    ok: false,
                    msj: "No se encontro el producto"
                });
            }
            nombreGenerado = generarNombreImagen( productoDB.IdProducto, archivoImagen.name );
            archivoImagen.mv(`public/assets/img/producto/${ nombreGenerado }`, ( error ) => {
                if( error ) {
                    return res.status(500).json({
                        ok: false,
                        error
                    });
                }
                //si el nombre de la imagen del producto es diferente a noImagen.jpg, borramos la imagen,
                //sino, no borramos nada porque estariamos borrando la imagen "no-imagen.jpg" que seria la imagen por defecto
                if( productoDB.Img != "no-imagen.jpg"){
                    borrarArchivo(`public/assets/img/producto/${ productoDB.Img }`)
                };
                let sql = `CALL actualizarImagenProducto(${ productoDB.IdProducto }, "${ nombreGenerado }")`;
                connection.query(sql, ( error, resultadoImagen ) => {
                    if( error ){
                        borrarArchivo(`public/assets/img/producto/${ productoDB.Img }`)
                        return res.status(500).json({
                            ok: false,
                            error
                        });
                    }
                    productoDB.Img = resultadoImagen[0][0].Img;
                    return res.status(200)
                    .render("perfilProducto", {
                        productoDB
                    })
                });
            })
        })
    }
})

module.exports=app;


let borrarArchivo = ( path )=>{
    if( fs.existsSync(path) )
        fs.unlinkSync(path);
}

let generarNombreImagen = ( id, nombreArchivo ) => {
    let nombreCortado = nombreArchivo.split(".");
    let extension = nombreCortado[nombreCortado.length - 1];

    let nombreGenerado = `${ id }--${ new Date().getMilliseconds() }.${ extension }`

    return nombreGenerado
}