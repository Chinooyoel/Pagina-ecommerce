const { puerto } = require('./config/config');
const hbs = require('hbs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const { verificarToken, obtenerUsuarioLoguiado } = require('./middleware/autenticacion');
const db = require('./mysql/mysql');

// Creamos un middleware para la carpeta public
app.use(express.static(__dirname + '/../public'));

// Establecemos como motor de vista predeterminado hbs
app.set('view engine', 'hbs');

// Cargamos todos los parciales que hay en la carpeta "parciales"
hbs.registerPartials(__dirname + '/../views/parciales');

// configuracion por defecto
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileUpload({}));

// middleware
app.use(verificarToken);
app.use(obtenerUsuarioLoguiado);

// helpers
hbs.registerHelper('multiplicar', (a, b) => a * b);
hbs.registerHelper('precioCuotas', (totalContado, cuotas) => (Math.floor((totalContado * 1.35) / cuotas)));

// rutas
app.use(require('./routes/index'));

// importamos los modelos
require('./models/Marcas');
require('./models/Productos');
require('./models/Categorias');
require('./models/Usuarios');
require('./models/Subcategorias');
require('./models/Proveedores');
require('./models/Pedidos');

// conectamos a la base de datos
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
  .catch(error => console.error('Error al conectar la base de datos:', error));

app.listen(puerto, () => {
  console.log(`El server se esta ejecutando en el puerto ${puerto}`);
}
);
