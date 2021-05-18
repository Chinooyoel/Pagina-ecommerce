const Sequelize = require('sequelize');

let db;

if( !process.env.NODE_ENV ){
    db = new Sequelize('computadoras_ya', 'root', '123456', {
        //para no ver las sentencias sql generadas por sequalize
        logging: false,
        host: '127.0.0.1',
        dialect: 'mysql',
        port: '3306'
    })
}else{
    db = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
        //para no ver las sentencias sql generadas por sequalize
        logging: false,
        host: process.env.HOSTDB,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    })
}


module.exports = db;