import jwt from 'jsonwebtoken';
import { semilla } from '../config/config';

export default class Token {

	static create(body: {email:string, role:string}, durationHours: number):string {
		//creamos el token
		const token = jwt.sign(
			{
				email: body.email,
				role: body.role,
			},
			semilla,
			{ expiresIn: 60 * 60 * durationHours * 30 }
		);

		return token;
	}

	static isValid(token:string): boolean {
		return true;
	}
}
