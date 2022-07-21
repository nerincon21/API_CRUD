const Sequelize = require('sequelize');
const mysql2 = require('mysql2');

const db = new Sequelize('apitest', 'root', '', {
  host: '34.171.183.159',
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  port: '3306',
  operatorsAliases: 0,
  define: {
      timestamps: false
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = db;
