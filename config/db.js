const Sequelize = require('sequelize');
const mysql2 = require('mysql2');

const db = new Sequelize('railway', 'root', 'VeA8Osbg1TI8QrQDkV33', {
  host: 'containers-us-west-73.railway.app',
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  port: '6304',
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
