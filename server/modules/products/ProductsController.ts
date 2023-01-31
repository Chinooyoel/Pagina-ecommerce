import { Request, Response } from 'express';

import HTTPResponseError from '../../utils/httpReponseError';
import ProductsService from './ProductsService';
import { validationResult } from 'express-validator';
import { Filters } from './ProductDTO';

export default class ProductsController {

	static async findById (req: Request, res: Response) { 
		//validamos los campos con express-validator
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// throw new HTTPResponseError(HTTP_CODE.BadRequest, errors.array().join('\n') );
			return res.status(400).json({ errores: errors.array() });
		}

		const id = Number(req.params.id);
	
		try {
			const product = await ProductsService.findById(id);

			// return res.json({data:product});
			res.render('perfilProducto', {
				producto: product,
				productosRelacionados: null,
				usuario: req.usuario,
			});
		} catch (error) {
			console.error(error);
			if( error instanceof HTTPResponseError)
				return res.status(error.code).json({message: error.message});
			if (error instanceof Error)
				return res.status(500).json({message: error.message});
		}
	}

	static async findByWord (req: Request, res: Response) {
		//validamos los campos con express-validator
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// throw new HTTPResponseError(HTTP_CODE.BadRequest, errors.array().join('\n') );
			return res.status(400).json({ errores: errors.array() });
		}

		const { word } = req.params;
	
		try{ 	
			const products = await ProductsService.findByWord(word);
			return res.json({
				productos: products,
				usuario: req.usuario,
			});
		
		} catch (error) {
			console.error(error);
			// if( error instanceof HTTPResponseError)
			// 	return res.status(error.code).json({message: error.message});
			// if (error instanceof Error)
			// 	return res.status(500).json({message: error.message});
			return res.status(500).json({
				ok: false,
				msj: 'Error interno',
				error
			});
		}
	}

	static async findWithFilters (req: Request, res: Response) {
		const { palabraFiltro, categoriaFiltro, subcategoriaFiltro, marcaFiltro, orden } = req.params;
		const filters: Filters = {palabraFiltro, categoriaFiltro, subcategoriaFiltro, marcaFiltro, orden};
		try{ 	
			const products = await ProductsService.findWithFilters(filters);
			if( req.query ){
				return res.render('articulo', {
					productos: products,
					categorias: 1,
					subcategorias: 2,
					marcas: 3,
					categoriaFiltro:1,
					subcategoriaFiltro: 1,
					palabraFiltro: 1,
					marcaFiltro: 1,
					usuario: req.usuario,
				});
			}
			return res.json({
				productos: products,
				usuario: req.usuario,
			});
		
		} catch (error) {
			console.error(error);
			// if( error instanceof HTTPResponseError)
			// 	return res.status(error.code).json({message: error.message});
			// if (error instanceof Error)
			// 	return res.status(500).json({message: error.message});
			return res.status(500).json({
				ok: false,
				msj: 'Error interno',
				error
			});
		}
	
		// try {

	
		// 	//buscamos la cantidad de productos que tiene cada marca
		// 	const marcas = await Marcas.findAll({
		// 		attributes: {
		// 			include: [
		// 				[
		// 					sequelize.fn('COUNT', sequelize.col('productos.idproducto')),
		// 					'cantidad',
		// 				],
		// 			],
		// 		},
		// 		include: [
		// 			{
		// 				model: Productos,
		// 				attributes: [],
		// 				//agregamos los filtros de marca, subcategoria y palabra
		// 				where: {...filtros, estado : 'A' },
		// 				order: ordenPrecio,
		// 				include: [
		// 					{
		// 						model: Subcategorias,
		// 						//agregamos el filtro de categoria
		// 						where: filtroCategoria,
		// 						attributes: [],
		// 					},
		// 				],
		// 			},
		// 		],
		// 		group: 'idmarca',
		// 	});
	
		// 	//buscamos la cantidad de productos que tiene cada subcategoria
		// 	const subcategorias = await Subcategorias.findAll({
		// 		attributes: {
		// 			include: [
		// 				[
		// 					sequelize.fn('COUNT', sequelize.col('productos.idproducto')),
		// 					'cantidad',
		// 				],
		// 			],
		// 		},
		// 		include: [
		// 			{
		// 				model: Productos,
		// 				attributes: [],
		// 				//agregamos los filtros de marca, subcategoria y palabra
		// 				where: {...filtros, estado : 'A' },
		// 				order: ordenPrecio,
		// 				include: [
		// 					{
		// 						model: Subcategorias,
		// 						//agregamos el filtro de categoria
		// 						where: filtroCategoria,
		// 						attributes: [],
		// 					},
		// 				],
		// 			},
		// 		],
		// 		group: 'idsubcategoria',
		// 	});
	
		// 	//buscamos la cantidad de productos que tiene cada categoria
		// 	const categorias = await Categorias.findAll({
		// 		attributes: {
		// 			include: [
		// 				[
		// 					sequelize.fn(
		// 						'COUNT',
		// 						sequelize.col('subcategorias.productos.idproducto')
		// 					),
		// 					'cantidad',
		// 				],
		// 			],
		// 		},
		// 		include: [
		// 			{
		// 				model: Subcategorias,
		// 				attributes: [],
		// 				where: filtroCategoria,
		// 				include: [
		// 					{
		// 						model: Productos,
		// 						attributes: [],
		// 						//agregamos los filtros de marca, subcategoria y palabra
		// 						where: {...filtros, estado : 'A' },
		// 						order: ordenPrecio
		// 					},
		// 				],
		// 			},
		// 		],
		// 		group: 'idcategoria',
		// 	});
	
		// 	// si no trae ningun parametro ?JSON la url devolvemos la vista 'articulo',
		// 	const JSON = req.query.JSON;
		// 	if( !JSON ){
		// 		return res.render('articulo', {
		// 			productos,
		// 			categorias,
		// 			subcategorias,
		// 			marcas,
		// 			categoriaFiltro,
		// 			subcategoriaFiltro,
		// 			palabraFiltro,
		// 			marcaFiltro,
		// 			usuario: req.usuario,
		// 		});
		// 	}
	
		// 	// caso contrario respondemos en formato JSON los productos
		// 	res.json({
		// 		productos: productos,
		// 	});
	
		// } catch (error) {
		// 	console.log(error);
		// 	if (error) {
		// 		res.status(500).json({
		// 			ok: false,
		// 			error,
		// 		});
		// 	}
		// }
	}

	static async update (req: Request, res: Response) {
		try {
			const id = Number(req.params.id);
			let product = req.body;

			product = ProductsService.update(id, product);
	
			res.redirect(`/producto/perfil/${id}`);
			// return res.json({message: 'Updated', data: userUpdated});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				error,
			});
			// if( error instanceof HTTPResponseError)
			// 	return res.status(error.code).json({message: error.message});
			// if (error instanceof Error)
			// 	return res.status(500).json({message: error.message});
		}
	}
	
	static async create (req: Request, res: Response) {
		//validamos los campos con express-validator
		const errores = validationResult(req);
		if (!errores.isEmpty()) {
			return res.status(400).json({ errores: errores.array() });
		}

		const product = req.body;

		try {
			//creamos el producto
			const producto = await ProductsService.create(product);

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
			// console.error(error);
			// if( error instanceof HTTPResponseError)
			// 	return res.status(error.code).json({message: error.message});
			// if (error instanceof Error)
			// 	return res.status(500).json({message: error.message});
		}
	}

	static async delete (req: Request, res: Response) {
		const id = Number(req.params.id);

		try {
			await ProductsService.softDelete(id);
	
			res.render('admin', {
				usuario: req.usuario,
			});
	
		} catch (error) {
			console.error(error);
			if (error) {
				res.status(500).json({
					ok: false,
					error,
				});
			}
			// if( error instanceof HTTPResponseError)
			// 	return res.status(error.code).json({message: error.message});
			// if (error instanceof Error)
			// 	return res.status(500).json({message: error.message});
		}
	}	

}