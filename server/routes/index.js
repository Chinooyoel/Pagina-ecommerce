const express = require("express");
const app = express();



app.use(require("./paginahbs"));
app.use(require("./producto"));
app.use(require("./login"));
app.use(require("./usuario"));


module.exports=app;