let mysql = require("mysql");

let connection;

if( !process.env.NODE_ENV ){
    connection = mysql.createConnection({
        host : "localhost",
        user : "root",
        password : "1234",
        database: "ecommerse"
    });
}else{
    connection = mysql.createConnection({
        host : process.env.host,
        user : process.env.user,
        password : process.env.password,
        database: process.env.database
    });
}

module.exports = connection;