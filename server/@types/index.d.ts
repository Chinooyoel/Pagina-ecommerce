import UserDTO from '../modules/users/UserDTO';

declare global {
  namespace Express {
      export interface Request {
          user: UserDTO;
          usuario:UserDTO;
          admin: boolean;
      }
  }
}

export interface UserData {
  id: number,
  idUserLogged: number,
  adminPermissions: boolean
}

export interface UserDataWithUser extends UserData{
  user: UserDTO
}

export interface OrderDTO {
  idpedido: number,
	total: number,
	fecha: Date
}


export interface UserWithOrders extends UserDTO {
  pedidos: OrderDTO[]
}