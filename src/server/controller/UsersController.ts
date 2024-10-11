import { Request, Response } from 'express'
import UsersService from '../services/UsersService'
import { validationResult } from 'express-validator'
import { UserData } from '../@types'
import { BusinessError, NotPermissions } from '../utils/errors'

export default class UsersController {
	static showViewSignIn(req: Request, res: Response) {
		console.log('first')
		return res.render('signIn')
	}

	static showViewCreateSeller(req: Request, res: Response) {
		return res.render('createSeller')
	}

	static showViewUsersTable(req: Request, res: Response) {
		return res.render('usersTable')
	}

	static async showViewUserProfile(req: Request, res: Response) {
		try {
			const userData: UserData = {
				id: Number(req.params.id),
				idUserLogged: Number(req.usuario.idusuario),
				adminPermissions: req.admin,
			}
			const user = await UsersService.findUserByIdWithTheirOrders(userData)
			return res.render('userProfile', {
				loggedUser: req.user,
				user,
			})
		} catch (error) {
			return res.status(500).json({
				message: 'Internal error',
				error,
			})
		}
	}

	static async createUser(req: Request, res: Response) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res
					.status(400)
					.json({ message: 'Invalid Params', errors: errors.array() })
			}
			const user = await UsersService.createUser(req.body, req.admin)
			return res.json({
				user,
			})
		} catch (error) {
			console.error(error)
			if (error instanceof BusinessError)
				return res.status(400).json({ message: error.message })
			return res.status(500).json({
				message: 'Internal error',
				error,
			})
		}
	}

	static async updateUser(req: Request, res: Response) {
		try {
			const userData = {
				id: Number(req.params.id),
				user: req.body,
				idUserLogged: Number(req.user.idusuario),
				adminPermissions: req.admin,
			}
			await UsersService.updateUserById(userData)
			res.redirect(`/user/${userData.id}`)
		} catch (error) {
			console.error(error)
			if (error instanceof NotPermissions)
				return res.status(403).json({ message: error.message })
			return res.status(500).json({
				message: 'Internal error',
				error,
			})
		}
	}

	static async updateUserRole(req: Request, res: Response) {
		try {
			const id = Number(req.params.idusuario)
			const { role } = req.body
			await UsersService.updateUserRole(id, role)
			return res.status(200)
		} catch (error) {
			console.log(error)
			return res.status(500).json({
				message: 'Internal error',
				error,
			})
		}
	}

	static async findUsersByEmail(req: Request, res: Response) {
		try {
			const { email } = req.params
			const users = await UsersService.findUserByEmail(email)
			return res.json({ users })
		} catch (error) {
			console.error(error)
			return res.status(500).json({
				message: 'Internal Error',
				error,
			})
		}
	}
}
