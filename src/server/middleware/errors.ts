import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'

const errorMiddleware = (
	error: ErrorRequestHandler,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	console.log(first)
	res.status(400).json({
		status: 'ERROR',
		name: error.name,
		// mensaje: error.,
		// path: error.path,
	})
}

export = errorMiddleware
