const { Op } = require("sequelize");
const Estado = require("../models/Estado");
const Pedidos = require("../models/Pedidos");
const PedidosDetalle = require("../models/PedidosDetalle");
const Productos = require("../models/Productos");

exports.verTablaPedidos = (req, res) => {
  res.render('tablaPedido',{
    usuario: req.usuario
  });
}

exports.crearPedido = async (req, res) => {
  const carrito = JSON.parse(req.body.productos);

  //id del usuario que hace el pedido
  let idUsuario = req.usuario.idusuario;

  //si el usuario no esta loguiado
  if (idUsuario === undefined) {
    return res.status(401).render("paginaError", {
      status: 401,
      mensaje: "Requiere loguiarse",
    });
  }

  //inicializamos sumadores
  let total = 0;

  try {
    //buscamos el id del estado "INGRESO DE PEDIDO"
    const estado = await Estado.findOne({
      where: { nombre: 
        {[Op.substring] : 'INGRESO DEL PEDIDO'}}
    })

    //creamos el pedido
    const pedido = await Pedidos.create({
      usuario_id: idUsuario,
      estado_id: estado.idestado,
    });

    //recorremos los productos
    carrito.forEach(async (producto, index) => {

      //buscamos el producto del carrito en la base de datos por id
      const productoDB = await Productos.findOne({
        where: { idproducto: producto.id }
      });

      //si no existe el producto o no hay stock, terminar la funcion y continue con el proximo producto
      if (productoDB === null || productoDB.stock < producto.cantidad) {
        //si es el ultimo producto, actualizar el pedido con el total, el costo y el iva.
        if (index === carrito.length - 1) {
          pedido.total = total;
          pedido.save();

          res.json({
            idPedido: pedido.idpedido,
          });
        }

        return;
      }

      //actualizamos el stock del producto en la base de datos
      const stockActualizado = productoDB.stock - producto.cantidad;
      await Productos.update(
        { stock: stockActualizado },
        {
          where: {
            idproducto: producto.id,
          },
        }
      );

      //creamos el pedidoDetalle
      await PedidosDetalle.create({
        pedido_id: pedido.idpedido,
        preciounitario: productoDB.precio,
        cantidad: producto.cantidad,
        producto_id: producto.id,
      });

      //sumamos al total de todos los productos
      total += productoDB.precio * producto.cantidad;

      //si es el ultimo producto, actualizar el pedido con el total
      if (index === carrito.length - 1) {
        pedido.total = total;
        pedido.save({});

        res.json({
          idPedido: pedido.idpedido,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.obtenerPedido = async (req, res) => {
  const idPedido = req.params.id;
  const idUsuario = req.usuario.idusuario;

  let filtro = [{idpedido: idPedido}]

  //si no hay usuario loguiado
  if (idUsuario === undefined) {
    return res.status(401).render("paginaError", {
      status: 401,
      mensaje: "Requiere loguiarse",
    });
  }

  // El pedido lo va a poder ver el admin o el usuario que hizo el pedido
  // Si no es el admin, entonces el pedido debe coincidir con el usuario loguiado
  if( !req.usuario.Admin ){
    filtro = [...filtro, { usuario_id : idUsuario}];
  }


  try {
    const pedido = await Pedidos.findOne({
      where: filtro,
      include: {
        model: Estado,
      },
    });

    //Comprobamos que exista el pedido
    if (pedido === null) {
      return res.status(401).render("paginaError", {
        status: 401,
        mensaje: "No existe el pedido",
      });
    }

    //buscamos los productos del pedido
    const productos = await PedidosDetalle.findAll({
      where: { pedido_id: idPedido },
      include: {
        model: Productos,
        attributes: ["idproducto", "nombre", "img"],
      },
    });

    res.render("verPedido", {
      usuario: req.usuario,
      pedido,
      productos
    });

  } catch (error) {
    console.log(error);
  }
};

exports.obtenerPedidosJSON = async (req, res) => {
  const id = req.query.id;
  const estado = req.query.estado;

  let filtroIdPedido = {};
  let filtroEstado = {};

  //si existe el id, creamos el filtro
  if( id ) {
    filtroIdPedido = { idpedido: id }
  }

  //si existe el filtro por estado, lo agregamos
  if( estado != '') {
    filtroEstado = { 
      nombre: {
        [ Op.substring ] : estado
      }
    }
  }

  try {
    const pedidos = await Pedidos.findAll({
      where: filtroIdPedido,
      order: [['fecha', 'DESC']],
      attributes: ['idpedido', 'fecha', 'total'],
      include: [
        {
          model: Estado,
          attributes: ['nombre'],
          where: filtroEstado
        },
      ],
    });

    res.json({ 
      pedidos
    })
    
  } catch (error) {
    console.log(error)
  }
}

exports.actualizarEstadoPedido = async (req, res) => {
  const idpedido = req.params.idpedido;
  const { estado }= req.body;
  console.log(estado)

  try {
    //buscamos el estado
    const estadoDB = await Estado.findOne({
      where: { 
        nombre: {
          [ Op.substring ] : estado
        } }
    })

    //actualizamos el pedido con el id del estado buscado
    await Pedidos.update({ estado_id : estadoDB.idestado }, 
      {where: { idpedido } })

    res.json({
      estadoActualizado: estado
    })

  } catch (error) {
    console.log(error)
  }

}