import { Request, Response } from 'express'
import ProductsService from '../services/ProductsService'
import { validationResult } from 'express-validator'
import { Filters } from '../@types'
import BrandService from '../services/BrandService'
import SubcategoriesService from '../services/SubcategoriesService'
import CategoriesService from '../services/CategoriesService'
import SuppliersService from '../services/SuppliersService'
import { NotFound } from '../utils/errors'

export default class ProductsController {
	static async showViewProductDetail(req: Request, res: Response) {
		try {
			const product = await ProductsService.findOneById(Number(req.params.id))
			const relatedProducts = await ProductsService.findRelatedProducts({
				id: product.productId,
				subcategoryId: product.subcategoryId ?? 1,
				limit: 4,
			})
			res.render('productDetail', {
				product,
				relatedProducts,
				user: req.user,
			})
		} catch (error) {
			if (error instanceof NotFound) {
				return res.status(404).render('errorPage', {
					status: 404,
					message: error.message,
				})
			}
			return res.status(500).render('errorPage', {
				status: 500,
				message: 'Internal Error',
			})
		}
	}
	static async showViewProductsTable(req: Request, res: Response) {
		res.render('productsTable', {
			user: req.user,
		})
	}
	static async showViewcreate(req: Request, res: Response) {
		try {
			const brands = await BrandService.findAll()

			console.log(
				'\n -----------------------------------------------------------------\n',
			)
			console.log('\n ~ ProductsController ~ showViewcreate ~ brands:', brands)
			console.log(
				'\n -----------------------------------------------------------------\n',
			)

			const subcategories = await SubcategoriesService.findAll()

			console.log(
				'\n -------------------------------------------------------------------------------\n',
			)
			console.log(
				'\n ~ ProductsController ~ showViewcreate ~ subcategories:',
				subcategories,
			)
			console.log(
				'\n -------------------------------------------------------------------------------\n',
			)

			const categories = await CategoriesService.findAll()
			const suppliers = await SuppliersService.findAll()
			res.render('create', {
				brands,
				subcategories,
				categories,
				suppliers,
				user: req.user,
			})
		} catch (error) {
			console.error(error)
			return res.status(500).render('errorPage', {
				status: 500,
				message: 'Internal Error',
			})
		}
	}

	static async showViewEditProduct(req: Request, res: Response) {
		try {
			const product = await ProductsService.findOneById(Number(req.params.id))
			const brands = await BrandService.findAll()
			const subcategories = await SubcategoriesService.findAll()
			const categories = await CategoriesService.findAll()
			const suppliers = await SuppliersService.findAll()
			//Todo put mark in choosed filters
			res.render('editProduct', {
				product,
				brands,
				subcategories,
				categories,
				suppliers,
				user: req.user,
			})
		} catch (error) {
			console.error(error)
			if (error instanceof NotFound) {
				return res.status(404).render('errorPage', {
					status: 404,
					message: error.message,
				})
			}
			return res.status(500).render('errorPage', {
				status: 500,
				message: 'Internal Error',
			})
		}
	}

	static async findProductByWord(req: Request, res: Response) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty())
				return res.status(400).json({ errors: errors.array() })
			const { word } = req.params
			const products = await ProductsService.findAllByWord(word)
			return res.json({
				productos: products,
				user: req.user,
			})
		} catch (error) {
			console.error(error)
			return res.status(500).json({
				message: 'Internal Error',
				error,
			})
		}
	}

	static async findProductWithFilters(
		req: Request<{}, {}, {}, Filters>,
		res: Response,
	) {
		try {
			const products = await ProductsService.findAllWithFilters(req.query)
			const brands = await BrandService.findAll()
			const subcategories = await SubcategoriesService.findAll()
			const categories = await CategoriesService.findAll()
			// if (!req.query.jsonFormat) {
			return res.render('products', {
				products: products,
				categories,
				subcategories,
				brands,
				categoryFilter: 1,
				subcategoryFilter: 1,
				wordFilter: 1,
				brandFilter: 1,
				user: req.user,
			})
			// }
			// return res.json({
			// 	products,
			// 	user: req.user,
			// })
		} catch (error) {
			console.error(error)
			// if (req.query.jsonFormat) {
			return res.status(500).json({
				message: 'Internal Error',
				error,
			})
			// }
			// return res.render('errorPage', {
			// 	status: 500,
			// 	message: 'Internal Error',
			// })
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

	static async updateById(req: Request, res: Response) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty())
				return res.status(400).json({ errors: errors.array() })
			const id = Number(req.params.id)
			await ProductsService.updateById(Number(req.params.id), req.body)
			if (!req.files) return res.redirect(`/product/${id}`)
			return res.redirect(307, `/product/upload/${id}`)
		} catch (error) {
			console.error(error)
			if (error instanceof NotFound) {
				return res.status(404).render('errorPage', {
					status: 404,
					mensaje: error.message,
				})
			}
			return res.status(500).render('errorPage', {
				status: 500,
				message: 'Internal Error',
			})
		}
	}
	static async create(req: Request, res: Response) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty())
				return res.status(400).json({ errors: errors.array() })
			const product = await ProductsService.create(req.body)
			if (!req.files) return res.redirect(`/product/${product.productId}`)
			return res.redirect(307, `/product/upload/${product.productId}`)
		} catch (error) {
			console.log(error)
			return res.status(500).json({
				message: 'Internal error',
				error,
			})
		}
	}
	static async deleteProduct(req: Request, res: Response) {
		try {
			const id = Number(req.params.id)
			await ProductsService.softDelete(id)
			res.render('admin', { user: req.user })
		} catch (error) {
			console.error(error)
			if (error instanceof NotFound) {
				return res.status(404).render('errorPage', {
					status: 404,
					message: error.message,
				})
			}
			return res.status(500).render('errorPage', {
				status: 500,
				message: 'Internal error',
			})
		}
	}
}
