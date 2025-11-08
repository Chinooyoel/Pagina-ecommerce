import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { InvalidCredential } from '../utils/errors'
import OrdersService from '../services/OrdersService'

export default class OrdersController {
	static async showViewOrder(req: Request, res: Response) {
		const errors = validationResult(req)
		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() })
		try {
			const order = OrdersService.getWithProducts(Number(req.params.id))
			if (order === null) res.render('', {})
			return res.render('order', {
				order,
			})
		} catch (error) {
			console.error(error)
			if (error instanceof InvalidCredential)
				return res.status(400).json({ message: error.message })
			if (error instanceof Error)
				return res.status(500).json({ message: error.message })
		}
	}

	static createOrder(req: Request, res: Response) {
		return res.render('login')
	}
}
