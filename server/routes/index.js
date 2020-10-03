const express = require("express");
const app = express();
const errorMiddleware = require("../middleware/errores")

app.use(require("./paginahbs"));
app.use(require("./producto"));
app.use(require("./login"));
app.use(require("./usuario"));
app.use(require("./upload"));
app.use(require("./pedido"));
app.use( errorMiddleware );

module.exports=app;