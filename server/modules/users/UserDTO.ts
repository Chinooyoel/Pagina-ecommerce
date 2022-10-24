
export default interface UserDTO{
    idusuario?: number,
    nombre:string,
    email:string,
    password: string,
    rol: 'USUARIO' | 'ADMIN' | 'ESPECTADOR',
    estado: string
};