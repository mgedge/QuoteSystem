const Sequelize = require('sequelize');
const sequelize = new Sequelize('quote', 'Matt', 'Matt', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: false

});