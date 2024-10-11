import { Request, Response } from 'express'

export default class ViewsController {
	static showViewUbication(req: Request, res: Response) {
		return res.render('ubication', {
			user: req.user,
		})
	}
	static showViewHelp(req: Request, res: Response) {
		return res.render('help', {
			user: req.user,
		})
	}
	static async showViewMain(req: Request, res: Response) {
		try {
			return res.render('index', {
				user: req.user,
				// productosDB : resultado[0]
			})
		} catch (error) {
			return res.status(500).render('errorPage', {
				status: 500,
				message: 'Internal Error',
			})
		}
	}
	static showViewShoppingCart(req: Request, res: Response) {
		return res.render('shoppingCart', {
			user: req.user,
		})
	}
}
