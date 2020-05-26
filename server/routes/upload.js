const express = require("express");
const app = express();
const Producto = require("../models/producto");
const fs = require("fs");

app.post("/upload/:tipo/:id", ( req, res ) => {
    console.log(req);
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

        Producto.findById(id, ( error, productoDB ) => {
            if( error ) {
                return res.status(500).json({
                    ok: false,
                    error
                });
            }
    
            if(!productoDB){
                return res.status(400).json({
                    ok: false,
                    msj: "No se encontro el producto"
                });
            }
            
            nombreGenerado = generarNombreImagen( productoDB._id, archivoImagen.name );

            archivoImagen.mv(`public/assets/img/${ nombreGenerado }`, ( error ) => {
                if( error ) {
                    return res.status(500).json({
                        ok: false,
                        error
                    });
                }
                
                if( productoDB.img != "/assets/img/noImagen.jpg"){
                    borrarArchivo(`public/assets/img/${ productoDB.img }`)
                };
                
                productoDB.img = nombreGenerado;
                productoDB.save();
                return res.status(200).json({
                    ok: true,
                    src: `/assets/img/${ productoDB.img }`
                })
            });
        })

    }

})

app.pos

module.exports=app;

let guardarImagenEnBD = ( id, nombreDelArchivo, res ) => {


}

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