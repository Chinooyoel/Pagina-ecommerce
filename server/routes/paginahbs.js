const express = require("express");
const app = express();

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
app.get("/user", ( req, res ) => {
    
    res.render("usuario");
    
})
app.get("/admin", ( req, res ) => {

    res.render("admin");
})

module.exports = app;