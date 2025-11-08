import { Order, OrderDetail, Product } from '../models/init-models'
import { OrderFull } from './type'

export default class OrderDetailsRepository {
	static async getOrderWithProducts(id: number): Promise<OrderFull | null> {
		return await Order.findOne({
			where: {
				orderId: id,
			},
			include: [
				{
					model: OrderDetail,
					include: [
						{
							model: Product,
							required: true,
						},
					],
					required: true,
				},
			],
			raw: true,
			nest: true,
		})
	}

	static async create(id: number): Promise<OrderFull | null> {
		return await Order.create({
			where: {
				orderId: id,
			},
			include: [
				{
					model: OrderDetail,
					include: [
						{
							model: Product,
							required: true,
						},
					],
					required: true,
				},
			],
			raw: true,
			nest: true,
		})
	}
}
