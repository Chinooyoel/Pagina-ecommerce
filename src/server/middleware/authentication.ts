// import Usuarios from '../models/Usuarios.js'
// import { Request, Response, NextFunction } from 'express'

// export default class AuthenticationMiddleware {
// 	static verifyToken(req: Request, res: Response, next: NextFunction) {
// 		const token = req.cookies.token
// 		if (!token) {
// 			return next()
// 		}
// 		const data = Token.isValid(token)
// 		req.user
// 	}

// 	static verifyRole(req: Request, res: Response, next: NextFunction) {
// 		if (!['ADMIN', 'ESPECTADOR'].includes(req.user.role)) {
// 			return res.status(401).render('errorPage', {
// 				status: 401,
// 				message: 'Requires administrator permissions',
// 			})
// 		}
// 		next()
// 	}

// 	static verifyAdminRole(req: Request, res: Response, next: NextFunction) {
// 		if (req.user.rol != 'ADMIN') {
// 			return res.status(401).render('paginaError', {
// 				status: 401,
// 				mensaje: 'Requires administrator permissions',
// 			})
// 		}
// 		next()
// 	}

// 	static async getLoggedInUser(
// 		req: Request,
// 		res: Response,
// 		next: NextFunction,
// 	) {
// 		try {
// 			if (!req.user.isLoggedIn) {
// 				req.user.isAdminOrTest = false
// 				return next()
// 			}
// 			req.user = await Usuarios.findOne({
// 				attributes: { exclude: 'password' },
// 				where: { email: req.user.Email },
// 			})
// 			req.user.isAdminOrTest = ['ADMIN', 'ESPECTADOR'].includes(req.user.role)
// 			next()
// 		} catch (error) {
// 			return res.status(500).json({
// 				ok: false,
// 				error,
// 			})
// 		}
// 	}
// }
// // let verificarToken = (req, res, next) => {
// // 	// obtenemos el token de las cookies
// // 	const token = req.cookies.token;

// // 	//si no existe token, no hay ningun usuario loguiado
// // 	if (!token) {
// // 		req.usuario = { Logueado: false };
// // 		next();
// // 	} else {
// // 		//veriamos el token
// // 		jwt.verify(token, semilla, (err, decodificado) => {
// // 			if (err) {
// // 				req.usuario = { logueado: false };
// // 				return res.status(400).json({
// // 					message: 'Token invalido',
// // 				});
// // 			}

// // 			//guardamos el email y el rol en la peticion
// // 			req.usuario = {
// // 				Email: decodificado.email,
// // 				Role: decodificado.role,
// // 				Logueado: true,
// // 			};

// // 			next();
// // 		});
// // 	}
// // };

// // let verificarRole = (req, res, next) => {
// // 	let rol = req.usuario.rol;

// // 	if (rol != 'ADMIN' && rol != 'ESPECTADOR') {

// // 		return res.status(401).render('paginaError', {
// // 			status: 401,
// // 			mensaje: 'Requiere permisos de administrador',
// // 		});

// // 	}
// // 	next();
// // };

// // let verificarAdminRole = (req, res, next) => {
// // 	let rol = req.usuario.rol;

// // 	if (rol != 'ADMIN') {
// // 		return res.status(401).render('paginaError', {
// // 			status: 401,
// // 			mensaje: 'Requiere permisos de administrador',
// // 		});
// // 	}
// // 	next();
// // };

// // let obtenerUsuarioLoguiado = async (req, res, next) => {
// // 	if (req.usuario.Logueado) {
// // 		try {
// // 			//buscamos al usuario por el email
// // 			const usuario = await Usuarios.findOne({
// // 				attributes: { exclude: 'password'},
// // 				where: { email: req.usuario.Email } });

// // 			req.usuario = usuario;
// // 			req.usuario.Logueado = true;
// // 			req.usuario.Admin = esAdminOTest(req.usuario.rol);
// // 			next();
// // 		} catch (error) {
// // 			if (error) {
// // 				return res.status(500).json({
// // 					ok: false,
// // 					error,
// // 				});
// // 			}
// // 		}
// // 	} else {
// // 		req.usuario.Admin = false;
// // 		next();
// // 	}
// // };

// // module.exports = {
// // 	verificarToken,
// // 	verificarRole,
// // 	verificarAdminRole,
// // 	obtenerUsuarioLoguiado,
// // };

// // let esAdminOTest = (rol) => {
// // 	if (rol === 'ADMIN' || rol === 'ESPECTADOR') {
// // 		return true;
// // 	}
// // 	return false;
// // };
