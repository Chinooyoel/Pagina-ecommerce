import { Op } from 'sequelize'
import { Filters } from '../@types'
import {
	Brand,
	Supplier,
	Product,
	Subcategory,
	Category,
	ProductAttributes,
} from '../models/init-models'
import { ProductFull, ProductWithSubCategory } from './type'

export default class ProductsRepository {
	static async findOneById(id: number): Promise<ProductFull | null> {
		return Product.findOne({
			where: { productId: id },
			include: [
				{ model: Brand, required: true },
				{ model: Supplier, required: true },
				{
					model: Subcategory,
					include: [{ model: Category, required: true }],
					required: true,
				},
			],
			raw: true,
			nest: true,
		})
	}

	static async findAllByWord(word: string): Promise<ProductWithSubCategory[]> {
		return Product.findAll({
			where: {
				name: { [Op.substring]: word },
			},
			include: { model: Subcategory },
			raw: true,
			nest: true,
		})
	}

	static async findAllWithFilters(
		filters: Filters,
	): Promise<ProductWithSubCategory[]> {
		let filtersDB = {}
		let categoryFilter = {}
		let priceOrder: any[] = []

		//si el filtro es diferente de -1 quiere decir que el usuario eligio un filtro
		//por lo tanto se agrega al objeto filtros
		/*
		Ejemplo1: el usuario quiere ver los productos que sean de la marca con id 2,
		la marcaFiltro va a ser 2, marcaFiltro es diferente de -1 por lo tanto se agrega a filtros
	
		Ejemplo2: el usuario quiere ver los productos de todas las marcas, 
		la marcaFiltro va a ser -1, por lo tanto no se agrega nada a filtros
	  */

		if (filters.wordFilter) {
			filtersDB = { name: { [Op.substring]: filters.wordFilter } }
		}
		if (filters.subcategoryFilter) {
			filtersDB = { ...filtersDB, subcategoryId: filters.subcategoryFilter }
		}
		if (filters.brandFilter) {
			filtersDB = { ...filtersDB, brandId: filters.brandFilter }
		}
		//para filtrar adentro del model de productos
		if (filters.categoryFilter) {
			categoryFilter = { categoryId: filters.categoryFilter }
		}
		if (filters.order) {
			priceOrder = [['price', filters.order]]
		}
		return await Product.findAll({
			//agregamos los filtros de marca, subcategoria y palabra
			where: { ...filtersDB, state: 'A' },
			order: priceOrder,
			include: [
				{
					model: Subcategory,
					//agregamos el filtro de categoria
					where: categoryFilter,
					attributes: [],
				},
			],
			raw: true,
			nest: true,
		})
	}

	static async findRelatedProducts({
		id,
		subcategoryId,
		limit,
	}: {
		id: number
		subcategoryId: number
		limit: number
	}): Promise<ProductAttributes[]> {
		return Product.findAll({
			where: {
				[Op.and]: {
					subcategoryId,
					productId: { [Op.ne]: id },
				},
			},
			limit,
			raw: true,
			nest: true,
		})
	}

	static async create(product: ProductAttributes): Promise<ProductAttributes> {
		return Product.build(product, { raw: true })
	}

	static async updateById(
		id: number,
		product: Partial<ProductAttributes>,
	): Promise<ProductAttributes> {
		const result = await Product.update(product, {
			where: { productId: id },
			returning: true,
		})
		return result[1][0]
	}

	static async softDelete(id: number) {
		await Product.destroy({ where: { productId: id } })
	}
}
