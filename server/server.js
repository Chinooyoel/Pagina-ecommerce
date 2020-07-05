const hbs = require("hbs");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const connection = require("./mysql/mysql");

let port = process.env.PORT || 3000;



//Creamos un middleware para la carpeta public
app.use( express.static( __dirname + "/../public"));
//Establecemos como motor de vista predeterminado hbs
app.set("view engine", "hbs")

//Cargamos todos los parciales que hay en la carpeta "parciales"
hbs.registerPartials( __dirname + "/../views/parciales");

// configuracion por defecto
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileUpload({
    limits:{
        fileSize: 5 * 1024 * 1024,
        }
}));

//rutas
app.use(require("./routes/index"));

//Conectamos a la base de datos
connection.connect( ( error ) => {
    if( error ){
        console.log("No se pudo conectar a la base de datos.\n", error);
        return;
    }

    console.log("Base de datos connectada");
})

app.listen( port, () => {
    console.log(`El server se esta ejecutando en el puerto ${ port }`);
}
)