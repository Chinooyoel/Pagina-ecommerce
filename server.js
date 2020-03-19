const hbs = require("hbs");
const express = require("express");
const app = express();

let port = process.env.PORT || 3000;

app.get("/", ( req, res ) => {
    res.write("hola perro");
    res.end();
})

app.listen( port, () => {
    console.log(`El server se esta ejecutando en el puerto ${ port }`);
}
)