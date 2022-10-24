import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import AuthService from './authService';
import HTTPResponseError from '../../utils/httpReponseError';
import { HTTP_CODE } from '../../utils/const';

export default class AuthController {
	static async login (req: Request, res: Response) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// throw new HTTPResponseError(HTTP_CODE.BadRequest, errors.array().join('\n') );
			return res.status(400).json({ errores: errors.array() });
		}
    
		try {
			const token = AuthService.login(req.body);
			res.json({
				message: 'Credentials ok',
				token,
			});
		} catch (error) {
			console.error(error);
			// if( error instanceof HTTPResponseError)
			// 	return res.status(error.code).json({message: error.message});
			// if (error instanceof Error)
			// 	return res.status(500).json({message: error.message});
			if( error instanceof HTTPResponseError)
				return res.status(error.code).json({msg: error.message});
			if (error instanceof Error)
				return res.status(500).json({msg: error.message});
		}
	}

}