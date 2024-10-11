import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import AuthService from '../services/authService'
import { InvalidCredential } from '../utils/errors'

export default class AuthController {
	static async login(req: Request, res: Response) {
		const errors = validationResult(req)
		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() })
		try {
			const token = AuthService.login(req.body)
			res.json({
				message: 'Credentials ok',
				token,
			})
		} catch (error) {
			console.error(error)
			if (error instanceof InvalidCredential)
				return res.status(400).json({ message: error.message })
			if (error instanceof Error)
				return res.status(500).json({ message: error.message })
		}
	}

	static showViewLogin(req: Request, res: Response) {
		return res.render('login')
	}
}
