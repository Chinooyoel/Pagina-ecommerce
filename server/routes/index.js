const express = require("express");
const app = express();
const errorMiddleware = require("../middleware/errores")

app.use(require("./paginahbs"));
app.use('/producto', require("./producto"));
app.use('/login',require("./login"));
app.use('/usuario', require("./usuario"));
app.use('/pedido', require("./pedido"));
app.use( errorMiddleware );

module.exports=app;