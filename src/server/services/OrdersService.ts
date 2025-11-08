import OrderDetailsRepository from '../repository/OrderDetailsRepository'
import OrdersRepository from '../repository/OrdersRepository'
import { NotFound } from '../utils/errors'
import ProductsService from './ProductsService'

export default class OrdersService {
	static async getWithProducts(id: number) {
		return await OrdersRepository.getOrderWithProducts(id)
	}

	static isThereStock(productStock: number, qty: number): boolean {
		return productStock > qty
	}

	static async create({}) {
		try {
			//buscamos el id del estado "INGRESO DE PEDIDO"
			const estado = await Estado.findOne({
				where: { nombre: { [Op.substring]: 'INGRESO DEL PEDIDO' } },
			})
			await OrdersRepository.create(id)
			let total = 0
			carrito.forEach(async ({ idProduct, qty }) => {
				const productFound = await ProductsService.findOneById(idProduct)
				if (!productFound) throw new NotFound('Product not found')
				if (OrdersService.isThereStock(productFound.stock, qty)) {
					console.log('No hay stock')
					return
				}
				await ProductsService.updateById(productFound.productId, {
					stock: productFound.stock - qty,
				})
				OrderDetailsRepository.create({
					idOrder,
					product,
					qty,
				})
				total += productFound.price * qty
			})
			await OrdersRepository.update(id)
		} catch (error) {}
	}
}
