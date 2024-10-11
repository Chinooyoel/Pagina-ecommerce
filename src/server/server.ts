import { port } from './config'
import hbs from 'hbs'
import express from 'express'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'
import cookieParser from 'cookie-parser'
// import AuthenticationMiddleware from './middleware/authentication';
import db from './mysql/mysql'
import routes from './routes/v2/index'

// import './models/Marcas';
// import './models/Productos';
// import './models/Categorias';
// import './models/Usuarios';
// import './models/Subcategorias';
// import './models/Proveedores';
// import './models/Pedidos';

const app = express()

app.use(express.static(__dirname + '/../public'))

app.set('view engine', 'hbs')

hbs.registerPartials(__dirname + '/../views/partials')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(fileUpload({}))

// app.use(AuthenticationMiddleware.verifyToken);
// app.use(AuthenticationMiddleware.getLoggedInUser);

hbs.registerHelper('multiplicate', (a, b) => a * b)
hbs.registerHelper('getPriceInPayments', (total, paymentsQty) =>
	Math.floor((total * 1.35) / paymentsQty),
)

hbs.registerHelper('getUrl', (urlName: string, ...args) => {
	let urls: { [key: string]: string } = {
		HELP_VIEW: '/help',
		UBICATION_VIEW: '/ubication',
		SHOPPING_CART_VIEW: '/shopping-cart',
		MAIN_VIEW: '/',
		LOGIN_VIEW: '/login',
		PRODUCT_DETAIL_VIEW: `/product/profile/${args[0]}`,
		PRODUCTS_TABLE_VIEW: '/product/table',
		CREATE_PRODUCT_VIEW: '/product/create',
		EDIT_PRODUCT_VIEW: `/product/edit/${args[0]}`,
		DELETE_PRODUCT: `/product/delete/${args[0]}`,
		CREATE_PRODUCT: '/product/create',
		UPDATE_PRODUCT: `/product/update/${args[0]}`,
		PRODUCTS_VIEW: '/product/filters',
		PRODUCTS_API: '/product/filters',
		USER_PROFILE_VIEW: `/user/profile/${args[0]}`,
		SIGN_IN_VIEW: '/user/sign-in',
		CREATE_SELLER_VIEW: '/user/create/seller',
		USERS_TABLE_VIEW: '/user/table',
		CREATE_USER_API: '/user/create',
		UPDATE_USER_API: `/user/update/${args[0]}`,
		UPDATE_USER_ROLE_API: `/user/update-role/${args[0]}`,
	}
	if (urlName === 'PRODUCTS_VIEW' && args.length) {
		const params = []
		args[0] && params.push(`wordFilter=${args[0]}`)
		args[1] && params.push(`categoryFilter=${args[1]}`)
		args[2] && params.push(`subcategoryFilter=${args[2]}`)
		args[3] && params.push(`brandFilter=${args[3]}`)
		args[4] && params.push(`order=${args[4]}`)
		urls[urlName] += `?${params.join('&')}`
	}
	return urls[urlName]
})

app.use(routes)
//conectamos a la base de datos
// pool.getConnection(function(err) {
//     if(err) {
//       console.log('Error al conectar la base de datos:', err);
//     }
//     console.log('Base de datos conectada')
//   });
// try {
//   db.authenticate();
//   console.log('Base de datos conectada')
// } catch (error) {
//   console.error('Error al conectar la base de datos:', error)
// }
db.sync()
	.then(() => console.log('Base de datos conectada'))
	.catch(error => console.error('Error al conectar la base de datos:', error))

app.listen(port, () => {
	console.log(`El server se esta ejecutando en el puerto ${port}`)
})
