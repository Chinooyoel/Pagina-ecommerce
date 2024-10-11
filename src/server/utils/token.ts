import jwt from 'jsonwebtoken'
import { seed } from '../config'
import { VerifiedUser } from '../@types'

export default class Token {
	static create(
		body: { email: string; role: string },
		durationHours: number,
	): string {
		const token = jwt.sign(
			{
				email: body.email,
				role: body.role,
			},
			seed,
			{ expiresIn: 60 * 60 * durationHours * 30 },
		)

		return token
	}

	static async isValid(token: string): Promise<VerifiedUser> {
		return new Promise((resolve, rejected) => {
			jwt.verify(token, seed, (err, decoded) => {
				if (err) rejected(err.message)
				resolve(decoded as VerifiedUser)
			})
		})
	}
}
