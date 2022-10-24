const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  // para no ver las sentencias sql generadas por sequalize
  logging: false,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = db;
