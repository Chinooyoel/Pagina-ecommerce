import ProductsRepository from '../repository/ProductsRepository'
import { Filters } from '../@types'
import { Product } from '../models/product'
import { NotFound } from '../utils/errors'

export default class ProductsService {
	static async findOneById(id: number) {
		const product = await ProductsRepository.findOneById(id)
		if (!product) throw new NotFound('Product not found')
		return product
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

	static async updateById(id: number, product: Product) {
		const updatedProduct = await ProductsRepository.updateById(id, product)
		if (!updatedProduct) throw new NotFound('Product Not Found')
		return updatedProduct
	}

	static async create(product: Product) {
		return await ProductsRepository.create(product)
	}

	static async softDelete(id: number): Promise<void> {
		const product = await ProductsRepository.findOneById(id)
		if (!product) throw new NotFound('Product Not Found')
		await ProductsRepository.softDelete(id)
	}
}
