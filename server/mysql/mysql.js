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
        host : process.env.HOSTDB,
        user : process.env.USER,
        password : process.env.PASSWORD,
        database: process.env.DATABASE
    });
}

module.exports = connection;