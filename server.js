const hbs = require("hbs");
const express = require("express");
const app = express();
const fs = require("fs");


let port = process.env.PORT || 3000;

//Creamos un middleware para la carpeta public
app.use( express.static( __dirname + "/public"));
//Establecemos como motor de vista predeterminado hbs
app.set("view engine", "hbs")

//Cargamos todos los parciales que hay en la carpeta "parciales"
hbs.registerPartials( __dirname + "/views/parciales");

app.get("/", ( req, res ) => {

    res.render("index");

})
app.get("/ayuda", ( req, res ) => {

    res.render("ayuda");

})
app.get("/ubicacion", ( req, res ) => {

    res.render("ubicacion");

})
app.get("/articulo", ( req, res ) => {

    res.render("articulo");

})


app.listen( port, () => {
    console.log(`El server se esta ejecutando en el puerto ${ port }`);
}
)