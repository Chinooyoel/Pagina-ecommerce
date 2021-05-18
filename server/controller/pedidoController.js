const Estado = require("../models/Estado");
const Pedidos = require("../models/Pedidos");
const PedidosDetalle = require("../models/PedidosDetalle");
const Productos = require("../models/Productos");

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
    //creamos el pedido
    const pedido = await Pedidos.create({
      usuario_id: idUsuario,
      //el estado con id 2 es 'PENDIENTE'
      estado_id: 2,
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

  try {
    //buscamos el pedido que cumpla con el id del pedido y tenga el mismo id del usuario loguiado
    const pedido = await Pedidos.findOne({
      where: [{ usuario_id: idUsuario }, { idpedido: idPedido }],
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
