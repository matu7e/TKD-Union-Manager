const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nombre de la db', 'root', 'aca va el passw', {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log
});

module.exports = { sequelize };
