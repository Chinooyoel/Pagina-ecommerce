const Categorias = require("../models/Categorias");
const Marcas = require("../models/Marcas");
const Productos = require("../models/Productos");
const Proveedores = require("../models/Proveedores");
const Subcategorias = require("../models/Subcategorias");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const { validationResult } = require("express-validator");
const fs = require("fs");

exports.crearProducto = async (req, res) => {
  //validamos los campos con express-validator
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const productoACrear = req.body;
  
  try {
    //creamos el producto
    const producto = await Productos.create(productoACrear);

    /*
     * Si no se sube imagenes redireccionamos al perfil del producto, por que si no lo hacemos dara error en
     * la ruta /upload/.... por que no se subio ninguna imagen
     */
    if (!req.files) {
      res.redirect(`/producto/perfil/${producto.idproducto}`);
      
    } else {
      res.redirect(307, `/producto/upload/${producto.idproducto}`);
    }
  } catch (error) {
    console.log(error);
    if (error) {
      res.status(500).json({
        ok: false,
        error,
      });
    }
  }
};

exports.obtenerPerfilDelProductoPorId = async (req, res) => {
  const id = req.params.id;

  try {
    //buscamos el producto por id
    const producto = await Productos.findOne({
      where: {
        idproducto: id,
      },
      include: [
        Marcas, 
        Proveedores, 
        {
          model: Subcategorias,
          include: [Categorias]
        }],
    });

    // chequiamos si existe el producto
    if (producto === null) {
      return res.status(401).render("paginaError", {
        status: 401,
        mensaje: "No existe el producto",
      });
    }

    //buscamos 4 productos que tengan la misma subcategoria
    const productosRelacionados = await Productos.findAll({
      where: {
        [Op.and]: {
          subcategoria_id: producto.subcategoria_id,
          //para que no aparezca el mismo del perfil
          idproducto: { [Op.ne]: id },
        },
      },
      limit: 4,
    });

    res.render("perfilProducto", {
      producto,
      productosRelacionados,
      usuario: req.usuario,
    });
  } catch (error) {
    console.log(error);
    if (error) {
      res.status(500).json({
        ok: false,
        error,
      });
    }
  }
};

exports.borrarProductoPorId = async (req, res) => {
  const id = req.params.id;

  try {
    //buscamos el producto por id
    const producto = await Productos.findOne({
      where: {
        idproducto: id,
      },
    });

    // chequiamos si existe el producto
    if (producto === null) {
      return res.status(401).render("paginaError", {
        status: 401,
        mensaje: "El producto no existe",
      });
    }

    //borramos el producto
    await Productos.destroy( { where: { idproducto: id } });

    res.render("admin", {
      usuario: req.usuario,
    });

  } catch (error) {
    console.log(error);
    if (error) {
      res.status(500).json({
        ok: false,
        error,
      });
    }
  }
};

exports.actulizarProductoPorId = async (req, res) => {
  //validamos los campos con express-validator
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const id = req.params.id;

  try {
    //buscamos el producto por id
    const producto = await Productos.findOne({
      where: {
        idproducto: id,
      },
    });

    // chequiamos si existe el producto
    if (producto === null) {
      return res.status(401).render("paginaError", {
        status: 401,
        mensaje: "No existe el producto",
      });
    }

    //actualizamos el producto
    await Productos.update(req.body, {
      where: {
        idproducto: id,
      },
    });

    /*
     * Si no se sube imagenes redireccionamos al perfil del producto, por que si no lo hacemos dara error en
     * la ruta /upload/.... por que no se subio ninguna imagen
     */
    if (!req.files) {
      res.redirect(`/producto/perfil/${id}`);
    } else {
      res.redirect(307, `/producto/upload/${producto.idproducto}`);
    }
  } catch (error) {
    console.log(error);
    if (error) {
      res.status(500).json({
        ok: false,
        error,
      });
    }
  }
};

exports.mostrarFormularioCrearProducto = async (req, res) => {
  try {
    //buscamos todas las categorias, subcategorias, marcas y
    //proveedores para ponerlas en el formulario
    const categorias = await Categorias.findAll();
    const subcategorias = await Subcategorias.findAll();
    const marcas = await Marcas.findAll();
    const proveedores = await Proveedores.findAll();

    res.render("crearProducto", {
      categorias,
      subcategorias,
      marcas,
      proveedores,
      usuario: req.usuario,
    });
  } catch (error) {
    console.log(error);
    if (error) {
      res.status(500).json({
        ok: false,
        error,
      });
    }
  }
};

