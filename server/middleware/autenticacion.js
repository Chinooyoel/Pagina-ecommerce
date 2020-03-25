const jwt = require("jsonwebtoken");


//================================
// Verificacion del Token
//================================

let verificarToken = ( req, res, next ) => {
    let token = req.get("token");


    jwt.verify(token, "semillaLocal", ( err, decodificado ) => {
        if( err ) {
            return res.status(400).json({
                message: "Token invalido",
            })
        }

        req.usuario = decodificado.usuario;
        next();
    })

}

//================================
// Verificacion de Admin Role
//================================

let verificarAdminRole = ( req, res, next ) => {
    let role = req.usuario.role;

    if( role !== "ADMIN_ROLE" ) {
        return res.status(401).json({
            message: "Requiere permisos de administrador"
        })
    }

    next();
}

module.exports = {
    verificarToken,
    verificarAdminRole
}