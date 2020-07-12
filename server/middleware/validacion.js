const validator = require("validator");

function validarFormularioProductos( datos ){
    let nombre = datos.nombre;
    let descripcion = datos.descripcion;
    let stock = datos.stock;
    let garantia = datos.garantia;
    let codigo = datos.codigo;
    let precio = datos.precio;
    let costo = datos.costo;
    let marca = datos.marca;
    let subcategoria = datos.subcategoria;
    let proveedor = datos.proveedor;

    validarCampoString( nombre, 5, 200, "Nombre");
    validarDescripcion( descripcion, 0, 1500, "descripcion");
    validarCampoNumber( stock, "Stock" );
    validarCampoString( garantia, 1, 45, "Garantia");
    validarCampoString( codigo, 1, 45, "codigo");
    validarCampoNumber( precio, "precio");
    validarCampoNumber( costo, "costo");
    validarCampoNumber( marca, "marca");
    validarCampoNumber( subcategoria, "subcategoria");
    validarCampoNumber( proveedor, "proveedor");

}

function validarCampoString( string, min, max, nombreCampo ){
    if( string === undefined ){
        throw new Error(`El campo ${ nombreCampo } es undefined`)
    }
    if( validator.isEmpty( string )){
        throw new Error(`El campo ${ nombreCampo } esta vacio`)
    }

    if( !validator.isLength(string, { min, max }) ){
        throw new Error(`El campo ${ nombreCampo } debe tener como minimo ${ min } caracteres y maximo ${ max } caracteres`)
    }
}

function validarCampoNumber( datoNumerico, nombreCampo ) {
    if( isNaN( datoNumerico ) ){
        throw new Error(`El campo ${ nombreCampo } no es un numero`);
    }

}

function validarDescripcion( descripcion ) {

    if( descripcion === undefined ){
        throw new Error(`El campo ${ nombreCampo } es undefined`)
    } 
    if( !validator.isLength( descripcion, { min: 0, max : 1500 })){
        throw new Error(`El campo ${ nombreCampo } debe tener como minimo ${ min } caracteres y maximo ${ max } caracteres`)
    }
}

function validarFormularioUsuarios( datos ){
    console.log( datos)
}

module.exports = {
    validarFormularioProductos,
    validarFormularioUsuarios
}