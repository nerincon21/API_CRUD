const Sequelize = require('sequelize');
const mysql2 = require('mysql2');

const db = new Sequelize('sql3506337', 'sql3506337', 'RDZXeDH1AE', {
  host: 'sql3.freesqldatabase.com',
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
