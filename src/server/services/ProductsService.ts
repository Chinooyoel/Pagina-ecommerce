import ProductsRepository from '../repository/ProductsRepository'
import { Filters } from '../@types'
import { Product, ProductAttributes } from '../models/product'
import { BusinessError, NotFound } from '../utils/errors'

export default class ProductsService {
	static async findOneById(id: number) {
		return await ProductsRepository.findOneById(id)
	}

	static async findAllByWord(word: string) {
		return await ProductsRepository.findAllByWord(word)
	}

	static async findAllWithFilters(filters: Filters) {
		return await ProductsRepository.findAllWithFilters(filters)
	}

	static async findRelatedProducts({
		id,
		subcategoryId,
		limit,
	}: {
		id: number
		subcategoryId: number
		limit: number
	}) {
		return await ProductsRepository.findRelatedProducts({
			id,
			subcategoryId,
			limit,
		})
	}

	static async updateById(id: number, product: Partial<ProductAttributes>) {
		return await ProductsRepository.updateById(id, product)
	}

	static async create(product: Product) {
		return await ProductsRepository.create(product)
	}

	static async softDelete(id: number): Promise<void> {
		await ProductsRepository.softDelete(id)
	}

	static async updateStock(
		product: ProductAttributes,
		qty: number,
	): Promise<void> {
		if (product.stock < qty) throw new BusinessError('Product does not stock')
		product.stock = product.stock - qty
		await ProductsService.updateById(product.productId, product)
	}
}