exports.mostrarFormularioParaActualizarProducto = async (req, res) => {
  const id = req.params.id;

  try {
    //buscamos el producto
    const producto = await Productos.findOne({
      where: {
        idproducto: id,
      },
      include: [Subcategorias, Marcas, Proveedores],
    });

    //comprobamos si existe
    if (producto === null) {
      return res.status(401).render("paginaError", {
        status: 401,
        mensaje: "El producto no existe",
      });
    }

    //buscamos todas las categorias, subcategorias, marcas y
    //proveedores para ponerlas en el formulario
    let categorias = await Categorias.findAll();
    let subcategorias = await Subcategorias.findAll();
    let marcas = await Marcas.findAll();
    let proveedores = await Proveedores.findAll();

    /*
      Le vamos a poner true al elemento del array que sea propiedad del producto
      asi en el formulario aperecen seleccionados en el Select del html
      ejemplo: si el producto es de categoria = Placas de video,
      la categoria "placas de video" del producto va a estar marcada en el el array
      {nombre: Placas de video, objetivo: true},
      {nombre gabinetes, objetivo: false}
      {nombre monitor, objetivo: false}
    */
    marcas = ponerTrueAlElementoIgualALaPalabra(producto.marca.nombre, marcas);

    categorias = ponerTrueAlElementoIgualALaPalabra(
      //
      categorias.filter(
        (categoria) =>
          categoria.idcategoria === producto.subcategoria.categoria_id
      )[0].nombre,
      categorias
    );

    subcategorias = ponerTrueAlElementoIgualALaPalabra(
      producto.subcategoria.nombre,
      subcategorias
    );

    proveedores = ponerTrueAlElementoIgualALaPalabra(
      producto.proveedore.nombre,
      proveedores
    );

    res.render("editarProducto", {
      producto,
      marcas,
      categorias,
      subcategorias,
      proveedores,
      usuario: req.usuario,
    });
  } catch (error) {
    console.log(error);
    if (error) {
      res.status(500).json({
        ok: false,
        error,
      });
    }
  }
};

exports.mostrarTablaDeProductos = (req, res) => {
  res.render("tablaProducto", {
    usuario: req.usuario,
  });
};

exports.buscarProductosPorPalabras = async (req, res) => {
  const palabra = req.params.palabra;

  try {
    //buscamos los productos con esa palabra
    const productos = await Productos.findAll({
      where: {
        nombre: {
          [Op.substring]: palabra,
        },
      },
      include:{
        model: Subcategorias,
        attributes: ['nombre']
      }
    });

    res.json({
      productos,
      usuario: req.usuario,
    });
  } catch (error) {
    console.log(error);
    if (error) {
      res.status(500).json({
        ok: false,
        error,
      });
    }
  }
};

exports.subirImagenDelProducto = async (req, res) => {
  //comprobamos si se subio un archivo
  if (!req.files) {
    return res.status(400).json({
      ok: false,
      msj: "No se subio nada",
    });
  }

  const id = req.params.id;
  let archivoImagen;

  //Solo vamos a usar un archivo y va a ser el primero
  //del array si es que se suben muchos
  if (req.files.imagen.length > 1) {
    archivoImagen = req.files.imagen[0];
  } else {
    archivoImagen = req.files.imagen;
  }

  const extensionesValidas = ["jpg", "png", "jpeg"];
  let nombreArchivoDividido = archivoImagen.name.split(".");
  let extensionDelArchivoImagen =
    nombreArchivoDividido[nombreArchivoDividido.length - 1];

  //Comprobamos si el archivo es una imagen
  if (extensionesValidas.indexOf(extensionDelArchivoImagen) === -1) {
    throw new Error("El archivo subido no es JPG, JPEG o PNG");
  }

  const producto = await Productos.findOne({ idusuario: id });

  //comprobamos si el producto existe
  if (producto === null) {
    return res.status(401).render("paginaError", {
      status: 401,
      mensaje: "El producto no existe",
    });
  }

  //generamos un nombre
  const nombreGenerado = generarNombreImagen(
    producto.idproducto,
    extensionDelArchivoImagen
  );

  //guardamos el archivo
  archivoImagen.mv(
    `public/assets/img/producto/${nombreGenerado}`,
    async (error) => {
      if (error) {
        return res.status(500).json({
          ok: false,
          error,
        });
      }

      //si el nombre de la imagen del producto es diferente a noImagen.jpg, borramos la imagen,
      //sino, no borramos nada porque estariamos borrando la imagen "no-imagen.jpg" que seria la imagen por defecto
      if (producto.img != "no-imagen.jpg") {
        borrarArchivo(`public/assets/img/producto/${producto.img}`);
      }

      try {
        // Actualizamos la propiedad img del producto
        await Productos.update(
          { img: nombreGenerado },
          {
            where: {
              idproducto: id,
            },
          }
        );

        res.redirect(`/producto/perfil/${id}`);
      } catch (error) {
        //Si hubo un error al actualizar el producto, borramos el archivo
        //Ya que no se pudo actualizar la BD y la img va a quedar sin uso
        if (error) {
          borrarArchivo(`public/assets/img/producto/${producto.img}`);
          return res.status(500).json({
            ok: false,
            error,
          });
        }
      }
    }
  );
};

