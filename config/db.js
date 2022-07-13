const Sequelize = require('sequelize');

const db = new Sequelize('crud_api', '', '', {
  host: 'mysql://ba135fc9aceecf:1d29e835@us-cdbr-east-06.cleardb.net/heroku_5a8cd2b924a4c18?reconnect=true',
  dialect: 'mysql',
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
