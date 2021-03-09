

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

module.exports = sequelize.define('Role', {
    role_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    role_title: {
        type: Sequelize.STRING(35),
        allowNull: false
    }
});
