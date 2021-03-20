const mongoose = require('mongoose')

const Schema = mongoose.Schema
const user_roleSchema = new Schema({
    user_id: Number,
    role_id: Number
})
module.exports = mongoose.model('user_role', user_roleSchema, 'user_roles')


/*

const Sequelize = require('sequelize');
const User = require('../models/user');
const Role = require('../models/role');

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

module.exports = sequelize.define('User_role', {
    user_role_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        references: {
            model: User,
            key: 'userID'
        }
    },
    role_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        references: {
            model: Role,
            key: 'role_id'
        }
    }
});
*/