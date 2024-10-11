import UserDTO from '../modules/users/UserDTO'

declare global {
	namespace Express {
		export interface Request {
			user: UserDTO
			usuario: UserDTO
			admin: boolean
		}
	}
}

export interface UserData {
	id: number
	idUserLogged: number
	adminPermissions: boolean
}

export interface UserDataWithUser extends UserData {
	user: UserDTO
}

export interface OrderDTO {
	idpedido: number
	total: number
	fecha: Date
}

export interface UserWithOrders extends UserDTO {
	pedidos: OrderDTO[]
}

export interface TokenBody {
	email: email
	role: string
}

export interface ProductDTO {
	idproducto: number
	nombre: string
	descripcion: string
	stock: number
	garantia: string
	codigo: string
	precio: number
	costo: number
	img: string
	estado: string
}

export interface ProductFilters {
	productId?: number
	name?: string
	description?: string
	stock?: number
	guarantee?: string
	code?: string
	price?: number
	cost?: number
	image?: string
	state?: string
	subcategoryId?: number
	brandId?: number
	supplierId?: number
}

export interface Filters {
	wordFilter: string | undefined
	categoryFilter: string | undefined
	subcategoryFilter: string | undefined
	brandFilter: string | undefined
	order: string | undefined
}

export interface UserFilters {
	userId?: number
	name?: string
	email?: string
	role?: 'USUARIO' | 'ADMIN' | 'ESPECTADOR'
	status?: string
}

export interface VerifiedUser {
	id: number
	iat: number
	exp: number
	role: 'USUARIO' | 'ADMIN' | 'ESPECTADOR'
}
