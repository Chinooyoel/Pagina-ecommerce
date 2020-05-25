const hbs = require("hbs");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

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


//rutas
app.use(require("./routes/index"));

//Conectamos a la base de datos
mongoose.connect("mongodb://localhost:27017/cafe2", {useNewUrlParser: true},
    ( err ) => {
        if ( err ) throw err;
        console.log("BASE DE DATOS LISTA !");
    })


app.listen( port, () => {
    console.log(`El server se esta ejecutando en el puerto ${ port }`);
}
)