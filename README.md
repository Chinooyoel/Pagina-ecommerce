# Ecommerce de computacion
El diseño de este proyecto fue copiado de la pagina de computacion [Maximus](https://www.maximus.com.ar/HOME/maximus.aspx).

[Les invito a mirar el proyecto](https://yoel-ecommerce.herokuapp.com/)

## Construido con :hammer:
- NodeJs
- Express
- Sequelize
- MySql
- Handlebars
- Javascript
- Bootstraps

Para interactuar con la interfaz del administrador clickea el boton de inicio automatico o ingresa en el login:
- email: test@test.com
- password: test
(No van a tener permiso para crear, ni modificar productos, ni usuarios)

 Hecho
- CRUD de usuarios
- CRUD de productos
- Subir una imagen por usuario y producto
- Roles de usuario
- Carrito de compras
- Seccion de armar PC con componentes
- Busqueda de productos por nombre
- Busqueda de productos por categoria
- Busqueda de productos por subcategorias
- Busqueda de productos por marca
- Validaciones tanto del lado del cliente y del servidor
- Auntenticacion por JWT almacenado en Cookies
- Asignar vendedores

En proceso
- CRUD de pedidos
- Api de MercadoPago
- Autenticación por Facebook
- Mejorar la interfaz de subir imagenes
- Enviar un email para verificar la creacion de cuenta
- Restablecer contreseña mandando un email

## Modo desarrollo
```
    nvm install 18.18.2
    nvm use 18.18.2
    npm install
    npm run dev
```