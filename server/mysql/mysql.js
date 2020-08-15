let mysql = require("mysql");

let db_config;

if( !process.env.NODE_ENV ){
    db_config = {
        host : "localhost",
        user : "root",
        password : "1234",
        database: "ecommerse"
    };
}else{
    db_config = {
        host : process.env.HOSTDB,
        user : process.env.USER,
        password : process.env.PASSWORD,
        database: process.env.DATABASE
    };
}

let pool = mysql.createPool(db_config);                                                 


module.exports = pool;