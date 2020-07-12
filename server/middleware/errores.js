const errorMiddleware = ( error, req, res, next ) => {
    res.status(400).json({
        estado: "ERROR",
        nombre: error.name,
        mensaje: error.message,
        path: error.path
        })
}

module.exports = errorMiddleware;