exports.buscarProductosConFiltros = async (req, res) => {
  const palabraFiltro = req.params.palabra;
  const categoriaFiltro = req.params.idcat;
  const subcategoriaFiltro = req.params.idsub;
  const marcaFiltro = req.params.idmarca;
  const orden = req.params.orden;

  // Estos van a ser las condiciones que van a ir en el where
  let filtros = {};
  let filtroCategoria = {};
  let ordenPrecio = [];

  //si el filtro es diferente de -1 quiere decir que el usuario eligio un filtro
  //por lo tanto se agrega al objeto filtros
  /*
    Ejemplo1: el usuario quiere ver los productos que sean de la marca con id 2,
    la marcaFiltro va a ser 2, marcaFiltro es diferente de -1 por lo tanto se agrega a filtros

    Ejemplo2: el usuario quiere ver los productos de todas las marcas, 
    la marcaFiltro va a ser -1, por lo tanto no se agrega nada a filtros
  */

  if (palabraFiltro != -1) {
    filtros = { nombre: { [Op.substring]: palabraFiltro } };
  }
  if (subcategoriaFiltro != -1) {
    filtros = { ...filtros, subcategoria_id: subcategoriaFiltro };
  }
  if (marcaFiltro != -1) {
    filtros = { ...filtros, marca_id: marcaFiltro };
  }
  //para filtrar adentro del model de productos
  if (categoriaFiltro != -1) {
    filtroCategoria = { categoria_id: categoriaFiltro };
  }
  if (orden != -1) {
    ordenPrecio = [["precio", orden]];
  }

  try {
    // buscamos los productos con los filtros
    const productos = await Productos.findAll({
      //agregamos los filtros de marca, subcategoria y palabra
      where: {...filtros, estado : 'A' },
      order: ordenPrecio,
      include: [
        {
          model: Subcategorias,
          //agregamos el filtro de categoria
          where: filtroCategoria,
          attributes: [],
        },
      ],
    });

    //buscamos la cantidad de productos que tiene cada marca
    const marcas = await Marcas.findAll({
      attributes: {
        include: [
          [
            sequelize.fn("COUNT", sequelize.col("productos.idproducto")),
            "cantidad",
          ],
        ],
      },
      include: [
        {
          model: Productos,
          attributes: [],
          //agregamos los filtros de marca, subcategoria y palabra
          where: {...filtros, estado : 'A' },
          order: ordenPrecio,
          include: [
            {
              model: Subcategorias,
              //agregamos el filtro de categoria
              where: filtroCategoria,
              attributes: [],
            },
          ],
        },
      ],
      group: "idmarca",
    });

    //buscamos la cantidad de productos que tiene cada subcategoria
    const subcategorias = await Subcategorias.findAll({
      attributes: {
        include: [
          [
            sequelize.fn("COUNT", sequelize.col("productos.idproducto")),
            "cantidad",
          ],
        ],
      },
      include: [
        {
          model: Productos,
          attributes: [],
          //agregamos los filtros de marca, subcategoria y palabra
          where: {...filtros, estado : 'A' },
          order: ordenPrecio,
          include: [
            {
              model: Subcategorias,
              //agregamos el filtro de categoria
              where: filtroCategoria,
              attributes: [],
            },
          ],
        },
      ],
      group: "idsubcategoria",
    });

    //buscamos la cantidad de productos que tiene cada categoria
    const categorias = await Categorias.findAll({
      attributes: {
        include: [
          [
            sequelize.fn(
              "COUNT",
              sequelize.col("subcategorias.productos.idproducto")
            ),
            "cantidad",
          ],
        ],
      },
      include: [
        {
          model: Subcategorias,
          attributes: [],
          where: filtroCategoria,
          include: [
            {
              model: Productos,
              attributes: [],
              //agregamos los filtros de marca, subcategoria y palabra
              where: {...filtros, estado : 'A' },
              order: ordenPrecio
            },
          ],
        },
      ],
      group: "idcategoria",
    });

    // si no trae ningun parametro ?JSON la url devolvemos la vista 'articulo',
    const JSON = req.query.JSON;
    if( !JSON ){
      return res.render("articulo", {
        productos,
        categorias,
        subcategorias,
        marcas,
        categoriaFiltro,
        subcategoriaFiltro,
        palabraFiltro,
        marcaFiltro,
        usuario: req.usuario,
      });
    }

    // caso contrario respondemos en formato JSON los productos
    res.json({
      productos: productos,
    });

  } catch (error) {
    console.log(error);
    if (error) {
      res.status(500).json({
        ok: false,
        error,
      });
    }
  }
};


const ponerTrueAlElementoIgualALaPalabra = (palabra, array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].nombre === palabra) {
      array[i].objetivo = true;
    } else {
      array[i].objetivo = false;
    }
  }
  return array;
};

const borrarArchivo = (path) => {
  if (fs.existsSync(path)) fs.unlinkSync(path);
};

const generarNombreImagen = (id, extensionDelArchivo) => {
  const nombreGenerado = `${id}--${new Date().getMilliseconds()}.${extensionDelArchivo}`;

  return nombreGenerado;
};