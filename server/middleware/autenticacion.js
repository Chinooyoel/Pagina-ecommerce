const jwt = require("jsonwebtoken");
const connection = require("../mysql/mysql");

let verificarToken = ( req, res, next ) => {
    let token = req.cookies.token;

    if( !token ){
        req.usuario = { Logueado : false };
        next();
    }else{
        jwt.verify(token, process.env.semilla, ( err, decodificado ) => {
            if( err ) {
                req.usuario = { logueado: false }
                return res.status(400).json({
                    message: "Token invalido",
                })
            }
            
            req.usuario = { Email: decodificado.email, 
                            Role: decodificado.role, 
                            Logueado: true }
            next();
        })
    }
}


let verificarRole = ( req, res, next ) => {
    let role = req.usuario.Role;
    if( role != "ADMIN" && role != "TEST" ) {
        return res.status(401).render("paginaError",{
            status: 401,
            mensaje: "Requiere permisos de administrador"
        })
    }
    next();
}

let verificarAdminRole = ( req, res, next ) => {
    let role = req.usuario.Role;

    if( role != "ADMIN" ) {
        return res.status(401).render("paginaError",{
            mensaje: "Requiere permisos de administrador"
        })
    }
    next();
}

let obtenerUsuarioLoguiado = ( req, res, next ) => {

    if( req.usuario.Logueado  ){
        let sql = "CALL buscarUsuarioPorEmail( ? );"

        connection.query(sql, [req.usuario.Email], ( error, results ) => {
            if( error ){
                return res.status(500).json({
                    ok: false,
                    error
                })
            }
            
            req.usuario = results[0][0];
            req.usuario.Logueado = true;
            req.usuario.Admin = esAdminOTest( req.usuario.Role );
            next();
        })
    }else{
        req.usuario.Admin = false;
        next();
    }
}

module.exports = {
    verificarToken,
    verificarRole,
    verificarAdminRole,
    obtenerUsuarioLoguiado
}


let esAdminOTest = ( role ) => {
    if( role === "ADMIN" || role === "TEST"){
        return true;
    }
    return false;
}


