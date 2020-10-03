const express = require("express");
const pool = require("../mysql/mysql");
let app = express();

app.post("/pedido/guardar", ( req, res ) => {
    console.log(req.body)
    //pedido traido del cliente
    const pedido = req.body;
    const carrito = JSON.parse(pedido.productos);

    console.log(carrito);

    //fecha del pedido
    const fecha = obtenerFechaActual()
    //id del usuario que hace el pedido
    let idUsuario = req.usuario.IdUsuario;

    //si el usuario no esta loguiado
    if( idUsuario === undefined ){
        return res.status(401).render("paginaError",{
            mensaje: "Requiere loguiarse"
        })
    }

    //inicializamos sumadores
    let total = 0;
    let costoTotal = 0;

    //creamos el pedido
    let sql = "INSERT INTO pedido (Fecha, medios_pago_id, usuario_idusuario, estado_id) VALUES ( ? , ? , ?, ? )";
    let values = [ fecha, pedido.medio_pago, idUsuario, 3 ];

    pool.query( sql, values, ( error, result ) => {
        if( error ){
            return res.status(500).json({
                ok: false,
                error
            })
        }
        
        //recorremos los productos(carrito)
        for( let i = 0; i < carrito.length; i++ ){

            //buscamos el producto
            sql = "CALL buscarProductoPorId( ? )";
            pool.query(sql, [carrito[i].id], (error, busqueda ) => {
                if( error ){
                    return res.status(500).json({
                        ok: false,
                        error
                    })
                }
                productoDB = busqueda[0][0];
                
                //si no existe el producto o no hay stock, terminar la funcion y continue con el proximo producto
                if( productoDB === undefined || productoDB.Stock < carrito[i].cantidad){

                    //si es el ultimo producto, actualizar el pedido con el total, el costo y el iva.
                    if( i   === carrito.length -1 ){
                        actualizamosElTotalYCostoDelPedido( total, costoTotal, result.insertId );
                        res.json({
                            idPedido : result.insertId
                        })
                    }

                    return;
                }

                //actualizamos el stock del producto en la base de datos
                let stockActualizado = productoDB.Stock - carrito[i].cantidad;
                sql = "UPDATE producto SET stock = ? WHERE idproducto = ?;";
                pool.query(sql, [ stockActualizado, productoDB.IdProducto]);

                //insertamos el pedidoDetalle
                sql = "INSERT INTO pedidoDetalle(precioUnitario, costoUnitario, cantidad, producto_idProducto, Pedido_id ) VALUES ( ?, ?, ?, ?, ? );"
                values = [productoDB.Precio, productoDB.Costo, carrito[i].cantidad, productoDB.IdProducto, result.insertId ];
                pool.query( sql, values);

                //sumamos al costo total
                costoTotal += (productoDB.Costo * carrito[i].cantidad);
                //sumamos al total de todos los productos
                total += (productoDB.Precio * carrito[i].cantidad);

                //si es el ultimo producto, actualizar el pedido con el total, el costo y el iva.
                if( i   === carrito.length -1 ){
                    actualizamosElTotalYCostoDelPedido( total, costoTotal, result.insertId );
                    res.json({
                        idPedido : result.insertId
                    })
                }

            });
        }
    })
});


app.get("/pedido/:id", ( req, res ) => {
    const idPedido = req.params.id;
    const idUsuario = req.usuario.IdUsuario;

    //buscamos el pedido que cumpla con el id del pedido y tenga el mismo id del usuario loguiado
    let sql = ` SELECT id, fecha, total, usuario_idUsuario, 
                ( SELECT m.descripcion FROM medios_pago m WHERE id = medios_pago_id ) medios_pago,
                ( SELECT e.descripcion FROM estado e WHERE e.id = estado_id ) estado
                FROM pedido WHERE id = ? and usuario_idusuario = ?;`;
    pool.query( sql, [idPedido, idUsuario], ( error, results ) => {
        let pedidoDB = results[0];

        //si no encuentra ningun pedido en la DB...
        if(pedidoDB === undefined){
            return res.status(401).render("paginaError",{
                mensaje: "No existe el pedido"
            })
        }
        
        //buscamos los productos del pedido
        sql = ` SELECT prod.idproducto, prod.nombre, prod.img, ped.preciounitario, ped.cantidad 
                FROM producto prod
                JOIN pedidodetalle ped ON prod.idproducto = ped.producto_idProducto
                WHERE ped.pedido_id = ?;`

        pool.query(sql, [idPedido], ( error, productosDB ) => {

            res.render("verPedido",{
                usuario: req.usuario,
                pedidoDB,
                productosDB,
            })
        })
    })

})

module.exports = app;


let actualizamosElTotalYCostoDelPedido = ( total, costo, id ) => {
    sql = "UPDATE pedido SET total = ?, costo = ? WHERE id = ?;"
    values = [ total, costo, id ];
    pool.query( sql, values );
}

let obtenerFechaActual = () => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
